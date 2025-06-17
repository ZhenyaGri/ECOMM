import { useCallback, useEffect, useState } from 'react';
import { UsePaginationReturn } from '../../types/types';
import { useSearchParams } from 'react-router-dom';
import { pageLimit } from '../../pages/catalog/constants';

export const usePagination = (
  initialPage = 1,
  totalItems = 0
): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = Number(searchParams.get('page'));
  const pageSize = pageLimit;

  const updateURL = (page: number): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    setSearchParams(newParams, { replace: true });
  };

  const [pagination, setPagination] = useState({
    currentPage: urlPage || initialPage,
    pageSize: pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize) || 1,
  });

  const setTotalItems = useCallback((total: number) => {
    setPagination((prev) => ({ ...prev, totalItems: total }));
  }, []);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
      updateURL(newPage);
    }
  };

  useEffect(() => {
    const newTotalPages =
      Math.ceil(pagination.totalItems / pagination.pageSize) || 1;
    setPagination((prev) => ({
      ...prev,
      totalPages: newTotalPages,
      currentPage: Math.min(prev.currentPage, newTotalPages),
    }));
  }, [pagination.totalItems, pagination.pageSize]);

  useEffect(() => {
    const urlPage = Number(searchParams.get('page'));
    if (urlPage && urlPage !== pagination.currentPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: urlPage,
      }));
    }
  }, [pagination.currentPage, searchParams]);

  return {
    ...pagination,
    handlePageChange,
    setTotalItems,
  };
};
