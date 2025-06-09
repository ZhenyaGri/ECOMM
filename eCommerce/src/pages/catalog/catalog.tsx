import { CatalogToolbar } from '../../components/CatalogToolbar/CatalogToolbar';
import { Heading } from '../../components/heading/heading';
import { Section } from '../../components/section/section';
import house from '../../assets/img/house.jpg';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Text } from '../../components/text/text';
import { useEffect, useState } from 'react';
import {
  fetchProductsWithFacets,
  getPublishedProducts,
} from '../../api/productsService';
import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '../../api/productsType';
import { Link } from 'react-router-dom';

interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  urlSlug: string;
  discount: number;
}

export const Catalog = (): React.ReactNode => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatProducts = (
    response: ProductProjectionPagedQueryResponse
  ): CatalogProduct[] => {
    return response.results.map((product: ProductProjection) => {
      let discount = 0;
      const priceVariant = product.masterVariant || product.variants?.[0];
      const priceValue = priceVariant?.prices?.[0]?.value;
      if (priceVariant.prices?.[0]?.discounted?.value.centAmount) {
        discount = priceVariant.prices?.[0]?.discounted?.value.centAmount / 100;
      }
      const price = priceValue?.centAmount ? priceValue.centAmount / 100 : 0;

      const imageVariant = product.masterVariant || product.variants?.[0];
      const imageUrl = imageVariant?.images?.[0]?.url || house;
      const urlSlug = product.slug.en || product.id;

      return {
        id: product.id,
        name: product.name?.en || 'Unnamed Product',
        price,
        imageUrl,
        urlSlug,
        discount,
      };
    });
  };

  const handleFacetFilter = async (newFilters: string[]): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetchProductsWithFacets(newFilters);
      setProducts(formatProducts(response));
    } catch (err) {
      setError('Failed to filter products. Please try again later.');
      console.error('Error filtering products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async (params = { limit: 30 }): Promise<void> => {
      try {
        setLoading(true);
        const response: ProductProjectionPagedQueryResponse =
          await getPublishedProducts(params);
        setProducts(formatProducts(response));
        console.log(response);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductsSorted = (
    response: ProductProjectionPagedQueryResponse
  ): void => {
    setProducts(formatProducts(response));
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
          onProductsSorted={handleProductsSorted}
          onFacetFilter={handleFacetFilter}
        />
        <Wrapper className="products-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              urlSlug={product.urlSlug}
              discount={product.discount}
            />
          ))}
        </Wrapper>
      </Section>
    </main>
  );
};
