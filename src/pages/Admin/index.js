import React, {useEffect} from "react";
import {useState} from "react";
import axios from 'axios'
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom'
import styles from './admin.module.scss';

const cx = classNames.bind(styles);

function Admin() {

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3307/admin')
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    })

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:3307/delete/'+id)
            window.location.reload()
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('list')}>
                <Link to="/adminpage/createuser" className={cx('btn-add')}>Thêm +</Link>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th className={cx('table-title')}>Tên</th>
                            <th className={cx('table-title')}>Email</th>
                            <th className={cx('table-title')}>Password</th>
                            <th className={cx('table-title')}>Tạo</th>
                            <th className={cx('table-title')}>Dùng lần cuối</th>
                            <th className={cx('table-title')}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.user_name}</td>
                                    <td>{data.user_username}</td>
                                    <td>{data.user_password}</td>
                                    <td className={cx('created-at')}>{data.created_at}</td>
                                    <td>{data.last_used_at}</td>
                                    <td className={cx('action')}>
                                        <Link to={`update/${data.user_id}`} className={cx('btn-update')}>Cập nhật</Link>
                                        <button className={cx('btn-delete')} onClick={ e => handleDelete(data.user_id) }>Xóa</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;