import classNames from 'classnames/bind';
import styles from './video.scss';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';

const cx = classNames.bind(styles);

// Nhận toàn bộ `youtubeTrend` dưới dạng một props duy nhất và sử dụng các thuộc tính của nó
const VideoCard = ({ youtubeTrend }) => {
  // Hàm rút ngắn tên bài hát, nếu tên dài hơn 4 chữ sẽ cắt và thêm "..."
  const truncateTitle = (title) => {
    const words = title.split(' ');  // Chia chuỗi thành mảng các từ
    if (words.length > 4) {
      return words.slice(0, 10).join(' ') + ' ...';  // Giữ lại 4 từ đầu và thêm "..."
    }
    return title;  // Nếu không cần cắt, trả về nguyên văn
  };

  return (
    <div className={cx('video2-card')}>
      <div className={cx('video2-thumbnail')}>
        <img src={youtubeTrend.ThumbnailURL} alt={youtubeTrend.Title} />
      </div>
      <div className={cx('owner2-view')}>
        <p className={cx('video2-title')}>{truncateTitle(youtubeTrend.Title)}</p> {/* Sử dụng hàm truncateTitle */}
        <p className={cx('video2-owner')}>{youtubeTrend.Channel}</p>
      </div>
      <p className={cx('video2-view')}>{`${youtubeTrend.Views} views`}</p>
    </div>
  );
};

export default VideoCard;

