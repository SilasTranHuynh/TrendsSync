// src/components/TrendCard.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './trend.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TrendCard = ({ trendContents }) => (
    <div className={cx('trend2-card')}>
        <h2 className={cx('card-title-new')}>Cụm Từ Xu Hướng</h2>
        <div className={cx('card2-header')}>
            <div className={cx('rank2')}>Thứ hạng</div>
            <div className={cx('content2')}>Nội dung</div>
            <div className={cx('views2')}>Tăng trưởng</div>
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
            <Link to="/search" className={cx('seeall2')}>
                Xem tất cả
            </Link>
        </div>
    </div>
);

export default TrendCard;
