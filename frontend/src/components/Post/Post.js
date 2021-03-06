import { Avatar, Button, Card, Col, Dropdown, Image, Input, Menu, message, Modal, notification, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { CommentOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import CommentList from '../CommentList/CommentList'
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import LocalStorageService from '../../services/LocalStorageService';
import axios from '../../config/axios';
import { BASE_BACKEND_URL } from '../../config/constants';
import LikesList from '../LikesList/LikesList';

function Post({ post, fetchData }) {
    const { id, caption, picture_url, createdAt, Comments, User, Likes } = post;
    const [postInput, setPostInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);
    const decoded = LocalStorageService.getUserProfile();

    useEffect(() => {
        const indexMyLike = Likes.findIndex(like => like.User.id === decoded?.id);
        if (indexMyLike !== -1) setIsLike(true);
    }, [])


    let manageButton = null;
    const [visibleModal, setVisibleModal] = useState(false)

    const showModal = () => {
        setPostInput(caption)
        setVisibleModal(true)
    };
    const handleCancel = e => {
        setVisibleModal(false)
    };


    const handleChangePost = e => {
        axios.put(`posts/${id}`, { caption: postInput, picture_url: imageUrl })
            .then(res => {
                notification.success({
                    description: 'edit success'
                })
                setPostInput('');
                setFileList([]);
                fetchData();
            })
        setVisibleModal(false)
    };


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

    const likePost = () => {
        axios.post(`/posts/like/${id}`)
            .then(res => {
                setIsLike(true)
                fetchData()
            }).catch(err => {
                console.log(err)
            })
    }

    const unLikePost = () => {
        axios.delete(`/posts/like/${id}`)
            .then(res => {
                setIsLike(false)
                fetchData()
            }).catch(err => {
                notification.error({
                    description: 'unlike fail'
                })
            })
    }

    const deletePost = () => {
        axios.delete(`/posts/${id}`)
            .then(res => {
                notification.success({
                    description: 'delete success'
                })
                // setList(list.filter(item => item.id !== id))
                fetchData()
            }).catch(err => {
                notification.error({
                    description: 'delete fail'
                })
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

    const menu = (
        <Menu>
            <Menu.Item key="0">
                {/* <Link to="#" style={{ color: "#1D2129" }}>
                    แก้ไขโพสต์
            </Link> */}
                <>
                    <Link onClick={showModal} style={{ color: "#1D2129" }}>
                        แก้ไขโพสต์
                    </Link>
                    <Modal
                        title="Edit Post"
                        visible={visibleModal}
                        onOk={handleChangePost}
                        onCancel={handleCancel}
                    >
                        <Row style={{ marginBottom: '10px' }}>
                            <Input.TextArea autoSize={{ minRows: 5 }} value={postInput} onChange={(e) => setPostInput(e.target.value)} />
                        </Row>
                        <Row>
                            <Upload
                                {...propsUpload}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={onPreview}
                                style={{ width: '10px' }}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </Row>
                    </Modal>
                </>
            </Menu.Item>
            <Menu.Item key="1">
                <Link onClick={deletePost} style={{ color: "#1D2129" }}>
                    ลบโพสต์
                </Link>
            </Menu.Item>
        </Menu>
    );

    if (decoded?.id === User.id) {
        manageButton = (
            <Col span={2} style={{ padding: '15px 15px 15px 5px' }}>
                <Row justify="end">
                    <Link to="#" style={{ color: "#606770" }}>
                        <Dropdown
                            trigger={["click"]}
                            overlay={menu}
                            placement="bottomRight"
                        >
                            <EllipsisOutlined style={{ fontSize: '1.2rem' }} />
                        </Dropdown>
                    </Link>
                </Row>
            </Col>
        );
    };

    return (
        // <Col style={{ width: '500px', border: '1px solid hsl(0,0%,80%)', margin: '20px 0 20px 0', display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center', borderRadius: '5px' }}>
        <Card
            bodyStyle={{ padding: "0" }}
            style={{ width: '500px', margin: "20px 0", border: '1px solid hsl(0,0%,80%)', borderRadius: '6px' }}
        >
            <Row >
                <Col span={3} style={{ padding: '20px' }}>
                    <Avatar src={User.profile_url} alt='' size={40} style={{ objectFit: 'cover' }} />
                </Col>
                <Col span={19} style={{ padding: '15px 15px 15px 5px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', fontSize: '1rem' }}>
                    <Row style={{ fontSize: '1rem' }}>
                        <Link to={`/profile/${User.id}`} style={{ color: "#385898" }}>
                            <strong>{User.name}</strong>
                        </Link>
                    </Row>
                    <Row style={{ fontSize: '0.8rem' }}>{new Date(createdAt).toDateString()}</Row>
                </Col>
                {manageButton}
            </Row >
            <Row style={{ width: '100%', padding: '0 30px 10px 30px' }}>
                <span>
                    {caption}
                </span>
            </Row>

            {
                picture_url ?
                    <Row style={{ width: '100%' }}>
                        <Image src={picture_url} width={'100%'} style={{ objectFit: 'cover' }} />
                    </Row> : null
            }

            <Row style={{ width: '95%', height: '40px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'gray', borderBottom: '1px solid hsl(0,0%,90%)' }}>
                <LikesList Likes={Likes} fetchData={fetchData} />
                <span>{Comments.length}&nbsp;Comments</span>
            </Row>

            <Row style={{ width: '95%', height: '40px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'gray', borderBottom: '1px solid hsl(0,0%,90%)', }}>
                <Col span={3} style={{}}>
                    <Button type="text" onClick={isLike ? unLikePost : likePost} ><LikeOutlined />&nbsp;&nbsp;{isLike ? 'Unlike' : 'Like'}</Button>
                </Col>
                <Col span={20}>
                    <Button type="text" onClick={() => setIsShowComment(!isShowComment)} style={{ cursor: 'pointer' }}><CommentOutlined />&nbsp;&nbsp;&nbsp;Comment</Button>
                </Col>
            </Row>

            <Row style={{ padding: '0', width: '100%', display: 'flex' }}>
                {isShowComment &&
                    <CommentList
                        fetchData={fetchData}
                        postId={id}
                        commentList={Comments}
                    />}
            </Row>
        </Card>

        // </ Col > 
    )
}

export default Post;
