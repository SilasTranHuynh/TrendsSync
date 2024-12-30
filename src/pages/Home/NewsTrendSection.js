import React from 'react';
import classNames from 'classnames/bind';
import NewsTrendCard from './NewsTrendCard';
import styles from './news.module.scss';

const cx = classNames.bind(styles);

const NewsTrendSection = ({ newsTrends }) => {
    const newsContents = newsTrends.newsContents;
    return (
      <div className={cx('news-trend-component')}>
        <NewsTrendCard newsContents={newsContents} />
      </div>
    );
  };
  
  export default NewsTrendSection;