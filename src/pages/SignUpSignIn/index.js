import React, { useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './signupsignin.module.scss';
import ValidationSignUp from './SignUpValidation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUpSignInForm() {

  /*Sign Up*/
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(ValidationSignUp(values));
    if(errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:3307/signup', values)
      .then(res => {
        alert("Sign up successful");
        navigate('/signinsignup');
      })
      .catch(err => 
        {
          alert("Error");
          console.log(err)
        });
    }
  }

  return (
    <div className={cx('form-container')}>
      <div className={cx('form-buttons')}>
        <Link to="/signinsignup" className={cx('signin-btn')}>
          <button>
            Đăng Nhập
          </button>
        </Link>
        <button className={cx('signup-btn')}>
          Đăng Kí
        </button>
      </div>

      <form className={('register-form')} action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" placeholder='Nhập Name'
          onChange={handleInput}/>
          {errors.name && <span className={cx('text-danger')}>{errors.name}</span> }
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder='Nhập Email'
          onChange={handleInput}/>
          {errors.email && <span className={cx('text-danger')}>{errors.email}</span> }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Nhập Password" 
          onChange={handleInput}/>
          {errors.password && <span className={cx('text-danger')}>{errors.password}</span> }
        </div>
        <button className={cx('final-btn')} type="submit">Đăng Kí</button>
      </form>
    </div>
  );
}
  
export default SignUpSignInForm;