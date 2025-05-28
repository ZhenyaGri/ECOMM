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
import iconProfile from '../../assets/icons/icon-profile.svg';

type HeaderProps = {
  isLoggedIn: boolean;
  onLogIn: () => void;
  onSignUp: () => void;
  onLogOut: () => void;
};

export class Header extends Component<HeaderProps> {
  render(): React.ReactNode {
    const { isLoggedIn, onLogIn, onSignUp, onLogOut } = this.props;
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
            <AnchorLink
              href="#"
              className={`link-icon ${isLoggedIn ? '' : 'link-hidden'}`}
            >
              <Img className="header-icon" src={iconProfile} alt="Bag Icon" />
            </AnchorLink>
          </Wrapper>
          <Link to="/login">
            <Button
              className={`btn-light ${isLoggedIn ? 'hidden' : ''}`}
              type="button"
              children="Log In"
              onClick={onLogIn}
            />
          </Link>
          <Link to="/registration">
            <Button
              className={`btn-light ${isLoggedIn ? 'hidden' : ''}`}
              type="button"
              children="Sign Up"
              onClick={onSignUp}
            />
          </Link>
          <Button
            className={`btn-light ${isLoggedIn ? '' : 'hidden'}`}
            type="button"
            children="Log Out"
            onClick={onLogOut}
          />
        </Wrapper>
      </header>
    );
  }
}
