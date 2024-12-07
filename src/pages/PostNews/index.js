import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './postnews.module.scss';
import axios from 'axios'; // Đảm bảo import axios

const cx = classNames.bind(styles);

const NewsCard = ({ newsSource, newsAuthor, newsTime, newsTitle, thumbnailUrl }) => (
    <div className={cx('news-card')}>
        <div className={cx('source-author')}>
            <p className={cx('news-source')}>{newsSource}</p>
            <p className={cx('news-author')}>{newsAuthor}</p>
        </div>
        <div className={cx('news-thumbnail')}>
            <img className={cx('news-thumbnail-img')} src={thumbnailUrl} alt="News Thumbnail" />
        </div>
        <p className={cx('news-title')}>{newsTitle}</p>
        <p className={cx('news-time')}>{newsTime}</p>
    </div>
);

const NewsSection = ({ news }) => (
    <div className={cx('news-component')}>
        <div className={cx('news-list')}>
            {news.newsContents.map((newsContent, index) => (
                <NewsCard
                    key={index}
                    newsSource={newsContent.newsSource}
                    newsAuthor={newsContent.newsAuthor}
                    thumbnailUrl={newsContent.thumbnailUrl}
                    newsTitle={newsContent.newsTitle}
                    newsTime={newsContent.newsTime}
                />
            ))}
        </div>
    </div>
);

function PostNews() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dữ liệu từ backend API
        axios
            .get('/top-headlines')
            .then((response) => {
                setNewsData([response.data]); // Đặt dữ liệu vào state
                setLoading(false); // Đổi trạng thái loading thành false
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Top News Posts</h1>
            {loading ? (
                <p>Just a little while...</p>
            ) : (
                newsData.map((news, index) => <NewsSection key={index} news={news} />)
            )}
        </div>
    );
}

export default PostNews;
