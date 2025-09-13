import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";
import { GET_BLOB } from "../../config/ApiConfig";
import Header from "../../Components/Header/Header"; 
import Footer from "../../Components/Footer/Footer";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(GET_BLOB);
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách blog:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Đang tải bài viết...</p>;
  }

  return (
    <>
      <Header />
      <div className="blog-suggestion-section">
        <div className="container">
          <h2 className="blog-suggestion-title">DANH SÁCH BÀI BLOG</h2>
          <div className="blog-suggestion-list">
            {blogs.map((blog) => (
              <div className="blog-item" key={blog._id}>
                <img
                  src={`https://backend-tttn-deployment.onrender.com/images/${blog.images[0]}`}
                  alt={blog.title}
                  className="blog-img"
                />
                <div className="blog-info">
                  <h5 className="blog-title">{blog.title}</h5>
                  <p className="blog-meta">
                    {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="blog-description">{blog.descriptions}</p>
                  <a href={`/blog/${blog._id}`} className="read-more">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
