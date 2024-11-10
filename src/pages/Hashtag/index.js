import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './hashtag.module.scss';

const cx = classNames.bind(styles);

const HashtagCard = ({ hashtagRank, hashtagTitle, hashtagView }) => (
    <div className={cx('hashtag-card')}>
        <p className={cx('hashtag-rank')}>{hashtagRank}</p>
        <p className={cx('hashtag-title')}>{hashtagTitle}</p>
        <p className={cx('hashtag-view')}>{hashtagView}</p>
    </div>
);

const HashtagSection = ({ title, hashtag }) => (
    <div className={cx('hashtag-component')}>
        <h2 className={cx('section-title')}>{title}</h2>
        <div className={cx('hashtag-header')}>
            <p className={cx('header-rank')}>Rank</p>
            <p className={cx('header-title')}>Hashtag</p>
            <p className={cx('header-view')}>Lượt bài đăng</p>
        </div>
        <div className={cx('hashtag-list')}>
            {(Array.isArray(hashtag) ? hashtag : []).map((hashtagContent, index) => (
                <HashtagCard
                    key={index}
                    hashtagRank={hashtagContent.Rank}
                    hashtagTitle={hashtagContent.Hashtag}
                    hashtagView={hashtagContent.Views}
                />
            ))}
        </div>
    </div>
);


function Hashtag() {
    const [nowData, setNowData] = useState([]);
    const [previousData, setPreviousData] = useState({
        "10p": [],
        "8p": [],
        "6p": [],
        "4p": [],
        "2p": [],
    });
    const [viewMode, setViewMode] = useState("Now");

    useEffect(() => {
        // Hàm lấy dữ liệu từ API
        const fetchData = () => {
            axios.get('http://localhost:5000/api/get-hashtags')
                .then(response => {
                    const newData = Array.isArray(response.data.now) ? response.data.now : [];
        
                    setPreviousData(prevData => {
                        const updatedData = { ...prevData };
                        const timeKeys = Object.keys(updatedData);
        
                        // Đẩy dữ liệu xuống các mốc thời gian cũ
                        for (let i = timeKeys.length - 1; i > 0; i--) {
                            updatedData[timeKeys[i]] = updatedData[timeKeys[i - 1]];
                        }
                        updatedData["2p"] = nowData;
        
                        return updatedData;
                    });
        
                    setNowData(newData);
                })
                .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
        };

        // Gọi hàm fetchData ngay lập tức và sau mỗi 2 phút (120000 ms)
        fetchData();
        const interval = setInterval(fetchData, 3000); // 2 phút

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, [nowData]);

    const handleTimeClick = (time) => {
        setViewMode(time);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('timeline-list')}>
                {Object.keys(previousData).map((time) => (
                    <a href="#" onClick={() => handleTimeClick(time)} key={time}>{time}</a>
                ))}
                <a href="#" onClick={() => handleTimeClick("Now")}>Now</a>
            </div>
            <h1 className={cx('main-title')}>Top Hashtags</h1>

            {/* Hiển thị dữ liệu theo viewMode */}
            {viewMode === "Now" ? (
                <HashtagSection title="Now" hashtag={nowData} />
            ) : (
                <HashtagSection title={`${viewMode} trước`} hashtag={previousData[viewMode]} />
            )}
        </div>
    );
}

export default Hashtag;
