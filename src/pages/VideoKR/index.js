import classNames from 'classnames/bind';
import styles from './videokr.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import React from 'react';

const cx = classNames.bind(styles);
 
const TwitterSection = ({ hashtags }) => {
    const hashtagContents = hashtags.hashtagContents;
    return (
        <div className= "popular-trend-component" >
            <TwitterCard hashtagContents={hashtagContents} />
        </div>
    );
};

const TwitterCard = ({ hashtagContents }) => (
  <div className={cx('popular-card')}>
      
      <h2 className={cx('card-title-new')}>Twitter Xu Hướng</h2>
      <div className={cx('card-header')}>
          <div className={cx('rank-popular')}>Rank</div>
          <div className={cx('content-popular')}>Content</div>
          <div className={cx('views-popular')}>Views</div>
      </div>
      
      <div className={cx('card-body')}>
          {hashtagContents.slice(0, 10).map((content, index) => (
              <div className={cx('trend-row')} key={index}>
                  <div className={cx('rank-popular')}>{index + 1}</div>
                  <div className={cx('content-popular')}>{content.hashtagTitle}</div>
                  <div className={cx('views-popular')}>{content.hashtagView}</div>
              </div>
          ))}
      </div>

      
      <div className={cx('see-all-container')}>
          <Link to="/topic" className={cx('seeall2')}>
              See all
          </Link>
      </div>
      
  </div>
);



const TrendCard = ({ trendContents }) => (
  <div className={cx('trend2-card')}>
      <h2 className={cx('card-title-new')}>Tìm Kiếm Xu Hướng</h2>
      <div className={cx('card2-header')}>
          <div className={cx('rank2')}>Rank</div>
          <div className={cx('content2')}>Content</div>
          <div className={cx('views2')}>Views</div>
      </div>
      <div className={cx('card2-body')}>
          {trendContents.slice(0, 10).map((content, index) => (
              <div className={cx('trend-row')} key={index}>
                  <div className={cx('rank2')}>{index + 1}</div>
                  <div className={cx('content2')}>{content.trendTitle}</div>
                  <div className={cx('views2')}>{content.trendView}</div>
              </div>
          ))}
      </div>

      <div className={cx('see-all-container')}>
          <Link to="/topic" className={cx('seeall2')}>
              See all
          </Link>
      </div>
  </div>
);


const TrendSection = ({ trends }) => {
  const trendContents = trends.trendContents;

  return (
      <div className="trend2-component">
          <TrendCard trendContents={trendContents} />
      </div>
  );
};

const TiktokTrendSection = ({ tiktokTrends }) => {
  const tiktokContents = tiktokTrends.tiktokContents;
  return (
      <div className="tiktok-trend-component">
          <TiktokTrendCard tiktokContents={tiktokContents} />
      </div>
  );
};const TiktokTrendCard = ({ tiktokContents }) => (
  <div className={cx('tiktok-card')}>
      
      <h2 className={cx('card-title-new')}>HashTag Xu Hướng</h2>
      <div className={cx('card-header')}>
          <div className={cx('rank-tiktok')}>Rank</div>
          <div className={cx('content-tiktok')}>Content</div>
          <div className={cx('views-tiktok')}>Views</div>
      </div>
      <div className={cx('card-body')}>
          {tiktokContents.slice(0, 10).map((content, index) => (
              <div className={cx('trend-row')} key={index}>
                  <div className={cx('rank-tiktok')}>{index + 1}</div>
                  <div className={cx('content-tiktok')}>{content.trendTitle}</div>
                  <div className={cx('views-tiktok')}>{content.trendView}</div>
              </div>
          ))}
      </div>

      
      <div className={cx('see-all-container')}>
          <Link to="/topic" className={cx('seeall2')}>
              See all
          </Link>
      </div>

  </div>
);

const GoogleTrendSection = ({ googleTrends }) => {
  const googleContents = googleTrends.googleContents;
  return (
      <div className="google-trend-component">
          <GoogleTrendCard googleContents={googleContents} />
      </div>
  );
};const GoogleTrendCard = ({ googleContents }) => (
  <div className={cx('google-card')}>
      
      <h2 className={cx('card-title-new')}>Cụm Từ Xu Hướng</h2>
      <div className={cx('card-header')}>
          <div className={cx('rank-google')}>Rank</div>
          <div className={cx('content-google')}>Content</div>
          <div className={cx('views-google')}>Views</div>
      </div>
      <div className={cx('card-body')}>
          {googleContents.slice(0, 10).map((content, index) => (
              <div className={cx('trend-row')} key={index}>
                  <div className={cx('rank-google')}>{index + 1}</div>
                  <div className={cx('content-google')}>{content.trendTitle}</div>
                  <div className={cx('views-google')}>{content.trendView}</div>
              </div>
          ))}
      </div>
      
      <div className={cx('see-all-container')}>
          <Link to="/topic" className={cx('seeall2')}>
              See all
          </Link>
      </div>

  </div>
); 



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
  
