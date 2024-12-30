import React from 'react';
import classNames from 'classnames/bind';
import styles from './tiktok.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TiktokTrendCard = ({ tiktokContents }) => (
  <div className={cx('tiktok-card')}>
    <h2 className={cx('card-title-new')}>Trending HashTags</h2>
    <div className={cx('card-header')}>
      <div className={cx('rank-tiktok')}>Rank</div>
      <div className={cx('content-tiktok')}>Content</div>
      <div className={cx('views-tiktok')}>Views</div>
    </div>

    <div className={cx('card-body')}>
      {tiktokContents.slice(0, 10).map((content, index) => (
        <div className={cx('trend-row')} key={index}>
          <div className={cx('rank-tiktok')}>{index + 1}</div>
          <div className={cx('content-tiktok')}>{content.Hashtag}</div>
          <div className={cx('views-tiktok')}>{content.Views}</div>
        </div>
      ))}
    </div>

    <div className={cx('see-all-container')}>
      <Link to="/hashtag" className={cx('seeall2')}>
        See all
      </Link>
    </div>
  </div>
);

export default TiktokTrendCard;
