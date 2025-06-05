import { CatalogToolbar } from '../../components/CatalogToolbar/CatalogToolbar';
import { Heading } from '../../components/heading/heading';
import { Section } from '../../components/section/section';
import house from '../../assets/img/house.jpg';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Wrapper } from '../../components/wrapper/wrapper';
import { useEffect, useState } from 'react';
import { getPublishedProducts } from '../../api/productsService';
import {
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '../../api/productsType';

interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  urlSlug: string;
}

export const Catalog = (): React.ReactNode => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatProducts = (
    response: ProductProjectionPagedQueryResponse
  ): CatalogProduct[] => {
    return response.results.map((product: ProductProjection) => {
      const priceVariant = product.masterVariant || product.variants?.[0];
      const priceValue = priceVariant?.prices?.[0]?.value;
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
      };
    });
  };

  useEffect(() => {
    const fetchProducts = async (params = { limit: 30 }): Promise<void> => {
      try {
        setLoading(true);
        const response: ProductProjectionPagedQueryResponse =
          await getPublishedProducts(params);
        setProducts(formatProducts(response));
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
        <Heading tag="h1" content="All Products" />
      </Section>
      <Section className="section-products">
        <CatalogToolbar onProductsSorted={handleProductsSorted} />
        <Wrapper className="products-container">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              urlSlug={product.urlSlug}
            />
          ))}
        </Wrapper>
      </Section>
    </main>
  );
};
