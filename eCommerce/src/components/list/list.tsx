import './list.css';
import React, { Component } from 'react';

export type ListProps = {
  children: React.ReactNode;
};

export class List extends Component<ListProps> {
  render(): React.ReactNode {
    return <ul className="list">{this.props.children}</ul>;
  }
}
