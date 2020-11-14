import { List, Button, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

const MORE_POST_COUNT = 5;

function PostList({ postList, fetchData }) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [limitPost, setLimitPost] = useState(5);

    useEffect(() => {
        setInitLoading(false)
        setLoading(false)
    })

    const onLoadMore = () => {
        setLimitPost(limitPost + MORE_POST_COUNT)
        window.dispatchEvent(new Event('resize'));
    };


    const loadMore =
        !initLoading && !loading && postList.length > limitPost ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;
    console.log('postlist', 1)

    return (
        <>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={postList.slice(0, limitPost)}
                renderItem={item => {
                    return (
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <Post post={item} fetchData={fetchData} />
                        </Skeleton>
                    )
                }}
                style={{ marginBottom: '20px' }}
            />

            {/* <Row justify="center" style={{ display: 'flex', flexDirection: 'column', justify: 'center' }}>
                {postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post, idx) => <Post key={idx} post={post} fetchData={fetchData} />)}
            </Row> */}
        </>

    )
}

export default PostList;