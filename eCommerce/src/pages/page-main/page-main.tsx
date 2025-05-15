import React, { Component } from 'react';
import { Section } from '../../components/section/section';
import { Wrapper } from '../../components/wrapper/wrapper';
import { Heading } from '../../components/heading/heading';
import { Link } from '../../components/link/link';
import { Img } from '../../components/img/img';
import { Text } from '../../components/text/text';
import lampAndTable from '../../assets/img/table-and-lamp.jpg';
import lampOnWall from '../../assets/img/wall-lamp.jpg';
import seating from '../../assets/img/main-seating.jpg';
import tables from '../../assets/img/main-tables.jpg';
import lighting from '../../assets/img/main-lighting.jpg';
import accessories from '../../assets/img/main-accessories.jpg';
import floorLamp from '../../assets/img/new-items.jpg';
import house from '../../assets/img/house.jpg';
import sofa from '../../assets/img/modular-sofa.jpg';
import { collectionText } from './main-text-data';
import { newItemsText } from './main-text-data';
import { audoHouseText } from './main-text-data';

export class Main extends Component {
  render(): React.ReactNode {
    return (
      <main className="main">
        <Section className="section-hero">
          <Wrapper className="wrapper-hero">
            <Heading
              tag="h2"
              className="heading-secondary heading-light"
              content="Pavot Collection"
            />
            <Link href="#" className="link-hero">
              Explore the collection
            </Link>
          </Wrapper>
        </Section>
        <Section className="section-collection">
          <Wrapper className="wrapper-collection">
            <Wrapper className="wrapper-img">
              <Img
                className="collection-img"
                src={lampAndTable}
                alt="Table And Lamp"
              />
            </Wrapper>
            <Wrapper className="wrapper-img">
              <Img className="collection-img" src={lampOnWall} alt="Lamp" />
            </Wrapper>
            <Wrapper className="wrapper-collection-text">
              <Heading
                tag="h3"
                className="heading-tertiary"
                content="Reverse Collection"
              />
              <Text className="collection-text" content={collectionText} />
              <Link href="#" className="link-collection">
                Discover the Reverse Collection
              </Link>
            </Wrapper>
          </Wrapper>
        </Section>
        <Section className="section-shop">
          <Heading
            tag="h2"
            className="heading-secondary"
            content="Shop by category"
          />
          <Wrapper className="wrapper-shop">
            <Link className="link-shop" href="#">
              <Wrapper className="wrapper-shop-img">
                <Heading
                  tag="h3"
                  className="heading-tertiary heading-shop"
                  content="Seating"
                />
                <Img className="shop-img" src={seating} alt="Chair" />
              </Wrapper>
            </Link>
            <Wrapper className="wrapper-shop-img">
              <Heading
                tag="h3"
                className="heading-tertiary heading-shop"
                content="Tables"
              />
              <Img className="shop-img" src={tables} alt="Tables" />
            </Wrapper>
            <Wrapper className="wrapper-shop-img">
              <Heading
                tag="h3"
                className="heading-tertiary heading-shop"
                content="Lighting"
              />
              <Img className="shop-img" src={lighting} alt="Lighting" />
            </Wrapper>
            <Wrapper className="wrapper-shop-img">
              <Heading
                tag="h3"
                className="heading-tertiary heading-shop"
                content="Accessories"
              />
              <Img className="shop-img" src={accessories} alt="Accessories" />
            </Wrapper>
          </Wrapper>
        </Section>
        <Section className="section-banner">
          <Wrapper className="wrapper-banner">
            <Link href="#" className="link-hero">
              Tap to unfold
            </Link>
          </Wrapper>
        </Section>
        <Section className="section-new-items">
          <Wrapper className="wrapper-new-items">
            <Wrapper className="wrapper-new-items-img">
              <Img className="new-items-img" src={floorLamp} alt="Floor Lamp" />
            </Wrapper>
            <Wrapper className="wrapper-new-items-text">
              <Heading
                tag="h3"
                className="heading-tertiary"
                content="Introducing Red Travertine"
              />
              <Text className="collection-text" content={newItemsText} />
              <Link href="#" className="link-collection">
                Discover the JWDA collection
              </Link>
            </Wrapper>
          </Wrapper>
        </Section>
        <Section className="section-house">
          <Wrapper className="wrapper-house">
            <Wrapper className="wrapper-house-text">
              <Heading
                tag="h3"
                className="heading-tertiary"
                content="Audo House"
              />
              <Text className="collection-text" content={audoHouseText} />
              <Link href="#" className="link-collection">
                Explore upcoming events
              </Link>
            </Wrapper>
            <Wrapper className="wrapper-house-img">
              <Img className="house-img" src={house} alt="Interior" />
            </Wrapper>
            <Wrapper className="wrapper-house-img">
              <Img className="house-img" src={sofa} alt="Sofa" />
            </Wrapper>
          </Wrapper>
        </Section>
      </main>
    );
  }
}
