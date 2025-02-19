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

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user'); // Kiểm tra thông tin người dùng trong localStorage
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleUserClick = () => {
        if (!isLoggedIn) {
            navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
        } else {
            setIsDropdownOpen((prev) => !prev); // Nếu đã đăng nhập, mở dropdown
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('user'); // Xóa thông tin đăng nhập
        setIsLoggedIn(false);
        navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
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
                            {/* User Dropdown */}
                            <div className="userDropdown">
                                <Button className="circle" onClick={handleUserClick}>
                                    <FiUser />
                                </Button>
                                {isLoggedIn ? (
                                    <>
                                        <div className="greeting">Xin chào, User!</div>
                                        {isDropdownOpen && (
                                            <ul className="dropdownMenu">
                                                <li><Button><Person2OutlinedIcon /> My Account</Button></li>
                                                <li><Button><RoomOutlinedIcon /> Order Tracking</Button></li>
                                                <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li>
                                                <li><Button><SettingsOutlinedIcon /> Setting</Button></li>
                                                <li><Button onClick={handleLogout}><LogoutOutlinedIcon /> Sign Out</Button></li>
                                            </ul>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        </ClickAwayListener>

                        {/* Cart Tab */}
                        <div className="cartTab">
                            <Button className="circle">
                                <IoBagOutline />
                            </Button>
                            <span className="count d-flex align-items-center justify-content-center">1</span>
                            <div className="cart-text">Giỏ hàng</div>
                        </div>
                    </div>
                </div>
            </header>
            <Navigation />
        </>
    );
};

export default Header;
