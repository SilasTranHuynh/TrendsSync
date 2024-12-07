import React, { useEffect, useState } from "react";
import axios from "axios";

import classNames from 'classnames/bind';
import styles from './videovn.scss';



const cx = classNames.bind(styles);
const VideoCard = ({ rank, title, channel, views }) => {
    return (
        <div className={cx('video1-card')}>
            <p className={cx('video1-rank')}>{rank}</p>
            <p className={cx('video1-title')}>{title}</p>
            <p className={cx('video1-channel')}>{channel}</p>
            <p className={cx('video1-view')}>{views}</p>
        </div>
    );
};



const VideoVN = () => {
    const [data, setData] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/youtube-trends")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching YouTube data:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    const displayedData = displayAll ? data : data.slice(0, 15);
    return (
        <div className={cx('container1')}>
            <h1 className={cx('main-title')}>Âm Nhạc Thịnh Hành</h1>
            <div className={cx('video1-header')}>
                <p className={cx('header-rank')}>Rank</p>
                <p className={cx('header-title')}>Bài Hát</p>
                <p className={cx('header-view')}>Lượt View</p>
            </div>
            <div className={cx('video1-list')}>
                {displayedData.map((item, index) => (
                    <VideoCard
                        key={index}
                        rank={`#${index + 1}`} 
                        title={item.Title}
                        views={item.Views}
                    />
                ))}
            </div>

            {/* "See All" Button */}
            <div className={cx('see-all-container')}>
                <button className={cx('seeall-button')} onClick={toggleSeeAll}>
                    {displayAll ? 'See Less' : 'See All'}
                </button>
            </div>
        </div>
    );
};

export default VideoVN;
