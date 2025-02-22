import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../../assets/images/logo.png';
import Search from './Search/Search';
import Location from './Location/Location';
import { FiUser } from 'react-icons/fi';
import { IoBagOutline } from 'react-icons/io5';
import Button from '@mui/material/Button';
import './Style.css';
import Navigation from './Navigation/Navigation';
import { ClickAwayListener } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from "axios"; // Import axios để gọi API
import { GET_CART } from "../../config/ApiConfig"; // Import API giỏ hàng


const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [cartQuantity, setCartQuantity] = useState(0); // State để lưu số lượng sản phẩm trong giỏ hàng


    useEffect(() => {
        const fetchCartQuantity = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) return;

                const response = await axios.get(GET_CART, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Dữ liệu giỏ hàng từ API:", response.data); // Debug dữ liệu

                if (response.data && response.data.products.length > 0) {
                    const totalQuantity = response.data.products.reduce(
                        (sum, product) => sum + product.quantity, 
                        0
                    );
                    setCartQuantity(totalQuantity);
                } else {
                    setCartQuantity(0);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API giỏ hàng:", error);
                setCartQuantity(0);
            }
        };

        fetchCartQuantity();
    }, []);

    const handleUserClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            setIsDropdownOpen((prev) => !prev);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername("");
        navigate('/login');
    };

    const handleCartClick = () => {
        navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
    };



    return (
        <>
            {/* Top Strip */}
            <div className="headerWrapper">
                <div className="top-strip bg-pink">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">Black Friday sale 50%</p>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="header">
                <div className="container d-flex align-items-center">
                    {/* Logo */}
                    <div className="logoWrapper col-sm-2">
                        <Link to="/">
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    {/* Search and Location */}
                    <div className="col-sm-10 d-flex align-items-center part2">
                        <Search />
                        <Location />
                    </div>
                    {/* User and Cart */}
                    <div className="part3 d-flex align-items-center">
                    <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
                            <div className="userDropdown">
                                <Button className="circle" onClick={handleUserClick}>
                                    <FiUser />
                                </Button>
                                <div className="greeting">
    {isLoggedIn ? (
        `Xin chào ${username}!`
    ) : (
        <Link to="/login" className="login-link">Đăng nhập</Link>
    )}
</div>

                                {isLoggedIn && isDropdownOpen && (
                                    <ul className="dropdownMenu">
                                        <li><Button><Person2OutlinedIcon /> My Account</Button></li>
                                        <li><Button><RoomOutlinedIcon /> Order Tracking</Button></li>
                                        <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li>
                                        <li><Button><SettingsOutlinedIcon /> Setting</Button></li>
                                        <li><Button onClick={handleLogout}><LogoutOutlinedIcon /> Sign Out</Button></li>
                                    </ul>
                                )}
                            </div>
                        </ClickAwayListener>
                        {/* Cart Tab */}
                        <div className="cartTab">
                        <Button className="circle" onClick={handleCartClick}>
                        <IoBagOutline />
                            </Button>
                            <span className="count d-flex align-items-center justify-content-center">
                                {cartQuantity} {/* Hiển thị số sản phẩm trong giỏ hàng */}
                            </span>                            <div className="cart-text">Giỏ hàng</div>
                        </div>
                    </div>
                </div>
            </header>
            <Navigation />
        </>
    );
};

export default Header;
