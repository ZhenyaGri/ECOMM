import './list.css';
import React, { Component } from 'react';

export type ListProps = {
  children: React.ReactNode;
  className?: string;
};

export class List extends Component<ListProps> {
  render(): React.ReactNode {
    const { children, className } = this.props;
    const completeClassName = className ? `list ${className}` : 'list';

    return <ul className={completeClassName}>{children}</ul>;
  }
}
