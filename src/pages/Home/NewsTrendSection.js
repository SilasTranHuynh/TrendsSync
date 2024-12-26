import React from 'react';
import NewsTrendCard from './NewsTrendCard';

const NewsTrendSection = ({ newsTrends }) => {
    const newsContents = newsTrends.newsContents;
    return (
      <div className="news-trend-component">
        <NewsTrendCard newsContents={newsContents} />
      </div>
    );
  };
  
  export default NewsTrendSection;