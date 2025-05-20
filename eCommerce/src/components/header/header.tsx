import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../nav/nav';
import { AnchorLink } from '../link/link';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Button } from '../button/button';
import logoAudo from '../../assets/icons/audo-logo.svg';
import iconSearch from '../../assets/icons/icon-search.svg';
import iconBag from '../../assets/icons/icon-bag.svg';

export class Header extends Component {
  render(): React.ReactNode {
    return (
      <header className="header">
        <h1 className="hidden">Audo: Online Furniture Store</h1>
        <Nav />
        <Link to="/" className="link-logo">
          <Img className="header-logo" src={logoAudo} alt="Audo Logo" />
        </Link>
        <Wrapper className="wrapper-header">
          <Wrapper className="wrapper-icons">
            <AnchorLink href="#" className="link-icon">
              <Img className="header-icon" src={iconSearch} alt="Search Icon" />
            </AnchorLink>
            <AnchorLink href="#" className="link-icon">
              <Img className="header-icon" src={iconBag} alt="Bag Icon" />
            </AnchorLink>
          </Wrapper>
          <AnchorLink href="#">
            <Button className="btn-light" type="button" children="Log In" />
          </AnchorLink>
          <AnchorLink href="#">
            <Button className="btn-light" type="button" children="Sign Up" />
          </AnchorLink>
          <Button
            className="btn-light hidden"
            type="button"
            children="Log Out"
          />
        </Wrapper>
      </header>
    );
  }
}
