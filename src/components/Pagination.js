import React from 'react'
import Pagination from 'rc-pagination';

const PaginationComp = ({changePage, productCount, currentPage, limit}) => {
    return ( 
        <Pagination
        onChange={changePage}
        current={currentPage}
        total={productCount}
        pageSize={limit}
      />
    )
}

export default PaginationComp