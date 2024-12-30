import React from 'react';
import classNames from 'classnames/bind';
import styles from './postnews.module.scss';

const cx = classNames.bind(styles);

const NewsCard = ({ newsContent }) => (
    <div className={cx('news-list')}>
    {newsContent.slice(0, 30).map((content, index) => (
    <div className={cx('news-card')} key={index}>
        <div className={cx('source-author')}>
            <p className={cx('news-source')}>{content.newsSource}</p>
            <p className={cx('news-author')}>{content.newsAuthor}</p>
        </div>
        <div className={cx('news-thumbnail')}>
            <img className={cx('news-thumbnail-img')} src={content.thumbnailUrl} alt="News Thumbnail" />
        </div>
        <p className={cx('news-title')}>{content.newsTitle}</p>
        <p className={cx('news-time')}>{content.newsTime}</p>
    </div>
    ))};
    </div>
);

export default NewsCard;