import classNames from 'classnames/bind';
import styles from './topic.module.scss';

const cx = classNames.bind(styles);

const TopicCard = ({ topicRank, topicTitle, topicView, topicTime, topicChart }) => (
    <div className={cx('topic-card')}>
        <p className={cx('topic-rank')}>{topicRank}</p>
        <p className={cx('topic-title')}>{topicTitle}</p>
        <p className={cx('topic-time')}>{topicTime}</p>
        <p className={cx('topic-view')}>{topicView}</p>
        <svg preserveAspectRatio="xMidYMid meet" className={cx('topic-chart')}>
            {topicChart}
            <linearGradient gradientTransform="rotate(90)" id="c1232">
                <stop offset="0%" class="LVKr3d"></stop>
                <stop offset="100%" class="oZ3r8e"></stop>
            </linearGradient>
            <polyline
                vector-effect="non-scaling-stroke"
                fill="url('#c1232')"
                class="topic-chart-line"
                transform="translate(10, 0)"
                points="-10,48 0,47 1,47 3,47 4,47 6,47 7,47 9,47 10,47 13,47 14,47 16,47 17,47 19,47 20,47 22,47 23,47 24,47 26,47 27,47 29,47 30,47 32,47 33,47 35,47 36,47 37,47 39,47 40,47 42,47 43,47 45,47 46,47 47,47 49,47 50,47 52,47 53,47 55,47 56,47 58,47 59,47 60,47 62,47 63,47 65,44 66,38 68,30 69,28 70,30 72,32 73,31 75,30 76,31 78,31 79,29 81,26 82,20 83,16 85,15 86,16 88,14 89,13 91,13 92,14 93,15 94,15 96,10 98,8 99,6 101,4 102,5 104,8 105,14 106,20 108,26 109,30 111,34 112,37 114,40 116,43 118,43 119,44 121,44 122,45 124,45 125,45 127,46 128,46 138,48"
            ></polyline>
        </svg>
    </div>
);

const TopicSection = ({ topic }) => (
    <div className={cx('topic-component')}>
        <div className={cx('topic-list')}>
            {topic.topicContents.map((topicContent, index) => (
                <TopicCard
                    key={index}
                    topicRank={topicContent.topicRank}
                    topicTitle={topicContent.topicTitle}
                    topicTime={topicContent.topicTime}
                    topicView={topicContent.topicView}
                    topicChart={topicContent.topicChart}
                />
            ))}
        </div>
    </div>
);

function Topic() {
    const topics = [
        {
            topicContents: [
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
                {
                    topicRank: '1',
                    topicTitle: 'Test',
                    topicTime: '1 hour ago',
                    topicView: '100',
                    topicChart: ' ',
                },
            ],
        },
    ];

    return (
        <div className={cx('container')}>
            <h1 className={cx('main-title')}>Top Topics</h1>
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
            <div className={cx('topic-list')}>
                {topics.map((topic, index) => (
                    <TopicSection key={index} topic={topic} />
                ))}
            </div>
        </div>
    );
}

export default Topic;
