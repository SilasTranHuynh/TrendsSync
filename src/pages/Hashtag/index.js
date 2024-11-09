import classNames from 'classnames/bind';
import styles from './hashtag.module.scss';

const cx = classNames.bind(styles);

const HashtagCard = ({ hashtagRank, hashtagTitle, hashtagTime, hashtagView }) => (
    <div className={cx('hashtag-card')}>
        <p className={cx('hashtag-rank')}>{hashtagRank}</p>
        <p className={cx('hashtag-title')}>{hashtagTitle}</p>
        <p className={cx('hashtag-time')}>{hashtagTime}</p>
        <p className={cx('hashtag-view')}>{hashtagView}</p>
    </div>
);

const HashtagSection = ({ hashtag }) => (
    <div className={cx('hashtag-component')}>
        <div className={cx('hashtag-list')}>
            {hashtag.hashtagContents.map((hashtagContent, index) => (
                <HashtagCard
                    key={index}
                    hashtagRank={hashtagContent.hashtagRank}
                    hashtagTitle={hashtagContent.hashtagTitle}
                    hashtagTime={hashtagContent.hashtagTime}
                    hashtagView={hashtagContent.hashtagView}
                />
            ))}
        </div>
    </div>
);

function Hashtag() {
    const hashtags = [
        {
            hashtagContents: [
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
                { hashtagRank: '1', hashtagTitle: 'Test', hashtagTime: '1 hour ago', hashtagView: '100' },
            ],
        },
    ];

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Top Hashtags</h1>
            <div className={cx('timeline-list')}>
                <a href="/">24h</a>

                <a href="/">22h</a>

                <a href="/">20h</a>

                <a href="/">18h</a>

                <a href="/">16h</a>

                <a href="/">14h</a>

                <a href="/">12h</a>

                <a href="/">10h</a>

                <a href="/">8h</a>

                <a href="/">6h</a>

                <a href="/">4h</a>

                <a href="/">2h</a>

                <a href="/">Now</a>
            </div>
            <div className={cx('hashtag-list')}>
                {hashtags.map((hashtag, index) => (
                    <HashtagSection key={index} hashtag={hashtag} />
                ))}
            </div>
        </div>
    );
}

export default Hashtag;
