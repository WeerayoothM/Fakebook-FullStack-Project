import { Button, Col, message, Row, Upload, Input, Avatar, Card, Form, notification } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import LocalStorageService from '../../services/LocalStorageService';
import jwt_decode from "jwt-decode";
import axios from '../../config/axios';
import { BASE_BACKEND_URL } from '../../config/constants';
// import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;

function CreatePost({ fetchData }) {
    const [imageUrl, setImageUrl] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [profileUrl, setProfileUrl] = useState(null);
    const [fileList, setFileList] = useState([]);
    const token = LocalStorageService.getToken();
    const decoded = jwt_decode(token);

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const onChangeInput = ({ target: { value } }) => {
        setInputValue(value);
    };

    const onFinish = ({ caption }) => {
        axios.post('/posts', { caption, imageUrl })
            .then(res => {
                notification.success({
                    description: 'create post success'
                });
                setInputValue('');
                setFileList([]);
                fetchData();
            })
    }

    const propsUpload = {
        name: 'img',
        listType: "picture-card",
        action: `${BASE_BACKEND_URL}/uploads/`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setFileList(info.fileList);
                setImageUrl(`${BASE_BACKEND_URL}/${info.file.response.url}`)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

    };

    useEffect(() => {
        axios.get(`/users/${decoded.id}`)
            .then(res => {
                console.log(res)
                setProfileUrl(res.data.targetUser.profile_url)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (

        <Card
            bodyStyle={{ padding: "0" }}
            style={{ width: 500, margin: "0 auto", marginTop: "20px", border: '1px solid hsl(0,0%,80%)' }}
        >

            <Row justify="start" align="middle" style={{ width: '100%', height: '50px', backgroundColor: 'lightgray', padding: '0 20px' }}>
                <span style={{ fontSize: '1.2rem' }}>Create Post</span>
            </Row>

            <Form name="post" onFinish={onFinish} >
                <Form.Item name='caption' style={{ margin: '0', padding: '0' }}>
                    <Row style={{ height: '150px', borderBottom: '1px solid hsl(0,0%,90%)' }}>
                        <Col span={3} style={{ padding: '20px' }}>
                            <Avatar size={40} src={profileUrl} />
                        </Col>
                        <Col span={21} style={{ padding: '15px 0 0 0px', display: 'flex', justifyContent: 'flex-start' }}>
                            <TextArea
                                value={inputValue}
                                onChange={onChangeInput}
                                placeholder="เขียนอะไรในนี้หน่อยสิ"
                                bordered={false}
                                style={{ fontSize: '1.2rem' }}
                            />
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="upload"
                    valuePropName="fileList"

                    style={{ margin: '0', padding: '0' }}
                >
                    <Row style={{ width: '100%', padding: '10px 20px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }} >
                        <Col>
                            {/* <Upload {...propsUpload} >
                                <Button icon={<PictureOutlined />} style={{ borderRadius: '40px', backgroundColor: 'hsl(0,0%,95%)', border: 'none' }}>Photo/Video</Button>
                            </Upload> */}
                            {/* <ImgCrop> */}
                            <Upload
                                {...propsUpload}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={onPreview}
                                style={{ width: '10px' }}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                            {/* </ImgCrop> */}
                        </Col>
                        <Col>
                            <Button type='primary' htmlType="submit" >Post</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>

        </Card >
    )
}

export default CreatePost


