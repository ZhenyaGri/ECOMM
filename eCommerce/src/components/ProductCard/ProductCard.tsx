import React from 'react';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Product } from '../../types/types';
import { Heading } from '../heading/heading';

export const ProductCard: React.FC<Product> = ({
  name,
  price,
  imageUrl,
  discount = 0,
}) => {
  return (
    <div className="product-card">
      <Wrapper className="wrapper-catalog-img">
        <Img src={imageUrl} alt={name} className="product-card" />
      </Wrapper>
      <Wrapper className="product-card-info">
        <Heading
          tag="h3"
          className="product-card-name"
          content={name.toUpperCase()}
        ></Heading>
        <Heading
          tag="h3"
          className="product-card-price"
          content={`€${price.toFixed(2) || discount}`}
        ></Heading>
      </Wrapper>
    </div>
  );
};
