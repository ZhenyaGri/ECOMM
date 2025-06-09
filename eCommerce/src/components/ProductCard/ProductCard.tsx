import React, { useState } from 'react';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Product } from '../../types/types';
import { Heading } from '../heading/heading';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  imageUrls,
  urlSlug,
  discount,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSecondImage = imageUrls.length > 1;

  return (
    <Link
      to={`/catalog/${urlSlug}`}
      className="link-catalog-card"
      state={{ product: { id, name, price, imageUrls } }}
    >
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Wrapper className="wrapper-catalog-img">
          <Img
            src={isHovered && hasSecondImage ? imageUrls[1] : imageUrls[0]}
            alt={name}
            className="product-card"
          />
        </Wrapper>
        <Wrapper className="product-card-info">
          <Heading
            tag="h3"
            className="product-card-name"
            content={name.toUpperCase()}
          />
          <Wrapper className="product-card-price-container">
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
