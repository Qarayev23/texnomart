import Pagination from 'rc-pagination';
import { PaginationProps } from '../../types';
import './pagination.scss';

const PaginationComp = ({ changePage, productCount, currentPage, limit }: PaginationProps) => {
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