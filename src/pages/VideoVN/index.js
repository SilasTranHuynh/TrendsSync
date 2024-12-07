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
        axios.get("http://localhost:4900/api/youtube-trends")
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
import React from 'react';
import styles from './videovn.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const VideoCard = ({ title, videoId, singer, thumbnailUrl  }) => (
  <div className="video-card">
    <div className="thumbnail">
        <img src={thumbnailUrl} />
    </div>
    <p className="size">{title} - Video {videoId}</p>
    <p className="size">{singer}</p>
  </div>
);

const CountrySection = ({ country }) => (
  <div className="country-section">
    <h2 className="country-section">{country.name}</h2>
    <div className="video-row">
      {country.videos.map((video, idx) => (
        <VideoCard 
          key={idx} 
          title={country.name} 
          videoId={video.id}  // id video
          singer={video.singer} // truyen ten ca si
          thumbnailUrl={video.thumbnailUrl} // link video
        />
      ))}
    </div>
  </div>
);

const VideoVN = () => {
    const countries = [
        {
          name: "ÂM NHẠC",
          videos: [ 
            { id: 1, singer: "Ca sĩ I", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 2, singer: "Ca sĩ J", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 3, singer: "Ca sĩ K", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 4, singer: "Ca sĩ L", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
          ],
        },
        {
          name: "GIẢI TRÍ",
          videos: [
            { id: 1, singer: "Ca sĩ M", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 2, singer: "Ca sĩ N", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 3, singer: "Ca sĩ O", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 4, singer: "Ca sĩ P", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
          ],
        },
        {
          name: "PHIM ẢNH",
          videos: [ 
            { id: 1, singer: "Ca sĩ Q ", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 2, singer: "Ca sĩ R", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 3, singer: "Ca sĩ S", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
            { id: 4, singer: "Ca sĩ T", thumbnailUrl: "https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain" },
          ],
        },
      ];


  return (
    <div className="gallery-container">
      <h1 className="size_title">Những Video Xu Hướng Hiện Nay Ở Việt Nam</h1>
      {countries.map((country, index) => (
        <CountrySection key={index} country={country} />
      ))}
    </div>
  ); 
};

export default VideoVN;
