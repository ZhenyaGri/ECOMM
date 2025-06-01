import { CatalogToolbar } from '../../components/CatalogToolbar/CatalogToolbar';
import { Heading } from '../../components/heading/heading';
import { Section } from '../../components/section/section';
import tables from '../../assets/img/main-tables.jpg';
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
}

export const Catalog = (): React.ReactNode => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        const response: ProductProjectionPagedQueryResponse =
          await getPublishedProducts(
            {
              limit: 30,
            },
            false
          );

        console.log(response);

        const formattedProducts = response.results.map(
          (product: ProductProjection) => {
            const priceVariant = product.masterVariant || product.variants?.[0];
            const priceValue = priceVariant?.prices?.[0]?.value;
            const price = priceValue?.centAmount
              ? priceValue.centAmount / 100
              : 0;
            const imageVariant = product.masterVariant || product.variants?.[0];
            const imageUrl = imageVariant?.images?.[0]?.url || tables;

            return {
              id: product.id,
              name: product.name?.en || 'Unnamed Product',
              price,
              imageUrl,
            };
          }
        );

        setProducts(formattedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <CatalogToolbar />
        <Wrapper className="products-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </Wrapper>
      </Section>
    </main>
  );
};
