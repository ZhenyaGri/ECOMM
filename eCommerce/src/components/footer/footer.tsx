import './footer.css';
import React, { Component } from 'react';
import { Wrapper } from '../wrapper/wrapper';
import { Heading } from '../heading/heading';
import { Img } from '../img/img';
import { Text } from '../text/text';

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
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Customer Service"
            />
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Professionals"
            />
          </Wrapper>
          <Wrapper className="wrapper-footer-item">
            <Heading
              tag="h4"
              className="heading-quaternary"
              content="Newsletter"
            />
          </Wrapper>
        </Wrapper>
        <Wrapper className="footer-contacts">
          <Img
            className="footer-logo"
            src="../src/assets/icons/audo-logo.svg"
            alt="Audo Logo"
          />
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
