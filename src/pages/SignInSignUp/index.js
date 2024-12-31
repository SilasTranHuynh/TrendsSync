import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './signinsignup.module.scss';

const cx = classNames.bind(styles);

function SignInSignUpForm() {
  const [isRegister, setIsRegister] = useState(false); // Quản lý trạng thái: true = "Đăng ký", false = "Đăng nhập"

  // Chuyển trạng thái sang form Đăng ký
  const handleToggle = () => {
    setIsRegister(!isRegister); // Đổi trạng thái giữa "Đăng nhập" và "Đăng ký"
  };

  return (
    <div className={cx('form-container')}>
      {/* Nút chuyển đổi giữa Đăng nhập và Đăng ký */}
      <div className={cx('form-buttons')}>
        <button
          onClick={() => setIsRegister(false)}
          style={{
            backgroundColor: isRegister ? "#f5f5f5" : "#daa5a5",
            color: isRegister ? "black" : "white",
          }}
        >
          Đăng Nhập
        </button>
        <button
          onClick={() => setIsRegister(true)}
          style={{
            backgroundColor: isRegister ? "#daa5a5" : "#f5f5f5",
            color: isRegister ? "white" : "black",
          }}
        >
          Đăng Ký
        </button>
      </div>

      {/* Nội dung Form */}
      {!isRegister ? (
        <form className={('login-form')}>
          {/* Form Đăng Nhập */}
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" type="password" />
          </div>
          <div>
            <label className={cx('save-pass')}>
              <input className={cx('save-pass-checkbox')} type="checkbox" />
              <div className={cx('save-pass-text')}>Lưu mật khẩu đăng nhập</div>
            </label>
          </div>
          <button type="submit">Đăng Nhập</button>
          <div className={cx('forget-pass')}>
            <a href="#">Quên mật khẩu?</a>
          </div>
        </form>
      ) : (
        <form className={('register-form')}>
          {/* Form Đăng Ký */}
          <div>
            <label htmlFor="username">Tên người dùng</label>
            <input id="username" type="text" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" type="password" />
          </div>
          <div>
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input id="confirm-password" type="password" />
          </div>
          <button type="submit">Đăng Ký</button>
        </form>
      )}
    </div>
  );
}
  
  export default SignInSignUpForm;