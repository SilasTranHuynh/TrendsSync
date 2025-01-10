import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './hashtag.module.scss';

const cx = classNames.bind(styles);

const HashtagCard = ({ rank, hashtag, views }) => {
    return (
        <div className={cx('hashtag-card')}>
            <p className={cx('hashtag-rank')}>{rank}</p>
            <p className={cx('hashtag-title')}>{hashtag}</p>
            <p className={cx('hashtag-view')}>{views}</p>
        </div>
    );
};

const Hashtag = () => {
    const [data, setData] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4900/api/tiktok-trends")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching TikTok data:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    // Determine the data to display (top 15 or all)
    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Hashtag Thịnh Hành</h1>
            <div className={cx('hashtag-header')}>
                <p className={cx('header-rank')}>Thứ</p>
                <p className={cx('header-title')}>Hashtag</p>
                <p className={cx('header-view')}>Lượt Đăng</p>
            </div>
            <div className={cx('hashtag-list')}>
                {displayedData.map((item, index) => (
                    <HashtagCard
                        key={index}
                        rank={`#${item.Rank}`}
                        hashtag={item.Hashtag}
                        views={item.Views}
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

export default Hashtag;
