import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import classNames from "classnames/bind";
import styles from "./postreddit.module.scss";

Chart.register(...registerables);

const cx = classNames.bind(styles);

// RedditCard component with chart
const RedditCard = ({ redditAuthor, redditTime, redditTitle, thumbnailUrl, redditUpvotes, viewHistory }) => (
    <div className={cx("reddit-card")}>
        <div className={cx("author-time")}>
            <p className={cx("reddit-author")}>{redditAuthor}</p>
            <p className={cx("reddit-time")}>{redditTime}</p>
        </div>
        <div className={cx("reddit-thumbnail")}>
            <img className={cx("reddit-thumbnail-img")} src={thumbnailUrl} alt="Thumbnail" />
        </div>
        <p className={cx("reddit-title")}>{redditTitle}</p>
        <p className={cx("reddit-upvotes")}>{redditUpvotes} upvotes</p>
        <div className={cx("reddit-chart")}>
            <Line
                data={{
                    labels: viewHistory.map((_, i) => `${i * 2} giờ trước`),
                    datasets: [
                        {
                            label: "Lượt upvote",
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
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => `Lượt upvote: ${context.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: { title: { display: true, text: "Thời gian" } },
                        y: { title: { display: true, text: "Lượt upvote" } },
                    },
                }}
                height={60}
            />
        </div>
    </div>
);

// RedditSection component
const RedditSection = ({ redditContents }) => (
    <div className={cx("reddit-section")}>
        {redditContents.length === 0 ? (
            <p>No posts available for this hour.</p>
        ) : (
            <div className={cx("reddit-list")}>
                {redditContents.map((post, index) => (
                    <RedditCard
                        key={index}
                        redditAuthor={post.Author}
                        redditTime={post.Time}
                        thumbnailUrl={post.Thumbnail}
                        redditTitle={post.Title}
                        redditUpvotes={post.Upvotes}
                        viewHistory={post.ViewHistory || []} // Thêm viewHistory cho biểu đồ
                    />
                ))}
            </div>
        )}
    </div>
);

// 
function PostReddit() {
    const [currentHour, setCurrentHour] = useState("Now");
    const [redditData, setRedditData] = useState([]);
    const [historyFiles, setHistoryFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Tải file lịch sử
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/reddit-trends/history")
            .then((response) => setHistoryFiles(response.data))
            .catch((error) => console.error("Error fetching history files:", error));
    }, []);

    // Lấy dữ liệu cho thời điểm hiện tại hoặc tệp lịch sử đã chọn
    const fetchRedditData = async (hourOrFileUrl) => {
        setLoading(true);
        try {
            const endpoint = hourOrFileUrl.startsWith("http")
                ? hourOrFileUrl
                : `http://localhost:3000/reddit/${hourOrFileUrl === "Now" ? "Now.json" : `${hourOrFileUrl}.json`}`;
            const response = await axios.get(endpoint);
            setRedditData(response.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu Reddit: ", error);
            setRedditData([]);
        } finally {
            setLoading(false);
        }
    };

    // Lấy dữ liệu khi currentHour thay đổi
    useEffect(() => {
        fetchRedditData(currentHour);
    }, [currentHour]);

    return (
        <div className={cx("container")}>
            <h1 className={cx("main-title")}>Bài viết xu hướng Reddit </h1>
            {/* History Section */}
            <div className={cx("history-section")}>
                <div className={cx("history-slider")}>
                    {historyFiles.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => fetchRedditData(file.url)}
                            className={cx("history-button")}
                        >
                            {file.time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reddit Posts Section */}
            {loading ? (
                <p className={cx("loading")}>Tải dữ liệu...</p>
            ) : (
                <RedditSection redditContents={redditData} />
            )}
        </div>
    );
}

export default PostReddit;
