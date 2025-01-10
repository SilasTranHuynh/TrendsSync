import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classNames from "classnames/bind";
import styles from "./hashtag.module.scss";

Chart.register(...registerables);

const cx = classNames.bind(styles);

const HashtagCard = ({ rank, hashtag, views, viewHistory }) => {
    return (
        <div className={cx("hashtag-card")}>
            <p className={cx("hashtag-rank")}>{rank}</p>
            <p className={cx("hashtag-title")}>{hashtag}</p>
            <p className={cx("hashtag-view")}>{views}</p>
            <div className={cx("hashtag-chart")}>
                <Line
                    data={{
                        labels: viewHistory.map((_, i) => `${i * 2} giờ trước`),
                        datasets: [
                            {
                                label: "Lượt Đăng",
                                data: viewHistory,
                                borderColor: "#42A5F5",
                                fill: false,
                                tension: 0.4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => `Lượt đăng: ${context.raw}`,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Thời Gian",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Lượt Đăng",
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

const Hashtag = () => {
    const [data, setData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios
        .get("http://localhost:5002/api/tiktok-trends/history")
            .then((response) => setHistoryFiles(response.data))
            .catch((error) => console.error("Error fetching history files:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Hashtag Thịnh Hành</h1>
            <div className={cx('hashtag-header')}>
                <p className={cx('header-rank')}>Thứ</p>
                <p className={cx('header-title')}>Hashtag</p>
                <p className={cx('header-view')}>Lượt Đăng</p>
        <div className={cx("container")}>
            <h1 className={cx("main-title")}>Hashtag Thịnh Hành</h1>
            <div className={cx("history-section")}>
                <h2>Lịch Sử</h2>
                <div className={cx("history-slider")}>
                    {historyFiles.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => axios.get(file.url).then((res) => setData(res.data))}
                            className={cx("history-button", { disabled: !file.exists })}
                        >
                            {file.time}
                        </button>
                    ))}
                </div>
            </div>
            <div className={cx("hashtag-header")}>
                <p className={cx("header-rank")}>Rank</p>
                <p className={cx("header-title")}>Hashtag</p>
                <p className={cx("header-view")}>Lượt Đăng</p>
            </div>
            </div>
            <div className={cx("hashtag-header")}>
                <p className={cx("header-rank")}>Rank</p>
                <p className={cx("header-title")}>Hashtag</p>
                <p className={cx("header-view")}>Lượt Đăng</p>
            </div>
            <div className={cx("hashtag-list")}>
                {displayedData.map((item, index) => (
                    <HashtagCard
                        key={index}
                        rank={`#${item.Rank}`}
                        hashtag={item.Hashtag}
                        views={item.Views}
                        viewHistory={item.ViewHistory || []}
                    />
                ))}
            </div>

            {/* "See All" Button */}
            <div className={cx('see-all-container')}>
                <button className={cx('seeall-button')} onClick={toggleSeeAll}>
                    {displayAll ? 'Thu gọn' : 'Xem tất cả'}
            <div className={cx("see-all-container")}>
                <button className={cx("seeall-button")} onClick={toggleSeeAll}>
                    {displayAll ? "See Less" : "See All"}
            <div className={cx("see-all-container")}>
                <button className={cx("seeall-button")} onClick={toggleSeeAll}>
                    {displayAll ? "See Less" : "See All"}
                </button>
            </div>
        </div>
    );
};

export default Hashtag;
