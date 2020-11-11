import React from 'react';
import { Row, Col, Button, Form, Input, Tooltip, Image, notification } from "antd";
import logo from '../../../Images/image33(2).png';
import axios from '../../../config/axios';
import { BASE_BACKEND_URL } from '../../../config/constants';
import { withRouter } from 'react-router-dom';
import LocalStorageService from '../../../services/LocalStorageService';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 7 },
        lg: { span: 6 },
        xl: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 14 },
        md: { span: 16 },
        lg: { span: 14 },
        xl: { span: 18 }
    },
};

function Login(props) {
    const onFinish = ({ username, password }) => {
        axios.post(`${BASE_BACKEND_URL}/users/login`, { username, password })
            .then(res => {
                notification.success({
                    description: "Login successfully"
                });
                LocalStorageService.setToken(res.data.token);
                props.history.push("/");
                props.setRole('USER')
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    description: "Something went wrong."
                });
            });
    };
    return (
        <>
            <Row justify='center' align='middle' style={{ height: '100vh' }}>
                <Col xs={20} sm={20} md={6} lg={6} xl={6}>
                    <Image height={'200px'} width={'200px'} src={logo} style={{ objectFit: 'cover' }} />
                </Col>
                <Col xs={20} sm={20} md={12} lg={10} xl={8} >
                    <Form
                        {...formItemLayout}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
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

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', padding: '0 50px' }}>
                            < Button type="link" onClick={() => props.history.push('/register')}>
                                Signup
                            </Button>
                            < Button type="primary" htmlType="submit" >
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default withRouter(Login);
