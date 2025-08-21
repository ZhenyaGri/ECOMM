import React, { useContext } from 'react';
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
import { CartContext } from '../../context/types';
import { useCart } from '../../context/useCart';

type HeaderProps = {
  isLoggedIn: boolean;
  onLogIn: () => void;
  onSignUp: () => void;
  onLogOut: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  onLogIn,
  onSignUp,
  onLogOut,
}) => {
  const { cartCount } = useContext(CartContext);
  const { clearCart } = useCart();

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
          <Link to="/cart" className="link-icon link-cart">
            <Img className="header-icon" src={iconBag} alt="Bag Icon" />
            <span className="text">({cartCount})</span>
          </Link>
          <Link
            to="/profile"
            className={`link-icon ${isLoggedIn ? '' : 'link-hidden'}`}
          >
            <Img className="header-icon" src={iconProfile} alt="Profile Icon" />
          </Link>
        </Wrapper>
        <Link to="/login" className={`${isLoggedIn ? 'hidden' : ''}`}>
          <Button className="btn-light" type="button" onClick={onLogIn}>
            Log In
          </Button>
        </Link>
        <Link to="/registration" className={`${isLoggedIn ? 'hidden' : ''}`}>
          <Button className="btn-light" type="button" onClick={onSignUp}>
            Sign Up
          </Button>
        </Link>
        <Button
          className={`btn-light ${isLoggedIn ? '' : 'hidden'}`}
          type="button"
          onClick={() => {
            onLogOut();
            clearCart();
          }}
        >
          Log Out
        </Button>
      </Wrapper>
    </header>
  );
};
