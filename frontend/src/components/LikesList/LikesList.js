import React, { useEffect, useState } from 'react';
import { Modal, Button, List, Col, Avatar } from 'antd';
import LikesListItem from './LikesListItem';


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
            <Button type="text" onClick={showModal} icon={<Avatar src={"https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"} />} style={{ cursor: 'pointer', padding: '0' }} >{` ${Likes.length}`}</Button>
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
                            <LikesListItem like={like} />
                        </List.Item>
                    }
                />
            </Modal>
        </>
    )
}

export default LikesList