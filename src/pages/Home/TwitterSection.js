import React from 'react';
import TwitterCard from './TwitterCard'; // Import TwitterCard component

const TwitterSection = ({ hashtags }) => {
    return (
        <div className="popular-trend-component">
            {/* Truyền hashtagContents từ props xuống TwitterCard */}
            <TwitterCard hashtagContents={hashtags.hashtagContents} />
        </div>
    );
};

export default TwitterSection;
