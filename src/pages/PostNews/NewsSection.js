import React from 'react';
import NewsCard from './NewsCard';
import classNames from 'classnames/bind';
import styles from './postnews.module.scss';

const cx = classNames.bind(styles);

const NewsSection = ({ newsData }) => {
    const newsContent = newsData.newsContent;
    return (
    <div className={cx('news-component')}>
        <NewsCard
            newsContent={newsContent}
        />
    </div>
)};

export default NewsSection;