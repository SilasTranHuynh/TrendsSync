import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './searchtrend.scss';

const cx = classNames.bind(styles);

const SearchCard = ({ rank, content, tweets }) => {
    return (
        <div className={cx('twitter-card')}>
            <p className={cx('twitter-rank')}>{rank}</p>
            <p className={cx('twitter-content')}>{content}</p>
            <p className={cx('twitter-tweets')}>{tweets}</p>
        </div>
    );
};

const Search = () => {
    const [data, setData] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4900/api/google-trends")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching Twitter data:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    // Determine the data to display (top 15 or all)
    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx('container1')}>
            <h1 className={cx('main-title')}>Tìm Kiếm Xu Hướng</h1>
            <div className={cx('twitter-header')}>
                <p className={cx('header-rank')}>Thứ hạng</p>
                <p className={cx('header-content')}>Nội dung</p>
                <p className={cx('header-tweets')}>Lượt Tìm Kiếm</p>
            </div>
            <div className={cx('twitter-list')}>
                {displayedData.map((item, index) => (
                  <SearchCard
                  key={index}
                  rank={`#${item.Rank}`}
                  content={item.Title}  // Dùng Title làm content
                  tweets={item.SearchVolume}  // Dùng SearchVolume làm số lượt đăng
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

export default Search;
