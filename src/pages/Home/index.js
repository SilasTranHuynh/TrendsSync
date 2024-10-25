import classNames from 'classnames/bind';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('left-column')}>
                <div className={cx('row')}>
                    <h2 className={cx('title')}>Featured Trends</h2>
                    <div className={cx('list-wrapper')}>
                        <div className={cx('list')}>
                            <ul className={cx('list-item-wrapper')}>
                                <li className={cx('trend-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('trend-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('trend-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <h2 className={cx('title')}>Popular Hashtags</h2>
                    <div className={cx('list-wrapper')}>
                        <div className={cx('list')}>
                            <ul className={cx('list-item-wrapper')}>
                                <li className={cx('hashtag-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('hashtag-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('hashtag-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('hashtag-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                                <li className={cx('hashtag-item')}>
                                    <div className={cx('item-content')}>
                                        <p>Test</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('row row-2')}>
                    <h2 className={cx('title')}>Featured Posts</h2>
                    <div className={cx('post-component')}>
                        <h3 className={cx('sub-title')}>Reddit</h3>
                        <div className={cx('list-wrapper')}>
                            <ul className={cx('list-item-wrapper')}>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('post-component')}>
                        <h3 className={cx('sub-title')}>News</h3>
                        <div className={cx('list-wrapper')}>
                            <ul className={cx('list-item-wrapper')}>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                                <li className={cx('post-item')}>
                                    <a href="#" className={cx('item-photo')}>
                                        <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                    </a>
                                    <p href="#" className={cx('item-content')}>
                                        Test
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('right-column')}>
                <h2 className={cx('title')}>Popular Videos</h2>
                <div className={cx('video-list')}>
                    <div className={cx('list-wrapper')}>
                        <ul className={cx('list-video-item-wrapper')}>
                            <li className={cx('item')}>
                                <div className={cx('item-content')}>
                                    <p>Test</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('list-wrapper')}>
                        <ul className={cx('list-video-item-wrapper')}>
                            <li className={cx('video-item')}>
                                <a href="#" className={cx('item-content')}>
                                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                </a>
                                <p href="#" className={cx('item-content')}>
                                    Test
                                </p>
                            </li>
                            <li className={cx('video-item')}>
                                <a href="#" className={cx('item-content')}>
                                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                </a>
                                <p href="#" className={cx('item-content')}>
                                    Test
                                </p>
                            </li>
                            <li className={cx('video-item')}>
                                <a href="#" className={cx('item-content')}>
                                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                </a>
                                <p href="#" className={cx('item-content')}>
                                    Test
                                </p>
                            </li>
                            <li className={cx('video-item')}>
                                <a href="#" className={cx('item-content')}>
                                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                                </a>
                                <p href="#" className={cx('item-content')}>
                                    Test
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cx('contact-section')}>
                <div className={cx('content-section')}>
                    <h2 className={cx('section-heading')}>Contact Mailbox</h2>
                </div>
                <div className={cx('form-section')}>
                    <div className={cx('contact-left-column')}>
                        <p>
                            <a href="#" className={cx('contact-location')}>
                                <img src=""></img>
                            </a>
                            Chicago, US
                        </p>
                        <p>
                            <a className={cx('contact-phone')}>
                                <img src=""></img>
                            </a>
                            Phone: +00 151515
                        </p>
                        <p>
                            <a className={cx('contact-email')}>
                                <img src=""></img>
                            </a>
                            Email: mail@mail.com
                        </p>
                    </div>
                    <div className={cx('contact-right-column')}>
                        <form>
                            <div className={cx('contact-row')}>
                                <div className={cx('informations-2')}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        className={cx('form-control')}
                                    />
                                </div>
                                <div className={cx('informations-2')}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        className={cx('form-control')}
                                    />
                                </div>
                            </div>
                            <div className={cx('contact-row')}>
                                <div className={cx('informations-1')}>
                                    <textarea
                                        type="text"
                                        placeholder="Message"
                                        required
                                        name="message"
                                        className={cx('form-control')}
                                    />
                                </div>
                            </div>
                            <input className={cx('btn-send')} type="submit" value="SEND" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
