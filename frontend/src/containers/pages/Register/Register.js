import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Tooltip, Image, Divider, notification } from "antd";
import logo from '../../../Images/image33(2).png';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { BASE_BACKEND_URL } from '../../../config/constants';
import axios from '../../../config/axios';
import { withRouter } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';


const { Dragger } = Upload;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

function Register(props) {
    const [fileName, setFileName] = useState('')

    const onFinish = ({ username, password, nickname: name }) => {
        axios.post(`${BASE_BACKEND_URL}/users/register`, { username, password, name, profileUrl: fileName })
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
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                setFileName(info.file.response.url)
                console.log(info.file.response.url)
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
            <Col span={16}>
                <Row justify='center' style={{ margin: '20px', width: '100%' }}>
                    <Col>
                        <Image height={'150px'} width={'150px'} src={logo} style={{ objectFit: 'cover' }} />
                    </Col>
                </Row>
                <Divider />
                <Row justify='center' style={{ margin: '20px', width: '100%' }}>
                    <Col span={18}>
                        <Form
                            {...formItemLayout}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                            labelCol={{ span: 5 }}
                            size='large'
                        >
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
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
                                label="Confirm Password"
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
                                name="nickname"
                                label={
                                    <span>
                                        Nickname
                                    </span>
                                }
                                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                < ImgCrop>
                                    <Dragger {...propsUpload}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    </Dragger>
                                </ImgCrop>
                            </Form.Item>

                            <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                < Button type="primary" htmlType="submit" >
                                    Signup
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default withRouter(Register);