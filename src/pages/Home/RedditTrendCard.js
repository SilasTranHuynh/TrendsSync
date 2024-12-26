import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './reddit.module.scss';

const cx = classNames.bind(styles);

const RedditTrendCard = ({ redditContents }) => (
    <div className={cx('reddit-list')}>
        {redditContents.slice(0, 6).map((content, index) => (
            <div className={cx('reddit-card')} key={index}>
                <div className={cx('reddit-thumbnail')}>
                    <img className={cx('reddit-thumbnail-img')} src={content.thumbnailUrl}/>
                </div>
                <p className={cx('reddit-title')}>{content.redditTitle}</p>
                <p className={cx('reddit-author')}>{content.redditAuthor}</p>
            </div>
        ))}
        <div className={cx('seeall-container')}>
            <Link to="/postReddit" className={cx('seeall')}>
                See all
            </Link>
        </div>
    </div>
);

export default RedditTrendCard;
