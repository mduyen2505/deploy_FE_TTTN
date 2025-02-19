import React from "react";
import "./Style.css";

const Blog = () => {
    const blogs = [
        {
            id: 1,
            img: "https://file.hstatic.net/200000150709/article/5fcd9c240de2c-serum-tri-tham-mun_36c022e57f2e48db930c01359c623a80.jpg",
            title: "Top 5 serum trị thâm mụn tốt nhất giúp sáng da, mờ thâm",
            author: "House Joli",
            date: "Th 4 14/08/2024",
            description: "Mụn luôn là nỗi sợ muốn thuở của mọi bạn gái. Không chỉ khiến cho khuôn mặt đau nhói, khó chịu mà còn ảnh hưởng...",
        },
        {
            id: 2,
            img: "https://file.hstatic.net/200000150709/article/em-che-khuyet-diem-gia-re-thinh-hanh-nhat-tren-thi-truong-hien-nay-_1__cc5996c9262941448b4b09c49e7e4b5d.jpeg",
            title: "Top 5 kem che khuyết điểm dưới 150k che phủ hoàn hảo và lâu trôi",
            author: "House Joli",
            date: "Th 4 07/08/2024",
            description: "Che khuyết điểm là sản phẩm không thể nào thiếu trong túi makeup của mỗi người, với tác dụng che nhanh chóng...",
        },
        {
            id: 3,
            img: "https://file.hstatic.net/200000150709/article/ew-tat-tan-tat-cac-san-pham-the-ordinary-dang-hot-nhat-hien-nay-7p9b0d_9a466f8e3a2a4d579f1fb0af23ee6a6c.png",
            title: "Điểm danh 5 loại serum The Ordinary được ưa chuộng nhất hiện nay",
            author: "House Joli",
            date: "Th 6 26/07/2024",
            description: "Serum The Ordinary là một trong những cái tên hot trong thời gian gần đây với những sản phẩm chăm sóc da hiệu quả...",
        },
        {
            id: 4,
            img: "https://file.hstatic.net/200000150709/article/thiet_ke_chua_co_ten_b2da263243d140eb925863e2f2aebe20.png",
            title: "TOP sản phẩm dưỡng trắng, ủ trắng da xịn mịn tại nhà cùng...",
            author: "House Joli",
            date: "Th 6 26/07/2024",
            description: "Làn da của chúng ta thường bị tác động bởi nắng, gió, ô nhiễm môi trường, và tuổi tác, dẫn đến việc da body xỉn màu...",
        },
    ];

    return (
        <div className="blog-suggestion-section">
            <div className="container">
                <h2 className="blog-suggestion-title">BLOG</h2>
                <div className="blog-suggestion-list">
                    {blogs.map((blog) => (
                        <div className="blog-item" key={blog.id}>
                            <img src={blog.img} alt={blog.title} className="blog-img" />
                            <div className="blog-info">
                                <h5 className="blog-title">{blog.title}</h5>
                                <p className="blog-meta">{blog.author} | {blog.date}</p>
                                <p className="blog-description">{blog.description}</p>
                                <a href="#" className="read-more">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all">
                    <a href="#">See all</a>
                </div>
            </div>
        </div>
    );
};

export default Blog;
