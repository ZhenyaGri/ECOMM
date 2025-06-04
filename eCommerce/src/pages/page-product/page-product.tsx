import React, { Component } from 'react';
import { Section } from '../../components/section/section';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Heading } from '../../components/heading/heading';
import { Text } from '../../components/text/text';
import { Button } from '../../components/button/button';
import { text } from './product-text';
import testImg from '../../assets/img/table-and-lamp.jpg';
import testImg2 from '../../assets/img/modular-sofa.jpg';
import testImg3 from '../../assets/img/wall-lamp.jpg';
import { ImgSlider } from '../../components/slider/slider';

const imagesArr = [testImg, testImg2, testImg3];

export class ProductPage extends Component {
  render(): React.ReactNode {
    return (
      <Section className="section-product">
        <Wrapper className="wrapper-product">
          <ImgSlider imgUrls={imagesArr} />
          <Wrapper className="wrapper-product-info">
            <h1 className="heading heading-primary">Reverse Wall Lamp</h1>
            <Text className="price-text" content="€375" />
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
            <Wrapper className="wrapper-product-text">
              <Heading
                tag="h2"
                className="heading-product"
                content="Materials"
              />
              <Text
                className="product-text"
                content="Travertine base with bronzed brass shade in aluminium. Plastic diffuser and inner parts"
              />
            </Wrapper>
            <Wrapper className="wrapper-product-text">
              <Heading
                tag="h2"
                className="heading-product"
                content="Dimensions"
              />
              <Text
                className="product-text"
                content="D: 15,7 cm; W: 12 cm; Ø: 24,3 cm"
              />
            </Wrapper>
            <Wrapper className="wrapper-product-text">
              <Text className="product-text" content={text} />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Section>
    );
  }
}
