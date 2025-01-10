import React from 'react';
import classNames from 'classnames/bind';
import styles from './google.scss';
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

const GoogleTrendCard = ({ googleContents }) => (
    <div className={cx('google-card')}>
        <h2 className={cx('card-title-new')}>Tìm kiếm xu hướng</h2>
        <div className={cx('card-header')}>
            <div className={cx('rank-google')}>Thứ hạng</div>
            <div className={cx('content-google')}>Nội dung</div>
            <div className={cx('views-google')}>Lượt xem</div>
        </div>
        <div className={cx('card-body')}>
            {googleContents.slice(0, 10).map((item, index) => (
                <div className={cx('trend-row')} key={index}>
                   <div className={cx('rank-google')}>{item.Rank}</div>
                    <div className={cx('content-google')}>{item.Title}</div>
                    <div className={cx('views-google')}>{item.SearchVolume}</div>
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

export default GoogleTrendCard;
