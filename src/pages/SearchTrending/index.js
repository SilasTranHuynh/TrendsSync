import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./searchtrend.scss";

const cx = classNames.bind(styles);

const Search = () => {
    const [data, setData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4901/api/google-trends/history")
            .then(response => setHistoryFiles(response.data))
            .catch(error => console.error("Error fetching history files:", error));
    }, []);

    const fetchHistory = (url) => {
        if (url) {
            axios.get(url)
                .then(response => setData(response.data))
                .catch(error => console.error("Error fetching history data:", error));
        }
    };

    return (
        <div className={cx("container1")}>
            <h1 className={cx("main-title")}>Tìm Kiếm Xu Hướng</h1>
            <div className={cx("history-slider")}>
                {historyFiles.map((file, index) => (
                    <button
                        key={index}
                        onClick={() => fetchHistory(file.url)}
                        className={cx("history-button", { disabled: !file.exists })}
                    >
                        {file.time}
                    </button>
                ))}
            </div>
            <div className={cx("twitter-header")}>
                <p className={cx("header-rank")}>Rank</p>
                <p className={cx("header-content")}>Nội dung</p>
                <p className={cx("header-tweets")}>Lượt Đăng</p>
            </div>
            <div className={cx("twitter-list")}>
                {data.map((item, index) => (
                    <div key={index} className={cx("twitter-card")}>
                        <p className={cx("twitter-rank")}>{`#${item.Rank}`}</p>
                        <p className={cx("twitter-content")}>{item.Title}</p>
                        <p className={cx("twitter-tweets")}>{item.SearchVolume}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
