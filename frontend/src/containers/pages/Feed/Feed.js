import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CreatePost from '../../../components/PostList/CreatePost';
import PostList from '../../../components/PostList/PostList';
import axios from '../../../config/axios';

function Feed(props) {
    const [postList, setPostList] = useState([]);

    const fetchData = async () => {
        console.log('feed', 1)
        axios.get("/posts/feed")
            .then(res => {
                setPostList(res.data);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (

        <>
            <Row justify='center' style={{ width: '100%', height: '100%' }}>
                <Col >
                    <CreatePost fetchData={fetchData} />
                    {/* {JSON.stringify(postList)} */}
                    <PostList fetchData={fetchData} postList={postList} />
                </Col>
            </Row>
        </>
    )
};

export default withRouter(Feed)
