import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Button, Form, notification } from "antd";
import LocalStorageService from "../../services/LocalStorageService";
import jwt_decode from "jwt-decode";
import axios from "../../config/axios";
import { SendOutlined } from "@ant-design/icons";

function CreateComment({ postId, fetchData }) {
    const [inputValue, setInputValue] = useState('');
    const [profileUrl, setProfileUrl] = useState(null);

    const onChangeInput = ({ target: { value } }) => {
        setInputValue(value);
    };

    const onSubmit = (e) => {
        axios.post('/comments', { comment: inputValue, postId })
            .then(res => {
                notification.success({
                    description: 'create comment success'
                });
                setInputValue('');
                fetchData();
            })
    }

    useEffect(() => {
        const token = LocalStorageService.getToken();
        const decoded = jwt_decode(token);
        axios.get(`/users/${decoded.id}`)
            .then(res => {
                console.log(res)
                setProfileUrl(res.data.targetUser.profile_url)
            }).catch(err => {
                console.log(err)
            })
    })

    return (
        <>
            {/* <Form name="post" onFinish={onFinish} > */}
            <Col span={3} style={{ padding: '15px 0px 15px 15px' }}>
                <Avatar size={32} src={profileUrl} style={{ height: '30px', width: '30px', objectFit: 'cover' }} />
            </Col>
            <Col span={19} style={{ width: 'auto', display: 'flex', justifyContent: 'flex-start', padding: '15px 15px 15px 0px' }}>
                {/* <Form.Item name='comment' style={{ margin: '0', padding: '0' }}> */}
                <input
                    value={inputValue}
                    onChange={onChangeInput}
                    onKeyPress={(e) => e.key === "Enter" ? onSubmit() : null}
                    type="text"
                    placeholder="Write a comment ..."
                    border={false}
                    style={{
                        border: "none",
                        resize: "none",
                        backgroundColor: "#F2F3F5",
                        borderRadius: '18px',
                        minHeight: '30px',
                        lineHeight: '10px',
                        width: "100%",
                        outline: "none",
                        padding: '0px 0px 0px 15px'
                    }}
                />
                {/* </Form.Item> */}
            </Col>
            <Col span={2}>
                <Button shape="circle" onClick={onSubmit} icon={<SendOutlined />} style={{ border: 'none', shadow: 'none' }} htmlType='submit' ></Button>
            </Col>
            {/* </Form>s */}

        </>
    );
}

export default CreateComment;

