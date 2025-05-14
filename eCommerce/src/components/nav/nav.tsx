import React, { Component } from 'react';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { Link } from '../link/link';

export class Nav extends Component {
  render(): React.ReactNode {
    return (
      <nav className="nav">
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
    );
  }
}
