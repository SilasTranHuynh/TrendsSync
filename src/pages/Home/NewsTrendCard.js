import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './news.module.scss';

const cx = classNames.bind(styles);

const NewsTrendCard = ({ newsContents }) => (
    <div className={cx('news-list')}>
        {newsContents.slice(0, 6).map((content, index) => (
            <div className={cx('news-card')} key={index}>
                <div className={cx('news-thumbnail')}>
                    <img className={cx('news-thumbnail-img')} src={content.thumbnailUrl} />
                </div>
                <p className={cx('news-title')}>{content.newsTitle}</p>
                <div className={cx('news-author-source')}>
                    <p className={cx('news-author')}>{content.newsAuthor}</p>
                    <p className={cx('news-source')}>{content.newsSource}</p>
                </div>
            </div>
        ))}
        <div className={cx('seeall-container')}>
            <Link to="/postNews" className={cx('seeall')}>
                See all
            </Link>
        </div>
    </div>
);

export default NewsTrendCard;
