import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

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
                    <span>Keep you in sync with future trends</span>
                </div>
            </div>
            <div className={cx('contents')}>
                <div className={cx('column')}>
                    <h4>ACCOUNT</h4>
                    <Link to="/" className={cx('signup')}>
                        Sign up
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('login')}>
                        Log in
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>PLATFORM</h4>
                    <Link to="/topic" className={cx('ggtrends')}>
                        Google Trends
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
                    <h4>CONTACT</h4>
                    <Link to="/" className={cx('phone')}>
                        Phone number
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('email')}>
                        Email
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('c-facebook')}>
                        Facebook
                    </Link>
                    <br></br>
                    <Link to="/" className={cx('c-instagram')}>
                        Instagram
                    </Link>
                </div>
                <div className={cx('column')}>
                    <h4>MEDIA</h4>
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
        </footer>
    );
}

export default Footer;
