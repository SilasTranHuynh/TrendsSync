import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './twitter.module.scss';

const cx = classNames.bind(styles);

const TwitterCard = ({ rank, content, tweets }) => {
    return (
        <div className={cx('twitter-card')}>
            <p className={cx('twitter-rank')}>{rank}</p>
            <p className={cx('twitter-content')}>{content}</p>
            <p className={cx('twitter-tweets')}>{tweets}</p>
        </div>
    );
};

const Twitter = () => {
    const [data, setData] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4900/api/twitter-trends")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching Twitter data:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    // Determine the data to display (top 15 or all)
    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Twitter Thịnh Hành</h1>
            <div className={cx('twitter-header')}>
                <p className={cx('header-rank')}>Thứ hạng</p>
                <p className={cx('header-content')}>Nội dung</p>
                <p className={cx('header-tweets')}>Lượt Đăng</p>
            </div>
            <div className={cx('twitter-list')}>
                {displayedData.map((item, index) => (
                    <TwitterCard
                        key={index}
                        rank={`#${item.Rank}`}
                        content={item.Content}
                        tweets={item.Tweets}
                    />
                ))}
            </div>

            {/* "See All" Button */}
            <div className={cx('see-all-container')}>
                <button className={cx('seeall-button')} onClick={toggleSeeAll}>
                    {displayAll ? 'Thu gọn' : 'Xem tất cả'}
                </button>
            </div>
        </div>
    );
};

export default Twitter;
