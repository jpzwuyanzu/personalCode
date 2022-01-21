import React from 'react';
import { Divider, Pagination } from 'antd'

const PaginationCom = () => {
    return (
        <div>
            <h1>Pagination分页</h1>
            <Divider/>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    );
}

export default PaginationCom;
