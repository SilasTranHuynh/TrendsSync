import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classNames from "classnames/bind";
import styles from "./searchtrend.scss";

Chart.register(...registerables);

const cx = classNames.bind(styles);

const SearchCard = ({ rank, content, searchVolume, viewHistory }) => {
    return (
        <div className={cx("search-card")}>
            <p className={cx("search-rank")}>{rank}</p>
            <p className={cx("search-title")}>{content}</p>
            <p className={cx("search-volume")}>{searchVolume}</p>
            <div className={cx("search-chart")}>
                <Line
                    data={{
                        labels: viewHistory.map((_, i) => `${i * 2} giờ trước`),
                        datasets: [
                            {
                                label: "Lượt Tìm Kiếm",
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
                                    label: (context) => `Lượt tìm kiếm: ${context.raw}`,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: { display: true, text: "Thời Gian" },
                            },
                            y: {
                                title: { display: true, text: "Lượt Tìm Kiếm" },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

const Search = () => {
    const [data, setData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5004/api/google-trends/history")
            .then((response) => setHistoryFiles(response.data))
            .catch((error) => console.error("Error fetching history files:", error));
    }, []);

    const handleHistorySelect = (fileUrl) => {
        if (fileUrl) {
            axios.get(fileUrl).then((res) => setData(res.data));
        }
    };

    const toggleSeeAll = () => setDisplayAll(!displayAll);

    const displayedData = displayAll ? data : data.slice(0, 15);

    return (
        <div className={cx("container")}>
            <h1 className={cx("main-title")}>Tìm Kiếm Xu Hướng</h1>
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
            <div className={cx("search-header")}>
                <p className={cx("header-rank")}>Rank</p>
                <p className={cx("header-title")}>Nội dung</p>
                <p className={cx("header-volume")}>Lượt Tìm Kiếm</p>
            </div>
            <div className={cx("search-list")}>
                {displayedData.map((item, index) => (
                    <SearchCard
                        key={index}
                        rank={`#${item.Rank}`}
                        content={item.Title}
                        searchVolume={item.SearchVolume}
                        viewHistory={item.ViewHistory || []}
                    />
                ))}
            </div>
            <div className={cx("see-all-container")}>
                <button className={cx("seeall-button")} onClick={toggleSeeAll}>
                    {displayAll ? "Thu gọn" : "Xem tất cả"}
                </button>
            </div>
        </div>
    );
};

export default Search;
