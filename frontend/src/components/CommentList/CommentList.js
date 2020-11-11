import { Row } from 'antd'
import React from 'react'
import Comment from '../Comment/Comment'
import CreateComment from './CreateComment'

function CommentList({ commentList, postId, fetchData }) {
    return (
        <>
            <Row style={{ width: '100%' }}>

                {commentList.map(comment =>
                    <Comment
                        key={comment.id}
                        fetchData={fetchData}
                        id={comment.id}
                        writer={comment.User}
                        content={comment.comment}
                    />)}
            </Row>
            <Row align="middle" style={{ width: '100%' }}>
                <CreateComment fetchData={fetchData} postId={postId} />
            </Row >
        </>
    )
}

export default CommentList
