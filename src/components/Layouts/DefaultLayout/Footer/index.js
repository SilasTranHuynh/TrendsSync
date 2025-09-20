import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

import facebookLogo from '~/assets/images/facebook_mediapagelogo.png';
import instagramLogo from '~/assets/images/‌instagram_mediapagelogo.png';
import tiktokLogo from '~/assets/images/tiktok_mediapagelogo.png';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        TrendSync
                    </Link>
                </div>
                <div className={cx('slogan')}>
                    <span>Stay in tune with the latest trends.</span>
                </div>
            </div>
            <div className={cx('contents')}>
                <div className={cx('column')}>
                    <h4>ACCOUNT</h4>
                    <Link to="/signinsignup" className={cx('signup')}>
                        Sign Up
                    </Link>
                    <br></br>
                    <Link to="/signinsignup" className={cx('login')}>
                        Log In
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>UPDATES</h4>
                    <Link to="/search" className={cx('ggtrends')}>
                        Google Trends
                    </Link>
                    <br></br>
                    <Link to="/hashtag" className={cx('tiktok')}>
                        Tiktok Hashtag
                    </Link>
                    <br></br>
                    <Link to="/twitter" className={cx('twitter')}>
                        Twitter
                    </Link>
                    <br></br>
                    <Link to="/postReddit" className={cx('reddit')}>
                        Reddit
                    </Link>
                    <br></br>
                    <Link to="/postNews" className={cx('news')}>
                        Weibo
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>CONTACT</h4>
                    <Link to="/" className={cx('phone')}>
                        Phone Number
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('email')}>
                        Email
                    </Link>
                    <br></br>
                </div>
                <div className={cx('column')}>
                    <h4>SOCIAL MEDIA</h4>
                    <Link to="/" className={cx('m-facebook')}>
                        Facebook
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('m-instagram')}>
                        Instagram
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('tiktok')}>
                        Tiktok
                    </Link>
                </div>
            </div>

            <div className={cx('wrapper-mobile')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        TrendSync
                    </Link>
                </div>
                <div className={cx('slogan')}>
                    <span>Giữ bạn đồng điệu với những xu hướng tương lai</span>
                </div>
                <div className={cx('contents-mobile')}>
                    <Link to="/signinsignup" className={cx('link-mobile')}>
                        TÀI KHOẢN
                    </Link>
                    <Link to="/" className={cx('link-mobile')}>
                        NỀN TẢNG
                    </Link>
                    <Link to="/" className={cx('link-mobile')}>
                        LIÊN HỆ
                    </Link>
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
            </div>
        </footer>
    );
}

export default Footer;
