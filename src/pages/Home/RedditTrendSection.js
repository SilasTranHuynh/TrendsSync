import React from 'react';
import classNames from 'classnames/bind';
import RedditTrendCard from './RedditTrendCard';
import styles from './reddit.module.scss';

const cx = classNames.bind(styles);

const RedditTrendSection = ({ redditTrends }) => {
  const redditContents = redditTrends || []; // Fallback when redditTrends is null/undefined
  return (
      <div className={cx("reddit-trend-component")}>
          {redditContents.length > 0 ? (
              <RedditTrendCard redditContents={redditContents} />
          ) : (
              <p>No Reddit trends available</p>
          )}
      </div>
  );
};

  
export default RedditTrendSection;
  