import React, { Component } from 'react';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { AnchorLink } from '../link/link';
import { Burger } from './burger';
import { INavState } from '../../types/interfaces';
import { Link } from 'react-router-dom';

export class Nav extends Component<{ state?: boolean }, INavState> {
  state: INavState = {
    isOpen: false,
  };

  toggleNav = (): void => {
    this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  };

  closeNav = (): void => {
    this.setState({ isOpen: false });
  };

  render(): React.ReactNode {
    const { isOpen } = this.state;
    return (
      <>
        <Burger isOpen={isOpen} toggleNav={this.toggleNav} />
        <nav className={`nav${isOpen ? ' open' : ''}`}>
          <List>
            <ListItem>
              <Link to="/catalog" className="link" onClick={this.closeNav}>
                Shop
              </Link>
            </ListItem>
            <ListItem>
              <AnchorLink children="Inspiration" href="#" />
            </ListItem>
            <ListItem>
              <AnchorLink children="Audo House" href="#" />
            </ListItem>
            <ListItem>
              <AnchorLink children="Samples" href="#" />
            </ListItem>
            <ListItem>
              <AnchorLink children="Professionals" href="#" />
            </ListItem>
          </List>
        </nav>
      </>
    );
  }
}
