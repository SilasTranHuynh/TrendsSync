import React, {useEffect} from "react";
import {useState} from "react";
import axios from 'axios'
import classNames from 'classnames/bind';
import {Link, useNavigate, useParams} from 'react-router-dom'
import styles from './admin.module.scss'; 

const cx = classNames.bind(styles);

function UpdateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {id} = useParams();
    const naviage = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:3307/update/${id}`, {name, email, password})
        .then(res => {
            console.log(res);
            naviage('/adminpage');
        }).catch(err => console.log(err));
    }

    return(
        <div className={cx('container')}>
            <div className={cx('add-form')}>
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" placeholder='Enter Name'
                        onChange={e => setName(e.target.value)}/>                        
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" placeholder='Enter Email'
                        onChange={e => setEmail(e.target.value)}/>                        
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="text" name="password" placeholder='Enter Password'
                        onChange={e => setPassword(e.target.value)}/>                        
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;