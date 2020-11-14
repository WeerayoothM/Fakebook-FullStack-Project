import { Avatar, Button, Card, Col, Dropdown, Menu, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import axios from '../../../config/axios';
import './profile.css';

function Profile() {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [postList, setPostList] = useState([]);

    const fetchData = () => {
        axios.get(`users/${id}`).then(res => setPerson(res.data))
    }

    useEffect(() => {
        fetchData();
        axios.get(`/posts/${id}`)
            .then(res => {
                setPostList(res.data);
                console.log('postlist', res.data);
            });
    }, [id]);

    const acceptRequest = () => {
        axios.put(`/friends/accept/${id}`)
            .then(res => {
                notification.success({
                    description: `ส่งคำขอร้องคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    }

    const cancelRequest = () => {
        axios.delete(`/friends/cancel/${id}`)
            .then(res => {
                notification.success({
                    description: `ยกเลิกคำขอเป็นเพื่อนคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };

    const sendRequest = () => {
        axios.post(`/friends/${id}`)
            .then(res => {
                notification.success({
                    description: `ส่งคำขอร้องคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };

    const deleteFriend = () => {
        axios.delete(`/friends/${id}`)
            .then(res => {
                notification.success({
                    description: `ลบคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };

    const denyRequest = () => {
        axios.delete(`/friends/deny/${id}`)
            .then(res => {
                notification.success({
                    description: `ยกเลิกคำขอเป็นเพื่อนคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
                });
                fetchData();
            });
    };

    // xs={16} sm={16} md={16} lg={16} xl={16}
    //style={{ display: ' flex' ,justifyContent:'space-between'}

    return (
        <>
            <Card
                bodyStyle={{ padding: "0" }}
                bordered={false}
                style={{ maxWidth: '1200px', margin: '0 auto', marginTop: "20px", }}
            >
                <Row justify="center" style={{ display: 'flex', flexDirection: 'row', justify: 'center', alignItems: 'center', padding: '15px 0px 15px 30px', borderBottom: '2px solid hsl(0,0%,70%)' }}>
                    <Col xs={5} sm={5}><Avatar size={150} src={person.targetUser?.profile_url} /></Col>
                    <Col xs={14} sm={14} style={{ fontSize: "4rem", display: 'flex', justifyContent: 'flex-start', padding: '0 15px' }}><span>{person.targetUser?.name}</span></Col>
                    <Col xs={5} sm={5} >{(() => {
                        switch (person.message) {
                            case "เราเองแหละ":
                                const menu0 = (
                                    <Menu>
                                        <Menu.Item>
                                            <Link to='/editprofile'>
                                                แก้ไขข้อมูลส่วนตัว
                                            </Link>
                                        </Menu.Item>
                                    </Menu>
                                );
                                return (
                                    <>
                                        <Dropdown overlay={menu0} placement="bottomLeft">
                                            <Button>นี่ฉันเอง</Button>
                                        </Dropdown>
                                    </>
                                );
                            case "เพื่อน":
                                const menu1 = (
                                    <Menu>
                                        <Menu.Item>
                                            <div onClick={deleteFriend}>
                                                ลบเพื่อน
                                            </div>
                                        </Menu.Item>
                                    </Menu>
                                );
                                return (
                                    <Dropdown overlay={menu1} placement="bottomLeft">
                                        <Button>เพื่อน</Button>
                                    </Dropdown>
                                );
                            case "เพิ่มเพื่อน":
                                return (
                                    <Button onClick={sendRequest}>เพิ่มเพื่อน</Button>
                                );
                            case "ตอบรับคำขอเป็นเพื่อน":
                                const menu2 = (
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
                                    <Dropdown overlay={menu2} placement="bottomLeft">
                                        <Button>ตอบรับคำขอเป็นเพื่อน</Button>
                                    </Dropdown>
                                );
                            case "ส่งคำขอเป็นเพื่อนแล้ว":
                                const menu3 = (
                                    <Menu>
                                        <Menu.Item>
                                            <div onClick={cancelRequest}>
                                                ยกเลิก
                                        </div>
                                        </Menu.Item>
                                    </Menu>
                                );
                                return (
                                    <Dropdown overlay={menu3} placement="bottomLeft">
                                        <Button>ส่งคำขอเป็นเพื่อนแล้ว</Button>
                                    </Dropdown>
                                );
                            default:
                                return null;
                        }
                    })()}</Col>
                </Row >
            </Card>


            <Card
                bodyStyle={{ padding: "0" }}
                bordered={false}
                style={{ maxWidth: '800px', margin: '0 auto', marginTop: "20px", }}
            >

                {postList ?
                    <Row justify="center" style={{ display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center' }}>
                        {postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post, idx) => <Post key={idx} post={post} />)}
                    </Row> : null}

            </Card >
        </>
    )
}

export default Profile;
