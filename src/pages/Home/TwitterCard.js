import React from 'react';
import classNames from 'classnames/bind';
import styles from './twitter.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TwitterCard = ({ hashtagContents }) => (
    <div className={cx('popular-card')}>
        <h2 className={cx('card-title-new')}>Twitter Xu Hướng</h2>
        <div className={cx('card-header')}>
            <div className={cx('rank-popular')}>Rank</div>
            <div className={cx('content-popular')}>Content</div>
            <div className={cx('views-popular')}>Tweets</div>
        </div>

        <div className={cx('card-body')}>
            {hashtagContents.slice(0, 10).map((content, index) => (
                <div className={cx('trend-row')} key={index}>
                    <div className={cx('rank-popular')}>{index + 1}</div>
                    <div className={cx('content-popular')}>{content.Content}</div>
                    <div className={cx('views-popular')}>{content.Tweets}</div>
                </div>
            ))}
        </div>

        <div className={cx('see-all-container')}>
            <Link to="/twitter" className={cx('seeall2')}>See all</Link>
        </div>
    </div>
);

export default TwitterCard;
