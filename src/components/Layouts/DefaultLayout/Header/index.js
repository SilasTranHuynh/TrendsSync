import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Tippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '../../Popper';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import facebookLogo from '~/assets/images/facebook_mediapagelogo.png';
import instagramLogo from '~/assets/images/‌instagram_mediapagelogo.png';
import tiktokLogo from '~/assets/images/tiktok_mediapagelogo.png';
import userIcon from '~/assets/images/user.png';
import bellIcon from '~/assets/images/bell.png';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


const cx = classNames.bind(styles);

function Header() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.name); // Cập nhật tên từ payload JWT
            } catch (err) {
                console.error("Token không hợp lệ:", err);
            }
        }
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-top')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        <span>TrendSync</span>
                    </Link>
                </div>
                <div className={cx('slogan')}>
                    <span>Stay in tune with the latest trends.</span>
                </div>
                <div className={cx('media-page')}>
                    <div className={cx('media-page-instagram')}>
                        <img className={cx('media-logo')} src={instagramLogo} />
                    </div>
                    <div className={cx('media-page-facebook')}>
                        <img className={cx('media-logo')} src={facebookLogo} />
                    </div>
                    <div className={cx('media-page-tiktok')}>
                        <img className={cx('media-logo')} src={tiktokLogo} />
                    </div>
                </div>
            </div>

            <div className={cx('header-bottom')}>
                <div className={cx('user')}>
                    <img className={cx('bell')} src={bellIcon} />
                    <div className={cx('separation')}> </div>
                    <img className={cx('icon')} src={userIcon} />

                    {username ? (
                        <span className={cx("text")}>{username}</span>
                    ) : (
                        <Link to="/signinsignup" className={cx("text")}>
                            <span>Đăng nhập</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
