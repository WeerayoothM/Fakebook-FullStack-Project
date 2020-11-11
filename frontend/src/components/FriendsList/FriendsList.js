import { Button, Col, Dropdown, Menu, notification, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

function FriendsList({ fetchData, id, name, profile_url }) {

    const deleteFriend = () => {
        axios.delete(`/friends/${id}`)
            .then(res => {
                notification.success({
                    description: `ลบคุณ ${name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={deleteFriend}>
                    ลบเพื่อน
                </div>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Row style={{ border: '0.9px solid hsl(0,0%,86%)', borderRadius: '3px', padding: '0' }}>
                <Col span={12} style={{ padding: '0' }} >
                    <Avatar src={profile_url} shape={'square'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* <img src={profile_url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px 0 0 5px' }} /> */}
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Row style={{ fontSize: '1.3rem' }}>
                        <Link to={`/profile/${id}`} style={{ color: "#3581c9", current: 'pointer' }}>
                            <strong>{name}</strong>
                        </Link>
                    </Row>
                    <Row>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>เพื่อน</Button>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FriendsList
