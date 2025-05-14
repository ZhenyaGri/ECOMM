import React, { Component } from 'react';
import { ListProps } from './list';

export class ListItem extends Component<ListProps> {
  render(): React.ReactNode {
    return <li className="list-item">{this.props.children}</li>;
  }
}
