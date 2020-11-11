import React, { useEffect, useState } from 'react';
import logo from '../../Images/image33(2).png';
import { Menu, Dropdown, notification, Avatar } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import LocalStorageService from '../../services/LocalStorageService';
import axios from '../../config/axios';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

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
            <Link to="/" onClick={() => LocalStorageService.removeToken()}>ออกจากระบบ</Link>
        </Menu.Item>
    </Menu>
);

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

            })
    })

    const logout = () => {
        notification.success({
            description: "Logout successfully"
        });
        LocalStorageService.removeToken();
        window.location.reload();
    }
    return (
        <nav style={{ width: '100%', height: '55px', backgroundColor: 'hsl(0,0%,20%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 60px 0 80px' }}>
            <Link to='/'> <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'} height={'40px'} style={{ borderRadius: '50%' }} /></Link>
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

export default NavBar

// function Sider() {
//     const [openKey, setOpenKey] = useState(['sub1']);
//     const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

//     const onOpenChange = openKeys => {
//         const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
//         if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//             setOpenKey(openKeys);
//         } else {
//             setOpenKey(latestOpenKey ? [latestOpenKey] : []);
//         }
//     };
//     return (
//         <Menu
//             mode="inline"
//             openKeys={openKey}
//             onOpenChange={onOpenChange}
//             style={{ width: 256 }}
//         >
//             <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//                 <Menu.Item key="1">Option 1</Menu.Item>
//                 <Menu.Item key="2">Option 2</Menu.Item>
//                 <Menu.Item key="3">Option 3</Menu.Item>
//                 <Menu.Item key="4">Option 4</Menu.Item>
//             </SubMenu>
//         </Menu>
//     );
// }


// class Sider extends React.Component {
//     // submenu keys of first level
//     rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

//     state = {
//         openKeys: ['sub1'],
//     };

//     onOpenChange = openKeys => {
//         const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
//         if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//             this.setState({ openKeys });
//         } else {
//             this.setState({
//                 openKeys: latestOpenKey ? [latestOpenKey] : [],
//             });
//         }
//     };

//     render() {
//         return (
//             <Menu
//                 mode="inline"
//                 triggerSubMenuAction={'click'}
//                 openKeys={this.state.openKeys}
//                 onOpenChange={this.onOpenChange}
//                 style={{ width: 256 }}
//             >
//                 <SubMenu key="sub1" >
//                     <Menu.Item key="1">Option 1</Menu.Item>
//                     <Menu.Item key="2">Option 2</Menu.Item>
//                     <Menu.Item key="3">Option 3</Menu.Item>
//                     <Menu.Item key="4">Option 4</Menu.Item>
//                 </SubMenu>
//             </Menu>
//         );
//     }
// }

