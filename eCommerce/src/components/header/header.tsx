import React, { Component } from 'react';
import { Nav } from '../nav/nav';
import { Link } from '../link/link';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Button } from '../button/button';
import logoAudo from '../../assets/icons/audo-logo.svg';
import iconSearch from '../../assets/icons/icon-search.svg';
import iconBag from '../../assets/icons/icon-bag.svg';

type HeaderProps = {
  onLogIn: () => void;
  onSignUp: () => void;
};

export class Header extends Component<HeaderProps> {
  render(): React.ReactNode {
    const { onLogIn, onSignUp } = this.props;
    return (
      <header className="header">
        <h1 className="hidden">Audo: Online Furniture Store</h1>
        <Nav />
        <Link href="#" className="link-logo">
          <Img className="header-logo" src={logoAudo} alt="Audo Logo" />
        </Link>
        <Wrapper className="wrapper-header">
          <Wrapper className="wrapper-icons">
            <Link href="#" className="link-icon">
              <Img className="header-icon" src={iconSearch} alt="Search Icon" />
            </Link>
            <Link href="#" className="link-icon">
              <Img className="header-icon" src={iconBag} alt="Bag Icon" />
            </Link>
          </Wrapper>
          <Link href="#">
            <Button
              className="btn-light"
              type="button"
              children="Log In"
              onClick={onLogIn}
            />
          </Link>
          <Link href="#">
            <Button
              className="btn-light"
              type="button"
              children="Sign Up"
              onClick={onSignUp}
            />
          </Link>
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
