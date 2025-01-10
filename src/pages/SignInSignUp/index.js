import React, { useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './signinsignup.module.scss';
import ValidationSignIn from './SignInValidation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignInSignUpForm() {

  /*Sign In*/
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(ValidationSignIn(values));
    if(errors.email === "" && errors.password === "") {
        axios.post('http://localhost:3307/signin', values)
        .then(res => {
            if(res.data.status === "Success") {
                alert("Sign in successful");
                if(res.data.role === "admin") {
                    navigate('/adminpage'); // Điều hướng tới trang admin
                } else {
                    navigate('/'); // Điều hướng tới trang người dùng bình thường
                }
            } else {
                alert("No record existed");
            }
        })
        .catch(err => console.log(err));
    }
};

  return (
    <div className={cx('form-container')}>
      <div className={cx('form-buttons')}>
        <button className={cx('signin-btn')}>
          Đăng Nhập
        </button>
        <Link to="/signupsignin" className={cx('signup-btn')}>
          <button>
          Đăng Kí
          </button>
        </Link>
      </div>

      <form className={('login-form')} action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder='Nhập Email'
          onChange={handleInput}/>
          {errors.email && <span className={cx('text-danger')}>{errors.email}</span> }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder='Nhập Password'
          onChange={handleInput}/>
          {errors.password && <span className={cx('text-danger')}>{errors.password}</span> }
        </div>
        <button className={cx('final-btn')} type="submit">Đăng Nhập</button> 
      </form>
    </div>
  );
}
  
  export default SignInSignUpForm;