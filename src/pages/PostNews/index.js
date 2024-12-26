import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './postnews.module.scss';
import axios from 'axios'; 
import NewsSection from './NewsSection';

const cx = classNames.bind(styles);

function PostNews() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            // Fetch dữ liệu từ backend API
            const fetchNewsData = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/top-headlines');
                    setNewsData(response.data.newsposts);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            };
            fetchNewsData();
        }, []);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Top News Posts</h1>
            {loading ? (
                <p>Just a little while...</p>
            ) : (
                <NewsSection newsData={{newsContent : newsData}} />
            )}
        </div>
    );
}

export default PostNews;
