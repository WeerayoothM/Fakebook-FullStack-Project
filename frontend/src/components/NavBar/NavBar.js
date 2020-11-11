import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, notification, Avatar, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService';
import axios from '../../config/axios';
import jwt_decode from "jwt-decode";
import { Link, withRouter } from 'react-router-dom';

function NavBar() {
    const [profileUrl, setProfileUrl] = useState(null);
    const [name, setName] = useState(null);
    const token = LocalStorageService.getToken();
    const decoded = jwt_decode(token);

    useEffect(() => {
        axios.get(`/users/${decoded.id}`)
            .then(res => {
                setProfileUrl(res.data.targetUser.profile_url);
                setName(res.data.targetUser.name)
            }).catch(err => {
                console.log(err)
            })
    })

    const logout = () => {
        notification.success({
            description: "Logout successfully"
        });
        LocalStorageService.removeToken();
        // props.history.push('/');
        window.location.href = `http://localhost:3000`;
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to="/list">ดูรายชื่อเพื่อน</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to="/">เปลี่ยนรหัสผ่าน</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <Button onClick={logout}>ออกจากระบบ</Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <nav style={{ width: '100%', height: '55px', backgroundColor: 'hsl(0,0%,20%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 60px 0 80px' }}>
            <Link to='/'> <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'} height={'40px'} style={{ borderRadius: '50%' }} alt="" /></Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/profile/${decoded.id}`}> <span style={{ color: 'white', fontSize: '1.2rem', marginRight: '20px' }}> {name}</span>
                    <Avatar size={35} src={profileUrl} style={{ marginRight: '20px' }} /></Link>
                <Dropdown style={{ color: 'white', marginRight: '20px' }} overlay={menu} trigger={['click']}>
                    <Link className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ borderLeft: '1px solid hsl(0,0%,90%)', padding: '0 20px' }}>
                        <CaretDownOutlined style={{ fontSize: '1.3rem', color: 'white' }} />
                    </Link>
                </Dropdown>
            </div>
        </nav>
    )
}

export default withRouter(NavBar)