//Post
const PostCard = ({ postTitle, thumbnailUrl }) => (
    <div className={cx('post-card')}>
        <div className={cx('post-thumbnail')}>
            <img className={cx('post-thumbnail-img')} src={thumbnailUrl} />
        </div>
        <p className={cx('post-title')}>{postTitle}</p>
    </div>
);

const MediaPlatform = ({ platform }) => (
    <div className={cx('post-component')}>
        <div className={cx('post-component-wrapper')}>
            <h3 className={cx('platform-title')}>{platform.name}</h3>
            <div className={cx('post-list')}>
                {platform.posts.map((post, index) => (
                    <PostCard key={index} postTitle={post.postTitle} thumbnailUrl={post.thumbnailUrl} />
                ))}
            </div>
        </div>
        <Link
            to={platform.name === 'Reddit' ? '/postReddit' : platform.name === 'News' ? '/postNews' : '#'}
            className={cx('seeall')}
        >
            See all
        </Link>
    </div>
);

function VideoKR()  {

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

    const hashtags = [
        {
            hashtagContents: [
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
                { hashtagTitle: 'Test', hashtagView: '100' },
            ],
        },
    ];

    const googleTrends = [
        {
            googleContents: [
                { trendTitle: 'Google Trend 1', trendView: '5000' },
                { trendTitle: 'Google Trend 2', trendView: '6000' },
                { trendTitle: 'Google Trend 3', trendView: '4000' },
                { trendTitle: 'Google Trend 1', trendView: '5000' },
                { trendTitle: 'Google Trend 2', trendView: '6000' },
            ],
        },
    ];

    const trends = [
      {
          trendContents: [
              { trendTitle: 'Trend 1', trendView: '1000' },
              { trendTitle: 'Trend 2', trendView: '1500' },
              { trendTitle: 'Trend 3', trendView: '1200' },
              { trendTitle: 'Trend 1', trendView: '1000' },
              { trendTitle: 'Trend 2', trendView: '1500' },
          ],
      },
  ];


    const tiktokTrends = [
        {
            tiktokContents: [
                { trendTitle: 'TikTok Trend 1', trendView: '8000' },
                { trendTitle: 'TikTok Trend 2', trendView: '7000' },
                { trendTitle: 'TikTok Trend 3', trendView: '7500' },
                { trendTitle: 'TikTok Trend 2', trendView: '7000' },
                { trendTitle: 'TikTok Trend 3', trendView: '7500' },
            ],
        },
    ];

    //Post
    const platforms = [
        {
            name: 'Reddit',
            posts: [
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
            ],
        },
        {
            name: 'News',
            posts: [
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
                {
                    postTitle: 'Test',
                    thumbnailUrl: 'https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain',
                },
            ],
        },
    ];



     return (
        <div className={cx('container')}>
            <div className={cx('left-column')}>
                <div className={cx('trends-card-row')}>
                    <div className={cx('trend-section-row')}>
                        {trends.length > 0 ? (
                            trends.map((trend, index) => (
                                <TrendSection key={index} trends={trend} />
                            ))
                        ) : (
                            <p>No featured trends available</p>
                        )}
                    </div>
                    <div className={cx('trend-section-row')}>
                        {hashtags.length > 0 ? (
                            hashtags.map((hashtag, index) => (
                                <TwitterSection key={index} hashtags={hashtag} />
                            ))
                        ) : (
                            <p>No popular hashtags available</p>
                        )}
                    </div>
                </div>

                <div className={cx('trends-card-row')}>
                    <div className={cx('trend-section-row')}>
                        {googleTrends.length > 0 ? (
                            googleTrends.map((googleTrend, index) => (
                                <GoogleTrendSection key={index} googleTrends={googleTrend} />
                            ))
                        ) : (
                            <p>No Google trends available</p>
                        )}
                    </div>

                    <div className={cx('trend-section-row')}>
                        {tiktokTrends.length > 0 ? (
                            tiktokTrends.map((tiktokTrend, index) => (
                                <TiktokTrendSection key={index} tiktokTrends={tiktokTrend} />
                            ))
                        ) : (
                            <p>No TikTok trends available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('right2-column')}>
              
                <div className={cx('video2-card-main')}>
                  
                  <h2 className={cx('cardvideo-title-new')}>
                    Âm nhạc thịnh hành
                     </h2>

                    <div className={cx('video2-card-container')}>
                        {youtubeTrends[0].youtubeContents.length > 0 ? youtubeTrends[0].youtubeContents.map((youtubeTrend, index) => (
                            <VideoCard key={index} {...youtubeTrend} />
                        )) : <p>No Video trends available</p>}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

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

export default VideoKR;
