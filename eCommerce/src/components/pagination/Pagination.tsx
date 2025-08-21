import { PaginationControlsProps } from '../../types/types';
import { Button } from '../button/button';
import { Wrapper } from '../wrapper/wrapper';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps): React.ReactNode => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Wrapper className="pagination">
      <Button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="btn-pagination"
        children="<"
      ></Button>

      {visiblePages.map((page, index) => (
        <Button
          type="button"
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`btn-pagination ${currentPage === page ? 'active' : ''}`}
          disabled={page === '...'}
          aria-current={currentPage === page ? 'page' : undefined}
          children={page}
        ></Button>
      ))}

      <Button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="btn-pagination"
        children=">"
      ></Button>
    </Wrapper>
  );
};

const getVisiblePages = (
  current: number,
  total: number
): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current < 5) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current > total - 4) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
};
