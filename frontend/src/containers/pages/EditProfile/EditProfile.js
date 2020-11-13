import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, notification, Avatar } from "antd";
import { Upload, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { BASE_BACKEND_URL } from '../../../config/constants';
import axios from '../../../config/axios';
import { withRouter } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';

function EditProfile(props) {
    const [imageUrl, setImageUrl] = useState(null)

    const onFinish = ({ username, password, name }) => {
        axios.post(`${BASE_BACKEND_URL}/users/register`, { username, password, name, profileUrl: `${BASE_BACKEND_URL}/fileName` })
            .then(res => {
                notification.success({
                    description: "Signup successfully"
                });
                props.history.push("/");
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Something went wrong."
                });
            });
    };


    const propsUpload = {
        name: 'img',
        multiple: false,
        action: `${BASE_BACKEND_URL}/uploads/`,
        showUploadList: { showPreviewIcon: false },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                // setFileName(info.file.response.url);
                setImageUrl(`${BASE_BACKEND_URL}/${info.file.response.url}`)

                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove() {
            setImageUrl(null)
        }
    };
    return (
        <>
            <Row justify="center" style={{ width: '100%', display: 'flex', flexDirection: 'row', justify: 'center', alignItems: 'center' }}>
                <Col xs={0} sm={0} md={0} lg={6} xl={6} style={{ border: '1px solid' }}>
                    {/* <Col span={10}> */}
                    <Row justify='center' style={{ width: '100%' }}>
                        <span>แก้ไขชื่อ</span>
                    </Row>
                    <Row justify='center' style={{ width: '100%' }}>

                        <span>แก้ไขรูปโปรไฟล์</span>
                    </Row>
                    <Row justify='center' style={{ width: '100%' }}>

                        <span>เปลี่ยนรหัสผ่าน</span>

                    </Row>
                </Col>
                {/* <Col span={12}> */}
                <Col xs={20} sm={20} md={20} lg={18} xl={18}>
                    <Form
                        // {...formItemLayout}
                        name="register"
                        layout='vertical'
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <Row justify='center' gutter={32} style={{ padding: '20px', width: '100%' }}>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Avatar shape='square' size={130} icon={<UserOutlined />} src={imageUrl ? imageUrl : null} style={{ objectFit: 'cover', color: '#4d98dd', backgroundColor: '#fff' }} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                <Form.Item >
                                    <ImgCrop>
                                        <Upload {...propsUpload}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </ImgCrop>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='center' style={{ padding: '10px 0', width: '100%' }}>
                            <Col xs={16} sm={16} md={16} lg={13} xl={13}>
                                <Form.Item
                                    name="username"
                                    // label="Username"
                                    label={<span style={{ color: '#4d98dd' }}><strong>Username</strong></span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                    style={{ color: '#fff' }}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label={<span style={{ color: '#4d98dd' }} ><strong>Password</strong></span>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label={<span style={{ color: '#4d98dd' }}><strong>Confirm Password</strong></span>}
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="name"
                                    label={
                                        <span style={{ color: '#4d98dd' }}>
                                            <strong>Name</strong>
                                        </span>
                                    }
                                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    < Button type="primary" htmlType="submit" >
                                        Signup
                                </Button>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default withRouter(EditProfile);