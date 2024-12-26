import React from 'react';
import classNames from 'classnames/bind';
import RedditTrendCard from './RedditTrendCard';
import styles from './reddit.module.scss';

const cx = classNames.bind(styles);

const RedditTrendSection = ({ redditTrends }) => {
    const redditContents = redditTrends.redditContents;
    return (
      <div className={cx('reddit-trend-component')}>
        <RedditTrendCard redditContents={redditContents} />
      </div>
    );
  };
  
  export default RedditTrendSection;
  