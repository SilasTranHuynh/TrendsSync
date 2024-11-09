import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import locationLogo from '~/assets/images/location.png';
import phoneLogo from '~/assets/images/phone.png';
import mailLogo from '~/assets/images/mail.png';

const cx = classNames.bind(styles);

//Trend
const TrendCard = ({ trendTitle, trendView }) => (
    <div className={cx('trend-card')}>
        <p className={cx('trend-title')}>{trendTitle}</p>
        <p className={cx('trend-view')}>{trendView}</p>
    </div>
);

const TrendSection = ({ trend }) => (
    <div className={cx('trend-component')}>
        <div className={cx('trend-list')}>
            {trend.trendContents.map((trendContent, index) => (
                <TrendCard key={index} trendTitle={trendContent.trendTitle} trendView={trendContent.trendView} />
            ))}
        </div>
        <Link to="/topic" className={cx('seeall')}>
            See all
        </Link>
    </div>
);

//Hashtag
const HashtagCard = ({ hashtagTitle, hashtagView }) => (
    <div className={cx('hashtag-card')}>
        <p className={cx('hashtag-title')}>{hashtagTitle}</p>
        <p className={cx('hashtag-view')}>{hashtagView}</p>
    </div>
);

const HashtagSection = ({ hashtag }) => (
    <div className={cx('hashtag-component')}>
        <div className={cx('hashtag-list')}>
            {hashtag.hashtagContents.map((hashtagContent, index) => (
                <HashtagCard
                    key={index}
                    hashtagTitle={hashtagContent.hashtagTitle}
                    hashtagView={hashtagContent.hashtagView}
                />
            ))}
        </div>
        <Link to="/hashtag" className={cx('seeall')}>
            See all
        </Link>
    </div>
);

//Post
const PostCard = ({ postTitle, thumbnailUrl }) => (
    <div className={cx('post-card')}>
        <div className={cx('post-thumbnail')}>
            <img className={cx('post-thumbnail-img')} src={thumbnailUrl} />
        </div>
        <p className={cx('post-title')}>{postTitle}</p>
    </div>
);

const MediaPlatform = ({ platform }) => (
    <div className={cx('post-component')}>
        <div className={cx('post-component-wrapper')}>
            <h3 className={cx('platform-title')}>{platform.name}</h3>
            <div className={cx('post-list')}>
                {platform.posts.map((post, index) => (
                    <PostCard key={index} postTitle={post.postTitle} thumbnailUrl={post.thumbnailUrl} />
                ))}
            </div>
        </div>
        <Link
            to={platform.name === 'Reddit' ? '/postReddit' : platform.name === 'News' ? '/postNews' : '#'}
            className={cx('seeall')}
        >
            See all
        </Link>
    </div>
);

//Video
const VideoCard = ({ videoTitle, thumbnailUrl, videoOwner, videoView }) => (
    <div className={cx('video-card')}>
        <div className={cx('video-thumbnail')}>
            <img src={thumbnailUrl} />
        </div>
        <p className={cx('video-title')}>{videoTitle}</p>
        <div className={cx('owner-view')}>
            <p className={cx('video-owner')}>{videoOwner}</p>
            <p className={cx('video-view')}>{videoView}</p>
        </div>
    </div>
);

const CountryOfOrigin = ({ country }) => (
    <div className={cx('video-component')}>
        <div className={cx('video-list')}>
            {country.videos.map((video, index) => (
                <VideoCard
                    key={index}
                    videoTitle={video.videoTitle}
                    thumbnailUrl={video.thumbnailUrl}
                    videoOwner={video.videoOwner}
                    videoView={video.videoView}
                />
            ))}
        </div>
    </div>
);

function Home() {
    //Trend
    const trends = [
        {
            trendContents: [
                { trendTitle: 'Test', trendView: '100' },
                { trendTitle: 'Test', trendView: '100' },
                { trendTitle: 'Test', trendView: '100' },
            ],
        },
    ];

    //Hashtag
    const hashtags = [
        {
            hashtagContents: [
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
            ],
        },
    ];

    //Post
    const platforms = [
        {
            name: 'Reddit',
            posts: [
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
            ],
        },
        {
            name: 'News',
            posts: [
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
            ],
        },
    ];

    //Video
    const countries = [
        {
            videos: [
                {
                    videoTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                    videoOwner: 'TrendsSync',
                    videoView: '1000',
                },
                {
                    videoTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                    videoOwner: 'TrendsSync',
                    videoView: '1000',
                },
                {
                    videoTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                    videoOwner: 'TrendsSync',
                    videoView: '1000',
                },
                {
                    videoTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                    videoOwner: 'TrendsSync',
                    videoView: '1000',
                },
            ],
        },
    ];

    return (
        <div className={cx('container')}>
            <div className={cx('left-column')}>
                <div className={cx('row')}>
                    <h2 className={cx('title')}>Featured Trends</h2>
                    {trends.map((trend, index) => (
                        <TrendSection key={index} trend={trend} />
                    ))}
                </div>
                <div className={cx('row')}>
                    <h2 className={cx('title')}>Popular Hashtags</h2>
                    {hashtags.map((hashtag, index) => (
                        <HashtagSection key={index} hashtag={hashtag} />
                    ))}
                </div>
                <div className={cx('row row-2')}>
                    <h2 className={cx('title')}>Featured Posts</h2>
                    {platforms.map((platform, index) => (
                        <MediaPlatform key={index} platform={platform} />
                    ))}
                </div>
            </div>

            <div className={cx('right-column')}>
                <h2 className={cx('title')}>Popular Videos</h2>
                <div className={cx('country-section')}>
                    <ul className={cx('list-country')}>
                        <li className={cx('country-component')}>
                            <p>Test1</p>
                        </li>
                    </ul>
                    <ul className={cx('list-section')}>
                        <li className={cx('section-component')}>
                            <p>Test2</p>
                        </li>
                    </ul>
                </div>
                {countries.map((country, index) => (
                    <CountryOfOrigin key={index} country={country} />
                ))}
            </div>

            <div className={cx('contact-section')}>
                <h2 className={cx('section-heading')}>Contact Mailbox</h2>
                <div className={cx('form-section')}>
                    <div className={cx('contact-left-column')}>
                        <p>
                            <a href="#" className={cx('contact-location')}>
                                <img className={cx('contact-logo')} src={locationLogo}></img>
                            </a>
                            Chicago, US
                        </p>
                        <p>
                            <a className={cx('contact-phone')}>
                                <img className={cx('contact-logo')} src={phoneLogo}></img>
                            </a>
                            Phone: +00 151515
                        </p>
                        <p>
                            <a className={cx('contact-email')}>
                                <img className={cx('contact-logo')} src={mailLogo}></img>
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
