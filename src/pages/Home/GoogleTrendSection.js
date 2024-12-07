import React from 'react';
import GoogleTrendCard from './GoogleTrendCard.js'; // Đảm bảo đường dẫn chính xác

const GoogleTrendSection = ({ googleSearch }) => {
    return (
        <div className="google-trend-component">
            <GoogleTrendCard googleContents={googleSearch.googleContents} />  {/* Truyền dữ liệu */}
        </div>
    );
};


export default GoogleTrendSection;
