import { CatalogToolbar } from '../../components/CatalogToolbar/CatalogToolbar';
import { Heading } from '../../components/heading/heading';
import { Section } from '../../components/section/section';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Text } from '../../components/text/text';
import { useEffect, useState } from 'react';
import {
  fetchProductsWithFacets,
  getPublishedProducts,
} from '../../api/productsService';
import { ProductProjectionPagedQueryResponse } from '../../api/productsType';
import { Link } from 'react-router-dom';
import { CatalogProduct, pageLimit } from './constants';
import { Pagination } from '../../components/pagination/Pagination';
import { usePagination } from '../../components/pagination/usePagination';
import { formatProducts } from './catalogUtils';

export const Catalog = (): React.ReactNode => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentPage, pageSize, totalPages, handlePageChange, setTotalItems } =
    usePagination(1, pageLimit);

  const handleFacetFilter = async (newFilters: string[]): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetchProductsWithFacets(newFilters, {
        limit: pageLimit,
      });
      setProducts(formatProducts(response, setTotalItems));
    } catch (err) {
      setError('Failed to filter products. Please try again later.');
      console.error('Error filtering products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async (
      params = { limit: pageLimit }
    ): Promise<void> => {
      try {
        setLoading(true);
        const response: ProductProjectionPagedQueryResponse =
          await getPublishedProducts({
            ...params,
            limit: pageLimit,
            offset: (currentPage - 1) * pageSize,
          });
        setProducts(formatProducts(response, setTotalItems));
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, setTotalItems]);

  const handleProductsSorted = (
    response: ProductProjectionPagedQueryResponse
  ): void => {
    setProducts(formatProducts(response, setTotalItems));
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="main">
      <Section className="heading-content">
        <Wrapper className="wrapper-breadcrumbs">
          <Link to="/" className="link-breadcrumbs">
            <Text className="breadcrumbs" content="Main" />
          </Link>
          <Text className="breadcrumbs" content=">" />
          <Text className="breadcrumbs breadcrumbs-active" content="Shop" />
        </Wrapper>
        <Heading tag="h1" content="All Products" />
      </Section>
      <Section className="section-products">
        <CatalogToolbar
          pageSize={pageSize}
          onProductsSorted={handleProductsSorted}
          onFacetFilter={handleFacetFilter}
        />
        <Wrapper className="products-container">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Wrapper>
      </Section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </main>
  );
};
