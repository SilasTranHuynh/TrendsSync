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

const cx = classNames.bind(styles);

function Header() {
    
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
                    <Link to="/signinsignup" className={cx("text")}>
                        <span>Log In</span>
                    </Link>
                </div>
            </div>


            <div className={cx('header-top-mobile')}>
                <div className={cx('logo-slogan')}>
                    <div className={cx('logo')}>
                        <Link to="/" className={cx('logo-link')}>
                            TrendSync
                        </Link>
                    </div>
                    <div className={cx('slogan')}>
                        <span>Stay in tune with the latest trends.</span>
                    </div>
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

            <div className={cx('header-bottom-mobile')}>
                <div className={cx('user')}>
                    <img className={cx('bell')} src={bellIcon} />
                    <div className={cx('separation')}> </div>
                    <img className={cx('icon')} src={userIcon} />
                    <Link to="/signinsignup" className={cx("text")}>
                        <span>Log In</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
