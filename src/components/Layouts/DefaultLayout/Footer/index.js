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
                    <span>Giữ bạn đồng điệu với các xu hướng</span>
                </div>
            </div>
            <div className={cx('contents')}>
                <div className={cx('column')}>
                    <h4>Tài khoản</h4>
                    <Link to="/signinsignup" className={cx('signup')}>
                        Đăng kí
                    </Link>
                    <br></br>
                    <Link to="/signinsignup" className={cx('login')}>
                        Đăng nhập
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>Cập nhật</h4>
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
                        News
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>Liên hệ</h4>
                    <Link to="/" className={cx('phone')}>
                        Số điện thoại
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('email')}>
                        Email
                    </Link>
                    <br></br>
                </div>
                <div className={cx('column')}>
                    <h4>Mạng xã hội</h4>
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
                    <span>Giữ bạn đồng điệu với các xu hướng</span>
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
