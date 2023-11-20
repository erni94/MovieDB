import React from 'react';
import { Pagination } from 'antd';

const CustomPagination = ({ currentPage, totalPage, onChangePage }) => {
    const handlePageChange = (page) => {
        onChangePage(page);
    };

    return (
        <div>
            <Pagination
                current={currentPage}
                total ={totalPage}
                onChange={handlePageChange}
                pageSize={1}
                showSizeChanger={false}
            />
        </div>
    );
};

export default CustomPagination;
