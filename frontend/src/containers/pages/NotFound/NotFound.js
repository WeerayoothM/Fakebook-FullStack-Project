import React from 'react'
import { Empty, Row } from 'antd';

function NotFound() {
    return (
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
            <Empty description="404 NotFound" />
        </Row>
    )
}

export default NotFound
