from pymongo import MongoClient
from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from flask_cors import CORS
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://letham1612:tham2003@cluster0.ht7wl.mongodb.net/Beautique')

# Sử dụng database Beautique
db = client['Beautique']

# Sử dụng collection products
collection = db['products']
print("Collections available:", db.list_collection_names())

df = pd.DataFrame()

def get_data_from_mongo():
    global df
    if df.empty:
        print("Retrieving products from MongoDB...")
        products = collection.find({})
        data_list = list(products)
        print(f"Number of documents retrieved: {len(data_list)}")
        df = pd.DataFrame(data_list)
    return df

def build_content_based_model():
    df = get_data_from_mongo()
    if df.empty:
        raise ValueError("No data retrieved from MongoDB")
    
    if 'name' not in df.columns or 'description' not in df.columns:
        raise ValueError("Required columns 'name' and 'description' not found")

    df = df[['_id', 'name', 'description', 'price', 'promotionPrice', 'image']]
    df['price'] = df['price'].fillna('N/A')
    df['promotionPrice'] = df['promotionPrice'].fillna('N/A')
    df['image'] = df['image'].fillna('default-image.jpg')

    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df['description'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    return df, cosine_sim

app = Flask(__name__)
CORS(app)

@app.route('/get_recommendations', methods=['GET'])
def get_recommendations():
    product_id = request.args.get('product_id')
    if not product_id:
        return jsonify({"error": "Valid product_id is required"}), 400

    print(f"Product ID received: {product_id}")

    df, cosine_sim = build_content_based_model()

    try:
        idx = df.index[df['_id'] == ObjectId(product_id)].tolist()
        if not idx:
            return jsonify({"error": "Product not found"}), 404
        idx = idx[0]

        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:6]

        product_indices = [i[0] for i in sim_scores]
        recommendations = df.iloc[product_indices][['_id', 'name', 'description', 'price', 'promotionPrice', 'image']]

        recommendations = recommendations[recommendations['_id'] != ObjectId(product_id)]

        print("Recommended Product IDs, Names, and Descriptions:")
        for _, row in recommendations.iterrows():
            print(f"Product ID: {row['_id']}, Product Name: {row['name']}, Product Description: {row['description']}, Product Price: {row['price']}, Product Promotion Price: {row['promotionPrice']}, Product Image: {row['image']}")

        recommendations_list = [{
            "id": str(row['_id']),
            "name": row['name'],
            "description": row['description'],
            "price": row['price'],
            "promotionPrice": row['promotionPrice'],
            "image": row['image']
        } for _, row in recommendations.iterrows()]

        if len(recommendations_list) < 5:
            return jsonify({"error": "Not enough recommendations found"}), 404

        return jsonify({"recommended_products": recommendations_list})
    except Exception as e:
        return jsonify({"error": f"Error finding product: {e}"}), 500

if __name__ == '__main__':
    try:
        client.admin.command('ping')
        print("Successfully connected to MongoDB")
        app.run(debug=True)
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
