import React from 'react';
import TrendCard from './TrendCard.js'; // Correct
import styles from './home.module.scss';

const TrendSection = ({ categoryTrends }) => {
    const trendContents = categoryTrends.trendContents;

    return (
        <div className="trend2-component">
            <TrendCard trendContents={categoryTrends.trendContents} />
        </div>
    );
};

export default TrendSection;
