import React from 'react';
import TiktokTrendCard from './TiktokTrendCard';

import styles from './home.module.scss';

const TiktokTrendSection = ({ tiktokTrends }) => {
  const tiktokContents = tiktokTrends.tiktokContents;
  
  return (
    <div className="tiktok-trend-component">
      <TiktokTrendCard tiktokContents={tiktokContents} />
    </div>
  );
};

export default TiktokTrendSection;
