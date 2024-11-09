import classNames from 'classnames/bind';
import styles from './postnews.module.scss';

const cx = classNames.bind(styles);

function PostNews() {
    return (
        <div className={cx('container')}>
            <div class={cx('post')}>
                <div class={cx('post-header')}>
                    <span class={cx('post-info')}>article_name</span>
                </div>
                <div class={cx('post-body')}>
                    <h2>Title of the post</h2>
                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                </div>
            </div>

            <div class={cx('post')}>
                <div class={cx('post-header')}>
                    <span class={cx('post-info')}>article_name</span>
                </div>
                <div class={cx('post-body')}>
                    <h2>Title of the post</h2>
                    <img src="https://th.bing.com/th/id/OIP.wBbZMv7l1fsd-Ep-P9UbKgAAAA?rs=1&pid=ImgDetMain"></img>
                </div>
            </div>
        </div>
    );
}

export default PostNews;
