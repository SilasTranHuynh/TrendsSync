import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import TrendSection from './TrendSection.js';
import GoogleTrendSection from './GoogleTrendSection.js';
import TiktokTrendSection from './TiktokTrendSection.js';
import TwitterSection from './TwitterSection.js';
import RedditTrendSection from './RedditTrendSection';
import NewsTrendSection from './NewsTrendSection';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import locationLogo from '~/assets/images/location.png';
import VideoCard from './videoCard.js'
import phoneLogo from '~/assets/images/phone.png';
import mailLogo from '~/assets/images/mail.png';

const cx = classNames.bind(styles);

function Home() {
    // Reddit xu huong
    const [redditTrends, setRedditTrends] = useState([]);

    useEffect(() => {
        // Fetch dữ liệu từ backend API
        const fetchRedditTrends = async () => {
            try {
                const response = await fetch('http://localhost:3000/top-posts');
                const data = await response.json();
                setRedditTrends(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRedditTrends();
    }, []);

    // News xu huong
    const [newsTrends, setNewsTrends] = useState([]);

    useEffect(() => {
        // Fetch dữ liệu từ backend API
        const fetchNewsTrends = async () => {
            try {
                const response = await axios.get('http://localhost:3000/top-headlines');
                setNewsTrends(response.data.newsposts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchNewsTrends();
    }, []);


    // Trend Category xu huong
    //const [categoryTrends, setCategoryTrends] = useState([]);

    //useEffect(() => {
        // Fetch dữ liệu từ backend API
    //    const fetchCategoryTrends = async () => {
    //        try {
    //            const response = await axios.get('http://localhost:4900/api/top-categories');
    //            setCategoryTrends(response.data);
    //        } catch (error) {
    //            console.error('Error fetching data:', error);
    //        }
    //    };
    //    fetchCategoryTrends();
    //}, []);



    // Youtube xu huong
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

    // Twitter xu huong
    const [twitterTrends, setTwitterTrends] = useState([]);

    useEffect(() => {
        // Gọi API lấy dữ liệu Twitter
        const fetchTwitterData = async () => {
            try {
                const response = await axios.get("http://localhost:4900/api/twitter-trends");
                setTwitterTrends(response.data);
            } catch (error) {
                console.error("Error fetching Twitter trends", error);
            }
        };

        fetchTwitterData();
    }, []); // Chạy một lần khi component được render


    const [googleTrends, setGoogleTrends] = useState([]);

    // Google xu huong
    useEffect(() => {
        const fetchGoogleTrendsData = async () => {
            try {
                const response = await axios.get("http://localhost:4900/api/google-trends");
                console.log(response.data);  // Kiểm tra dữ liệu ở đây
                setGoogleTrends(response.data);  // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching Google Trends:", error);
            }
        };
    
        fetchGoogleTrendsData();
    }, []);

    // Tiktok xu huong
    const [tiktokTrends, setTiktokTrends] = useState([]);

    useEffect(() => {
      const fetchTikTokTrends = async () => {
        try {
          const response = await fetch('http://localhost:4900/api/tiktok-trends'); // Đảm bảo đường dẫn API đúng
          const data = await response.json();
          setTiktokTrends(data); // Lưu dữ liệu TikTok vào state
        } catch (error) {
          console.error('Error fetching TikTok trends:', error);
        }
      };
      
      fetchTikTokTrends();
    }, []);

    return (
        <div className={cx('container')}>

            <div className={cx('left-column')}>
                
                <div className={cx('trends-card-row')}>
                    <div className={cx('trend-section-row')}>
                        {googleTrends.length > 0 ? (
                            <GoogleTrendSection googleSearch = {{ googleContents : googleTrends}}/>
                        ) : (
                            <p>No Google trends available</p>
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
                    <h2 className={cx('cardvideo-title-new')}>Trending Music</h2>
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
                    
                <div className={cx('see-all-container')}>
                    <Link to="/videovn" className={cx('seeall2')}>
                        See all
                    </Link>
                </div>
            </div>
    
            
            <div className={cx('row')}>
                <h2 className={cx('title')}>Reddit Trending Posts</h2>
                {redditTrends.length > 0 ? (
                    <RedditTrendSection redditTrends={{ redditContents: redditTrends }} />
                ) : (
                    <p>No Reddit trends available</p>
                )}
            </div>

            <div className={cx('row')}>
                <h2 className={cx('title')}>News Trending Posts</h2>
                {newsTrends.length > 0 ? (
                    <NewsTrendSection newsTrends={{ newsContents: newsTrends }} />
                ) : (
                    <p>No News trends available</p>
                )}
            </div>
    
            <div className={cx('contact-section')}>
                <h2 className={cx('section-heading')}>Contact Mailbox</h2>
                <div className={cx('form-section')}>
                    <div className={cx('contact-left-column')}>
                        <p>
                            <a href="#" className={cx('contact-location')}>
                                <img className={cx('contact-logo')} src={locationLogo} alt="Location" />
                            </a>
                            Thu Duc, Ho Chi Minh
                        </p>
                        <p>
                            <a className={cx('contact-phone')}>
                                <img className={cx('contact-logo')} src={phoneLogo} alt="Phone" />
                            </a>
                            Phone: +84 869 162 370
                        </p>
                        <p>
                            <a className={cx('contact-email')}>
                                <img className={cx('contact-logo')} src={mailLogo} alt="Mail" />
                            </a>
                            Email: trendssync@gmail.com
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
//<div className={cx('trend-section-row')}>
//    {categoryTrends.length > 0 ? (
//        <TrendSection categoryTrends = {{ trendContents : categoryTrends}} />
//    ) : (
        <p>No featured trends available</p>
//    )}
//</div>