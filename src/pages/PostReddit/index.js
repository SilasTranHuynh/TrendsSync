import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './postreddit.module.scss';

const cx = classNames.bind(styles);

const RedditCard = ({ redditAuthor, redditTime, redditTitle, thumbnailUrl, redditUpvotes }) => (
    <div className={cx('reddit-card')}>
        <div className={cx('author-time')}>
            <p className={cx('reddit-author')}>{redditAuthor}</p>
            <p className={cx('reddit-time')}>{redditTime}</p>
        </div>
        <div className={cx('reddit-thumbnail')}>
            <img className={cx('reddit-thumbnail-img')} src={thumbnailUrl} />
        </div>
        <p className={cx('reddit-title')}>{redditTitle}</p>
        <p className={cx('reddit-upvotes')}>{redditUpvotes}</p>
    </div>
);

const RedditSection = ({ reddit }) => (
    <div className={cx('reddit-component')}>
        <div className={cx('reddit-list')}>
            {reddit.redditContents.map((redditContent, index) => (
                <RedditCard
                    key={index}
                    redditAuthor={redditContent.redditAuthor}
                    redditTime={redditContent.redditTime}
                    thumbnailUrl={redditContent.thumbnailUrl}
                    redditTitle={redditContent.redditTitle}
                    redditUpvotes={redditContent.redditUpvotes}
                />
            ))}
        </div>
    </div>
);

function PostReddit() {
    const [reddits, setReddits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRedditPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/topPosts');
                const data = await response.json();
                setReddits([{ redditContents: data }]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchRedditPosts();
    }, []);

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Top Reddit Posts</h1>
            {loading ? (
                <p className={cx('waiting')}>Just a little while...</p>
            ) : (
                reddits.map((reddit, index) => <RedditSection key={index} reddit={reddit} />)
            )}
        </div>
    );
}

export default PostReddit;
