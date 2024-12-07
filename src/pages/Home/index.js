import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import TrendSection from './TrendSection.js';
import GoogleTrendSection from './GoogleTrendSection.js';
import TiktokTrendSection from './TiktokTrendSection.js';
import TwitterSection from './TwitterSection.js';


import React, { useEffect, useState } from 'react';
import axios from 'axios';


import locationLogo from '~/assets/images/location.png';
import VideoCard from './videoCard.js'
import phoneLogo from '~/assets/images/phone.png';
import mailLogo from '~/assets/images/mail.png';

const cx = classNames.bind(styles);



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

function Home() {

    const [youtubeTrends, setYoutubeTrends] = useState([]);

    useEffect(() => {
        const fetchYouTubeTrends = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/youtube-trends");
                setYoutubeTrends(response.data);  // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching YouTube trends:", error);
            }
        };

        fetchYouTubeTrends();
    }, []);  // Fetch dữ liệu một lần khi component được render

    const trends = [
        {
            trendContents: [
                { trendTitle: 'Trend 1', trendView: '1000' },
                { trendTitle: 'Trend 2', trendView: '1500' },
                { trendTitle: 'Trend 3', trendView: '1200' },
                { trendTitle: 'Trend 1', trendView: '1000' },
                { trendTitle: 'Trend 2', trendView: '1500' },
            ],
        },
    ];


    //twitter-xu-huong
    const [twitterTrends, setTwitterTrends] = useState([]);

    useEffect(() => {
        // Gọi API lấy dữ liệu Twitter
        const fetchTwitterData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/twitter-trends");
                setTwitterTrends(response.data);
            } catch (error) {
                console.error("Error fetching Twitter trends", error);
            }
        };

        fetchTwitterData();
    }, []); // Chạy một lần khi component được render


    const [googleTrends, setGoogleTrends] = useState([]);

    // Fetch Google Trends data from API
    useEffect(() => {
        const fetchGoogleTrendsData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/google-trends");
                console.log(response.data);  // Kiểm tra dữ liệu ở đây
                setGoogleTrends(response.data);  // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching Google Trends:", error);
            }
        };
    
        fetchGoogleTrendsData();
    }, []);



    const [tiktokTrends, setTiktokTrends] = useState([]);

    // Tiktok-xu-huong
    useEffect(() => {
      const fetchTikTokTrends = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/tiktok-trends'); // Đảm bảo đường dẫn API đúng
          const data = await response.json();
          setTiktokTrends(data); // Lưu dữ liệu TikTok vào state
        } catch (error) {
          console.error('Error fetching TikTok trends:', error);
        }
      };
      
      fetchTikTokTrends();
    }, []);



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



    return (
        <div className={cx('container')}>
            <div className={cx('left-column')}>
                <div className={cx('trends-card-row')}>
                    <div className={cx('trend-section-row')}>
                        {trends.length > 0 ? (
                            trends.map((trend, index) => (
                                <TrendSection key={index} trends={trend} />
                            ))
                        ) : (
                            <p>No featured trends available</p>
                        )}
                    </div>

                         <div className="trend-section-row">
                            {/* Pass dữ liệu Twitter vào TwitterSection */}
                            {twitterTrends.length > 0 ? (
                                <TwitterSection hashtags={{ hashtagContents: twitterTrends }} />
                            ) : (
                                <p>No Twitter trends available</p>
                            )}
                        </div>
                </div>
    
                <div className={cx('trends-card-row')}>
                    <div className={cx('trend-section-row')}>
                        {googleTrends.length > 0 ? (
                                    <GoogleTrendSection googleSearch = {{ googleContents : googleTrends}}/>
                                
                            ) : (
                                <p>No Google trends available</p>
                            )}
                    </div>
    
                    <div className={cx('trend-section-row')}>
                        {tiktokTrends.length > 0 ? (
                            <TiktokTrendSection tiktokTrends={{ tiktokContents: tiktokTrends }} />
                        ) : (
                            <p>No TikTok trends available</p>
                        )}
                        </div>
                </div>
            </div>
    
            <div className={cx('right2-column')}>
            <div className={cx('video2-card-main')}>
                <h2 className={cx('cardvideo-title-new')}>Âm nhạc thịnh hành</h2>
                <div className={cx('video2-card-container')}>
                    {youtubeTrends.length > 0 ? (
                        youtubeTrends.map((youtubeTrend, index) => (
                            <VideoCard
                                key={index}
                                youtubeTrend={youtubeTrend}  // Truyền youtubeTrend toàn bộ đối tượng
                            />
                        ))
                    ) : (
                        <p>No YouTube trends available</p>
                    )}
                </div>
            </div>
                    
                 {/* Adding "See All" link at the bottom */}
                    <div className={cx('see-all-container')}>
                    <Link to="/videovn" className={cx('seeall2')}>
                        See all
                    </Link>
                    </div>
            </div>
    
            <div className={cx('row row-2')}>
                <h2 className={cx('title')}>Featured Posts</h2>
                {platforms.map((platform, index) => (
                    <MediaPlatform key={index} platform={platform} />
                ))}
            </div>
    
            <div className={cx('contact-section')}>
                <h2 className={cx('section-heading')}>Contact Mailbox</h2>
                <div className={cx('form-section')}>
                    <div className={cx('contact-left-column')}>
                        <p>
                            <a href="#" className={cx('contact-location')}>
                                <img className={cx('contact-logo')} src={locationLogo} alt="Location" />
                            </a>
                            Chicago, US
                        </p>
                        <p>
                            <a className={cx('contact-phone')}>
                                <img className={cx('contact-logo')} src={phoneLogo} alt="Phone" />
                            </a>
                            Phone: +00 151515
                        </p>
                        <p>
                            <a className={cx('contact-email')}>
                                <img className={cx('contact-logo')} src={mailLogo} alt="Mail" />
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