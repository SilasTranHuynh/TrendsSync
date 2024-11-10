import React from 'react';
import styles from './videokr.module.scss';
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

const VideoKR = () => {
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
      <h1 className="size_title">Những Video Xu Hướng Hiện Nay Ở Hàn Quốc </h1>
      {countries.map((country, index) => (
        <CountrySection key={index} country={country} />
      ))}
    </div>
  );
};

export default VideoKR;
