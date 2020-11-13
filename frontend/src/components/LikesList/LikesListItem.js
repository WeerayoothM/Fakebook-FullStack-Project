import React, { useEffect, useState } from 'react';
import { Button, Col, Avatar, Menu, Dropdown, notification } from 'antd';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

function LikesListItem({ like }) {
    const [person, setPerson] = useState({});

    const fetchData = () => {
        axios.get(`users/${like.User.id}`).then(res => setPerson(res.data))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const acceptRequest = () => {
        axios.put(`/friends/accept/${like.User.id}`)
            .then(res => {
                fetchData();
            });
    }

    const cancelRequest = () => {
        axios.delete(`/friends/cancel/${like.User.id}`)
            .then(res => {
                fetchData();
            });
    };

    const sendRequest = () => {
        axios.post(`/friends/${like.User.id}`)
            .then(res => {
                fetchData();
            });
    };

    const deleteFriend = () => {
        axios.delete(`/friends/${like.User.id}`)
            .then(res => {
                fetchData();
            });
    };

    const denyRequest = () => {
        axios.delete(`/friends/deny/${like.User.id}`)
            .then(res => {
                fetchData();
            });
    };
    return (
        <>
            <Col span={4} style={{ padding: '15px 0 15px 0', display: 'flex', justifyContent: 'center' }}>
                <Avatar size={40} src={like.User.profile_url} alt='' style={{ objectFit: 'cover' }} />
            </Col>
            <Col span={15} style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '1.2rem' }}>
                <Link to={`/profile/${like.User.id}`} style={{ color: "#385898", fontWeight: 'bold' }}>
                    {like.User.name}
                </Link>
            </Col>
            <Col span={5} >{(() => {
                switch (person.message) {
                    case "เราเองแหละ":
                        // const menu0 = (
                        //     <Menu>
                        //         <Menu.Item>
                        //             <div onClick={deleteFriend}>
                        //                 แก้ไขข้อมูลส่วนตัว
                        //                 </div>
                        //         </Menu.Item>
                        //     </Menu>
                        // );
                        return (null
                            // <>
                            //     <Dropdown overlay={menu0} placement="bottomLeft">
                            //         <Button>นี่ฉันเอง</Button>
                            //     </Dropdown>
                            // </>
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
        </>
    )
}

export default LikesListItem
