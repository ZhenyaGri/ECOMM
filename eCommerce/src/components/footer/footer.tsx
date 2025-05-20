import React, { Component } from 'react';
import { Wrapper } from '../wrapper/wrapper';
import { Heading } from '../heading/heading';
import { Img } from '../img/img';
import { Text } from '../text/text';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { newsletter } from './footer-data';
import { Button } from '../button/button';
import { Link } from '../link/link';
import logoFacebook from '../../assets/icons/logo-facebook.svg';
import logoInstagram from '../../assets/icons/logo-instagram.svg';
import logoPinterest from '../../assets/icons/logo-pinterest.svg';
import logoAudo from '../../assets/icons/audo-logo.svg';

export class Footer extends Component {
  render(): React.ReactNode {
    return (
      <footer className="footer">
        <Wrapper className="footer-links">
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Company"
            />
            <List className="footer-list">
              <ListItem>About Audo</ListItem>
              <ListItem>Career</ListItem>
              <ListItem>Contact</ListItem>
              <ListItem>Cookie Policy</ListItem>
              <ListItem>Declaration</ListItem>
              <ListItem>Our Responsibility</ListItem>
              <ListItem>Whistleblower Platform</ListItem>
            </List>
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Customer Service"
            />
            <List className="footer-list">
              <ListItem>Store Locator</ListItem>
              <ListItem>Visit us</ListItem>
              <ListItem>Shipping Policy</ListItem>
              <ListItem>Return Policy</ListItem>
              <ListItem>Terms and Conditions</ListItem>
              <ListItem>Care Instructions</ListItem>
            </List>
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Professionals"
            />
            <List className="footer-list">
              <ListItem>B2B Online Portal</ListItem>
              <ListItem>Upholstery Program</ListItem>
              <ListItem>2D, 3D & Revit Files</ListItem>
            </List>
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Newsletter"
            />
            <Text className="footer-text" content={newsletter} />
            <Button className="btn-dark" type="button" children="Subscribe" />
            <Wrapper className="footer-icons">
              <Link href="https://www.facebook.com/">
                <Img
                  className="footer-icon"
                  src={logoFacebook}
                  alt="Facebook Logo"
                />
              </Link>
              <Link href="https://www.instagram.com/">
                <Img
                  className="footer-icon"
                  src={logoInstagram}
                  alt="Instagram Logo"
                />
              </Link>
              <Link href="https://www.pinterest.com/">
                <Img
                  className="footer-icon"
                  src={logoPinterest}
                  alt="Pinterest Logo"
                />
              </Link>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper className="footer-contacts">
          <Img className="footer-logo" src={logoAudo} alt="Audo Logo" />
          <Text
            className="footer-address"
            content="Audo A/S, Aarhusgade 130, Floor 1, 2150 Nordhavn, Denmark"
          />
          <Text
            className="footer-address"
            content="CVR: 15214236, info@audocph.com"
          />
        </Wrapper>
      </footer>
    );
  }
}
