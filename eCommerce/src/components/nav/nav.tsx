import React, { Component } from 'react';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { Link } from '../link/link';
import { Burger } from './burger';
import { INavState } from '../../types/interfaces';

export class Nav extends Component<{ state?: boolean }, INavState> {
  state: INavState = {
    isOpen: false,
  };

  toggleNav = (): void => {
    this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  };

  render(): React.ReactNode {
    const { isOpen } = this.state;
    return (
      <>
        <Burger isOpen={isOpen} toggleNav={this.toggleNav} />
        <nav className={`nav${isOpen ? ' open' : ''}`}>
          <List>
            <ListItem>
              <Link children="Shop" href="#" />
            </ListItem>
            <ListItem>
              <Link children="Inspiration" href="#" />
            </ListItem>
            <ListItem>
              <Link children="Audo House" href="#" />
            </ListItem>
            <ListItem>
              <Link children="Samples" href="#" />
            </ListItem>
            <ListItem>
              <Link children="Professionals" href="#" />
            </ListItem>
          </List>
        </nav>
      </>
    );
  }
}
