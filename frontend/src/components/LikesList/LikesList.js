import React, { useState } from 'react';
import { Modal, Button, List, Col, Avatar, Row } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


function LikesList({ Likes }) {
    const [visibleLikeModal, setVisibleLikeModal] = useState(false);

    const showModal = () => {
        setVisibleLikeModal(true)
    };

    const handleOk = e => {
        console.log(e);
        setVisibleLikeModal(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisibleLikeModal(false)
    };
    return (
        <>
            <Button type="text" onClick={showModal} style={{ cursor: 'pointer' }} ><LikeOutlined />&nbsp;{Likes.length}</Button>
            <Modal
                title="People who like this post."
                visible={visibleLikeModal}
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{ padding: '0 20px' }}
            >
                <List
                    dataSource={Likes}
                    renderItem={like =>
                        <List.Item style={{ padding: '0' }}>
                            {/* <Row style={{ width: '100%' }}> */}
                            <Col span={4} style={{ padding: '15px 0px 15px 15px', display: 'flex', justifyContent: 'flex-end' }}>
                                <Avatar size={40} src={like.User.profile_url} alt='' style={{ objectFit: 'cover' }} />
                            </Col>
                            <Col span={19} style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '1.2rem' }}>
                                <Link to={`/profile/${like.User.id}`} style={{ color: "#385898", fontWeight: 'bold' }}>
                                    {like.User.name}
                                </Link>
                            </Col>
                            {/* </Row> */}
                        </List.Item>
                    }
                />
            </Modal>
        </>
    )
}

export default LikesList