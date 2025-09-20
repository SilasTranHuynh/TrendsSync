import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classNames from "classnames/bind";
import styles from "./twitter.module.scss";

Chart.register(...registerables);

const cx = classNames.bind(styles);

const TwitterCard = ({ rank, content, tweets, viewHistory }) => {
    return (
        <div className={cx("twitter-card")}>
            <p className={cx("twitter-rank")}>{rank}</p>
            <p className={cx("twitter-content")}>{content}</p>
            <p className={cx("twitter-tweets")}>{tweets}</p>
            <div className={cx("twitter-chart")}>
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

const Twitter = () => {
    const [data, setData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5005/api/twitter-trends/history")
            .then((response) => setHistoryFiles(response.data))
            .catch((error) => console.error("Error fetching history files:", error));
    }, []);

    const toggleSeeAll = () => {
        setDisplayAll(!displayAll);
    };

    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx("container")}>
            <h1 className={cx("main-title")}>Twitter Thịnh Hành</h1>
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
            <div className={cx("twitter-header")}>
                <p className={cx("header-rank")}>Hạng</p>
                <p className={cx("header-content")}>Nội dung</p>
                <p className={cx("header-tweets")}>Lượt Đăng</p>
            </div>
            <div className={cx("twitter-list")}>
                {displayedData.map((item, index) => (
                    <TwitterCard
                        key={index}
                        rank={`#${item.Rank}`}
                        content={item.Content}
                        tweets={`${item.TweetsFormatted}`} // Hiển thị Tweets định dạng gốc
                        viewHistory={item.ViewHistory || []}
                    />
                ))}
            </div>
            <div className={cx("see-all-container")}>
                <button className={cx("seeall-button")} onClick={toggleSeeAll}>
                    {displayAll ? "See Less" : "See All"}
                </button>
            </div>
        </div>
    );
};

export default Twitter;
