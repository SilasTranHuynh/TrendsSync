import React, {useEffect} from "react";
import {useState} from "react";
import axios from 'axios'
import classNames from 'classnames/bind';
import {Link, useNavigate} from 'react-router-dom'
import styles from './admin.module.scss'; 

const cx = classNames.bind(styles);

function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const naviage = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3307/create', {name, email, password})
        .then(res => {
            console.log(res);
            naviage('/adminpage');
        }).catch(err => console.log(err));
    }

    return(
        <div className={cx('container')}>
            <div className={cx('add-form')}>
                <form onSubmit={handleSubmit}>
                    <h2>Add New User</h2>
                    <div>
                        <label htmlFor="name">Tên</label>
                        <input id="name" type="text" name="name" placeholder='Nhập Tên'
                        onChange={e => setName(e.target.value)}/>                        
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" placeholder='Nhập Email'
                        onChange={e => setEmail(e.target.value)}/>                        
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="text" name="password" placeholder='Nhập Password'
                        onChange={e => setPassword(e.target.value)}/>                        
                    </div>
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;