import React from 'react';
import styles from './videous.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const VideoCard = ({ videoTitle, thumbnailUrl, videoOwner, videoView }) => (
  <div className={cx('video2-card')}>
    <div className={cx('video2-thumbnail')}>
      <img src={thumbnailUrl} alt={videoTitle} />
    </div>
    <p className={cx('video2-title')}>{videoTitle}</p>
    <div className={cx('owner2-view')}>
      <p className={cx('video2-owner')}>{videoOwner}</p>
      <p className={cx('video2-view')}>{videoView}</p>
    </div>
  </div>
);

const VideoSection = ({ youtubeContents }) => (
  <div className={cx('video2-component')}>
      <VideoCard youtubeContents={youtubeContents} />
  </div>
);




const VideoUS = () => {
  const youtubeTrends = [
    {
        youtubeContents: [
            { videoTitle: 'Video Title 1', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 1', videoView: '1,000,000 views' },
            { videoTitle: 'Video Title 2', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 2', videoView: '2,000,000 views' },
            { videoTitle: 'Video Title 3', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 3', videoView: '3,000,000 views' },
            { videoTitle: 'Video Title 4', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 4', videoView: '4,000,000 views' },
            { videoTitle: 'Video Title 5', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 5', videoView: '5,000,000 views' },
            { videoTitle: 'Video Title 6', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 6', videoView: '6,000,000 views' },
            { videoTitle: 'Video Title 7', thumbnailUrl: 'https://via.placeholder.com/50', videoOwner: 'Owner 7', videoView: '7,000,000 views' }
        ]
    }
  ];
  return (
    <div className={cx('right2-column')}>
        <div className={cx('video2-card-main')}>
            <div className={cx('video2-card-container')}>
                {youtubeTrends[0].youtubeContents.length > 0 ? youtubeTrends[0].youtubeContents.map((youtubeTrend, index) => (
                    <VideoCard key={index} {...youtubeTrend} />
                )) : <p>No Video trends available</p>}
            </div>
        </div>
     </div>   
  );
};

export default VideoUS;
