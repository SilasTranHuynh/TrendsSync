import classNames from 'classnames/bind';
import styles from './postreddit.module.scss';

const cx = classNames.bind(styles);

function PostReddit() {
    return (
        <div className={cx('container')}>
            <div class={cx('post')}>
                <div class={cx('post-header')}>
                    <span class={cx('post-info')}>u/user1 • 2 hours ago</span>
                </div>
                <div class={cx('post-body')}>
                    <h2>Title of the post</h2>
                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                </div>
                <div class={cx('post-footer')}>
                    <span class={cx('comments')}>123 Comments</span>
                    <span class={cx('upvotes')}>↑ 5.1k</span>
                </div>
            </div>

            <div class={cx('post')}>
                <div class={cx('post-header')}>
                    <span class={cx('post-info')}>u/user1 • 2 hours ago</span>
                </div>
                <div class={cx('post-body')}>
                    <h2>Title of the post</h2>
                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                </div>
                <div class={cx('post-footer')}>
                    <span class={cx('comments')}>123 Comments</span>
                    <span class={cx('upvotes')}>↑ 5.1k</span>
                </div>
            </div>
        </div>
    );
}

export default PostReddit;
