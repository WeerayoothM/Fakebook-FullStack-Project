import { Row } from 'antd';
import React from 'react';
import Post from '../Post/Post';

function PostList({ postList, fetchData }) {
    return (
        <Row justify="center" style={{ display: 'flex', flexDirection: 'column', justify: 'center' }}>
            {postList.map((post, idx) => <Post key={idx} post={post} fetchData={fetchData} />)}
        </Row>
    )
}

export default PostList;
