import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Section } from '../../components/section/section';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Heading } from '../../components/heading/heading';
import { Text } from '../../components/text/text';
import { Button } from '../../components/button/button';
import testImg from '../../assets/img/table-and-lamp.jpg';
import testImg2 from '../../assets/img/modular-sofa.jpg';
import { ImgSlider } from '../../components/slider/slider';
import { getProductById } from '../../api/productsService';
import { ProductProjection, ProductVariant } from '../../api/productsType';
import { Link } from 'react-router-dom';

export const ProductPage = (): React.ReactNode => {
  const location = useLocation();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productFromState?.id) {
      setError('Product ID missing');
      setLoading(false);
      return;
    }

    async function fetchProduct(): Promise<void> {
      try {
        setLoading(true);
        const fullProduct = await getProductById(productFromState.id);
        setProduct(fullProduct);
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productFromState?.id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Oops! Product not found</p>;
  }

  const variant: ProductVariant =
    product.masterVariant || product.variants?.[0];
  const images = variant?.images?.map((img) => img.url) || [];
  const price = variant?.prices?.[0]?.value?.centAmount
    ? variant.prices[0].value.centAmount / 100
    : 0;
  const annotation = product.description?.en || '';

  return (
    <Section className="section-product">
      <Wrapper className="wrapper-breadcrumbs">
        <Link to="/" className="link-breadcrumbs">
          <Text className="breadcrumbs" content="Main" />
        </Link>
        <Text className="breadcrumbs" content=">" />
        <Link to="/catalog" className="link-breadcrumbs">
          <Text className="breadcrumbs" content="Shop" />
        </Link>
        <Text className="breadcrumbs" content=">" />
        <Text
          className="breadcrumbs breadcrumbs-active"
          content={product.name?.en}
        />
      </Wrapper>
      <Wrapper className="wrapper-product">
        <ImgSlider imgUrls={images.length > 0 ? images : [testImg, testImg2]} />
        <Wrapper className="wrapper-product-info">
          <h1 className="heading heading-primary">{product.name?.en}</h1>
          <Text className="price-text" content={`€ ${price.toFixed(2)}`} />
          <Wrapper className="wrapper-add-button">
            <label>
              <input
                className="product-count"
                type="number"
                name="quantity"
                min="1"
                placeholder="1"
              />
            </label>
            <Button
              className="btn-dark btn-product"
              type="button"
              children="Add to cart"
            />
          </Wrapper>
          {variant.attributes?.slice(2).map((attr) => (
            <Wrapper className="wrapper-product-text">
              <Heading
                tag="h2"
                className="heading-product"
                content={`${attr.name}`}
              />
              <Text className="product-text" content={`${attr.value}`} />
            </Wrapper>
          ))}
          <Wrapper className="wrapper-product-text">
            <Text className="product-text" content={`${annotation}`} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Section>
  );
};
