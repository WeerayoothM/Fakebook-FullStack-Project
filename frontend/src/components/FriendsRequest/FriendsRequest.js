import { Button, Card, Col, Dropdown, Image, Menu, notification, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

function FriendsRequest({ fetchData, id, name, profile_url }) {

    const acceptRequest = () => {
        axios.put(`/friends/accept/${id}`)
            .then(res => {
                notification.success({
                    description: `ส่งคำขอร้องคุณ ${name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    }

    const denyRequest = () => {
        axios.delete(`/friends/deny/${id}`)
            .then(res => {
                notification.success({
                    description: `ยกเลิกคำขอเป็นเพื่อนคุณ ${name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={acceptRequest}>
                    ตอบรับคำขอเป็นเพื่อน
            </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={denyRequest}>
                    ปฏิเสธคำขอเป็นเพื่อน
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
                            <Button>ตอบรับคำขอเป็นเพื่อน</Button>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FriendsRequest
