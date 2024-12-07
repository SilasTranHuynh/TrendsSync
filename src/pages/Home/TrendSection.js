// src/pages/Home/TrendSection.js
import React from 'react';
import TrendCard from './TrendCard.js'; // Correct

import styles from './home.module.scss';
const TrendSection = ({ trends }) => {
    const trendContents = trends.trendContents;

    return (
        <div className="trend2-component">
            <TrendCard trendContents={trendContents} />
        </div>
    );
};

export default TrendSection;
