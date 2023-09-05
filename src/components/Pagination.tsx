import Pagination from 'rc-pagination';

interface PaginationProps {
  changePage: (selected: number) => void
  productCount: number
  currentPage: number
  limit: number
}

const PaginationComp = ({changePage, productCount, currentPage, limit}: PaginationProps) => {
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