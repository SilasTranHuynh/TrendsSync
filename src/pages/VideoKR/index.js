import React, { useState, useEffect } from 'react';
import styles from './videokr.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

const VideoCard = ({ rank, hashtag }) => (
  <div className={cx("video-card")}>
    <p className={cx("size")}>Rank: {rank}</p>
    <p className={cx("size")}>Hashtag: {hashtag}</p>
  </div>
);

const VideoKR = () => {
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/get-data')
      .then((response) => {
        setVideosData(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []);

  return (
    <div className={cx("gallery-container")}>
      <h1 className={cx("size_title")}>Những Hashtag Xu Hướng Hiện Nay</h1>
      <div className={cx("video-row")}>
        {videosData.map((item, index) => (
          <VideoCard 
            key={index} 
            rank={item.Rank}  
            hashtag={item.Hashtag}  
          />
        ))}
      </div>
    </div>
  );
};

export default VideoKR;
