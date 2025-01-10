import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Biểu đồ chi tiết
import { Chart, registerables } from "chart.js"; // Thư viện Chart.js
import classNames from "classnames/bind";
import styles from "./videovn.scss";

Chart.register(...registerables); // Đăng ký các thành phần của Chart.js

const cx = classNames.bind(styles);

const VideoVN = () => {
    const [data, setData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);

    // Lấy danh sách file lịch sử
    useEffect(() => {
        axios
            .get("http://localhost:5001/api/youtube-trends/history")
            .then((response) => setHistoryFiles(response.data))
            .catch((error) => console.error("Error fetching history files:", error));
    }, []);

    // Xử lý khi chọn file lịch sử
    const handleHistorySelect = (fileUrl) => {
        if (fileUrl) {
            axios
                .get(fileUrl)
                .then((response) => {
                    setData(response.data); // Gán dữ liệu trực tiếp từ backend
                })
                .catch((error) => console.error("Error fetching history data:", error));
        } else {
            setData([]);
        }
    };

    return (
        <div className={cx("container1")}>
            <h1 className={cx("main-title")}>Âm Nhạc Thịnh Hành</h1>

            {/* Lịch sử */}
            <div className={cx("history-section")}>
                <h2>Lịch Sử</h2>
                <div className={cx("history-slider")}>
                    {historyFiles.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => handleHistorySelect(file.url)}
                            className={cx("history-button", { disabled: !file.exists })}
                        >
                            {file.time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách video */}
            <div className={cx("video1-header")}>
                <p className={cx("header-rank")}>Rank</p>
                <p className={cx("header-title")}>Bài Hát</p>
                <p className={cx("header-view")}>Lượt View</p>
                <p className={cx("header-chart")}>Thay Đổi View</p>
            </div>
            <div className={cx("video1-list")}>
                {data.map((item, index) => (
                    <div className={cx("video1-card")} key={index}>
                        <p className={cx("video1-rank")}>#{index + 1}</p>
                        <p className={cx("video1-title")}>{item.Title}</p>
                        <p className={cx("video1-view")}>{item.Views}</p>
                        <div className={cx("video1-chart")}>
                            <Line
                                data={{
                                    labels: item.ViewHistory.map((_, i) => `${i * 2} giờ trước`), // Trục thời gian
                                    datasets: [
                                        {
                                            label: "Lượt View",
                                            data: item.ViewHistory,
                                            borderColor: "#42A5F5",
                                            fill: false,
                                            tension: 0.4,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: (context) =>
                                                    `Lượt view: ${context.raw}`,
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
                                                text: "Lượt View",
                                            },
                                        },
                                    },
                                }}
                                height={60} // Đặt chiều cao cho biểu đồ
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoVN;
