import React, { Component } from 'react';
import { BaseProps } from '../../types/types';

export class ListItem extends Component<BaseProps> {
  render(): React.ReactNode {
    return <li className="list-item">{this.props.children}</li>;
  }
}
