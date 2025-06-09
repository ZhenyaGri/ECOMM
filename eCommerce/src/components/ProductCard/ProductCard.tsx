import React from 'react';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Product } from '../../types/types';
import { Heading } from '../heading/heading';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  imageUrl,
  urlSlug,
  discount,
}) => {
  return (
    <Link
      to={`/catalog/${urlSlug}`}
      className="link-catalog-card"
      state={{ product: { id, name, price, imageUrl } }}
    >
      <div className="product-card">
        <Wrapper className="wrapper-catalog-img">
          <Img src={imageUrl} alt={name} className="product-card" />
        </Wrapper>
        <Wrapper className="product-card-info">
          <Heading
            tag="h3"
            className="product-card-name"
            content={name.toUpperCase()}
          />
          <Wrapper>
            {discount && discount !== 0 ? (
              <Heading
                tag="h2"
                className="product-card-discount"
                content={`€ ${discount.toFixed(2)}`}
              />
            ) : null}
            <Heading
              tag="h3"
              className="product-card-price"
              content={`€ ${price.toFixed(2)}`}
            />
          </Wrapper>
        </Wrapper>
      </div>
    </Link>
  );
};
