import { Avatar, Button, Col, Dropdown, Input, Menu, Modal, notification, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import "./Comment.css";

import LocalStorageService from '../../services/LocalStorageService';
import axios from '../../config/axios';

function Comment(props) {
    const token = LocalStorageService.getToken();
    const decoded = jwt_decode(token);
    const [commentInput, setCommentInput] = useState('')
    let manageButton = null;
    const [visibleModal, setVisibleModal] = useState(false)

    const showModal = () => {
        setCommentInput(props.content)
        setVisibleModal(true)
    };

    const handleOk = e => {
        console.log(e);
        axios.put(`comments/${props.id}`, { comment: commentInput })
            .then(res => {
                notification.success({
                    description: 'edit success'
                })
                props.fetchData()
            })
        setVisibleModal(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisibleModal(false)
    };

    const deleteComment = () => {
        axios.delete(`/comments/${props.id}`)
            .then(res => {
                notification.success({
                    description: 'delete success'
                })
                props.fetchData()
            }).catch(err => {
                notification.error({
                    description: 'delete fail'
                })
            })
    }
    // const editComment = () => {
    //     axios.put(`comments/${props.id}`, { commentInput })
    //         .then(res => {
    //             notification.success({
    //                 description: 'edit success'
    //             })
    //         })
    // }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                {/* <Link onClick={editComment} style={{ color: "#1D2129" }}>
                    แก้ไขคอมเมนต์
                </Link> */}
                <>
                    <Link onClick={showModal} style={{ color: "#1D2129" }}>
                        แก้ไขคอมเมนต์
                    </Link>
                    <Modal
                        title="Edit Comment"
                        visible={visibleModal}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        {/* onKeyPress={(e) => e.key === "Enter" ? handleOk() : null} */}
                        <Input.TextArea autoSize={{ minRows: 5 }} value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                    </Modal>
                </>
            </Menu.Item>
            <Menu.Item key="1">
                <Link onClick={deleteComment} style={{ color: "#1D2129" }}>
                    ลบคอมเมนต์
                </Link>
            </Menu.Item>
        </Menu>
    );

    if (decoded.id === props.writer.id) {
        manageButton = (
            <Col span={2} style={{ padding: '15px 15px 15px 5px' }}>
                <Row justify="end">
                    {/* <Link to="#" style={{ color: "#606770" }}> */}
                    <Dropdown
                        trigger={["click"]}
                        overlay={menu}
                        placement="bottomRight"
                    >
                        <EllipsisOutlined style={{ fontSize: '1.2rem' }} />
                    </Dropdown>
                    {/* </Link> */}
                </Row>
            </Col>
        );
    }
    return (
        <>
            {props.content ?
                <>
                    <Col span={3} style={{ padding: '15px 0px 15px 15px' }}>
                        <Avatar src={props.writer.profile_url} alt='' style={{ height: '30px', width: '30px', objectFit: 'cover' }} />
                    </Col>
                    <Col span={19} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div className="comment-layout">
                            <Link to="#" style={{ color: "#385898", fontWeight: 'bold' }}>
                                {props.writer.name}
                            </Link>
                            <br />{props.content}
                        </div>
                    </Col>
                    {manageButton}
                </>
                : null}

        </>
    )
}

{/* <Col span={3} style={{ padding: '15px 0px 15px 15px' }}>
                        <Avatar src={props.writer.profile_url} alt='' style={{ height: '30px', width: '30px', objectFit: 'cover' }} />
                    </Col>
                    <Col span={19} >
                        <div style={{ border: '1px solid' }}>
                            <Row>
                                <Link to="#" style={{ color: "#385898", fontWeight: 'bold' }}>
                                    {props.writer.name}
                                </Link>
                            </Row>
                            <Row >
                                {props.content}
                            </Row>
                        </div>
                    </Col> */}

export default Comment

// import React from "react";
// import { Row, Col, Avatar } from "antd";
// import { EllipsisOutlined } from "@ant-design/icons";
// import "./Comment.css";
// import { Link } from "react-router-dom";

// function Comment(props) {
//     return (
//         <Row style={{ margin: "10px 12px 10px 12px" }}>
//             <Col>
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "start",
//                         width: "38px",
//                         height: "32px",
//                     }}
//                 >
//                     <Avatar size={32} src={props.writer.profile_url} />
//                 </div>
//             </Col>
//             <Col>
//                 <div className="comment-layout">
//                     <Link to="#" style={{ color: "#385898" }}>
//                         <strong>{props.writer.name}</strong>
//                     </Link>
//           &nbsp;{props.content}
//                 </div>
//             </Col>
//             <Col>
//                 <EllipsisOutlined />
//             </Col>
//         </Row>
//     );
// }

// export default Comment;
