import classNames from 'classnames/bind';
import styles from './header.module.scss';
import Tippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '../../Popper';
import { Link } from 'react-router-dom';

import facebookLogo from '~/assets/images/facebook_mediapagelogo.png';
import instagramLogo from '~/assets/images/‌instagram_mediapagelogo.png';
import tiktokLogo from '~/assets/images/tiktok_mediapagelogo.png';
import userIcon from '~/assets/images/user.png';
import bellIcon from '~/assets/images/bell.png';

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
                    <span>Keep you in sync with future trends</span>
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
                <div className={cx('contents')}>
                    <Link to="/topic" className={cx('topic')}>
                        TOPIC
                    </Link>

                    <Link to="/hashtag" className={cx('hashtag')}>
                        HASHTAG
                    </Link>

                    <Tippy
                        placement="bottom-start"
                        offset={[0, -0.5]}
                        interactive
                        render={(attrs) => (
                            <PopperWrapper>
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Link to="/postReddit" className={cx('inner-box')}>
                                        REDDIT
                                    </Link>
                                    <br></br>
                                    <Link to="/postNews" className={cx('inner-box')}>
                                        NEWS
                                    </Link>
                                </div>
                            </PopperWrapper>
                        )}
                    >
                        <div className={cx('post')}>
                            <span>POST</span>
                        </div>
                    </Tippy>
                    <Tippy
                        placement="bottom-start"
                        offset={[0, -0.5]}
                        interactive
                        render={(attrs) => (
                            <PopperWrapper>
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Link to="/" className={cx('inner-box')}>
                                        VIETNAM
                                    </Link>
                                    <br />
                                    <Link to="/" className={cx('inner-box')}>
                                        KOREA
                                    </Link>
                                    <br />
                                    <Link to="/" className={cx('inner-box')}>
                                        AMERICA
                                    </Link>
                                </div>
                            </PopperWrapper>
                        )}
                    >
                        <div className={cx('video')}>
                            <span>VIDEO</span>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('user')}>
                    <img className={cx('bell')} src={bellIcon} />
                    <div className={cx('separation')}> </div>
                    <img className={cx('icon')} src={userIcon} />
                    <Link to="/signinsignup" className={cx("text")}>
                        <span>Sign In</span>
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
                        <span>Keep you in sync with future trends</span>
                    </div>
                </div>
                <div className={cx('login-mobile')}>
                    <img className={cx('icon')} src={userIcon} />
                    <Link to="/signinsignup" className={cx("text")}>
                        <span>Sign In</span>
                    </Link>
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
                <div className={cx('contents')}>
                    <Link to="/topic" className={cx('topic')}>
                        TOPIC
                    </Link>

                    <Link to="/hashtag" className={cx('hashtag')}>
                        HASHTAG
                    </Link>

                    <Tippy
                        placement="bottom-start"
                        offset={[0, -0.5]}
                        interactive
                        render={(attrs) => (
                            <PopperWrapper>
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Link to="/postReddit" className={cx('inner-box')}>
                                        REDDIT
                                    </Link>
                                    <br></br>
                                    <Link to="/postNews" className={cx('inner-box')}>
                                        NEWS
                                    </Link>
                                </div>
                            </PopperWrapper>
                        )}
                    >
                        <div className={cx('post')}>
                            <span>POST</span>
                        </div>
                    </Tippy>
                    <Tippy
                        placement="bottom-start"
                        offset={[0, -0.5]}
                        interactive
                        render={(attrs) => (
                            <PopperWrapper>
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <Link to="/" className={cx('inner-box')}>
                                        VIETNAM
                                    </Link>
                                    <br />
                                    <Link to="/" className={cx('inner-box')}>
                                        KOREA
                                    </Link>
                                    <br />
                                    <Link to="/" className={cx('inner-box')}>
                                        AMERICA
                                    </Link>
                                </div>
                            </PopperWrapper>
                        )}
                    >
                        <div className={cx('video')}>
                            <span>VIDEO</span>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('user')}>
                    <img className={cx('bell')} src={bellIcon} />
                </div>
            </div>
        </header>
    );
}

export default Header;
