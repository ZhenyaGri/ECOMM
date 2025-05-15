import './link.css';
import React, { Component } from 'react';
import { LinkProps } from '../../types/types';

export class Link extends Component<LinkProps> {
  render(): React.ReactNode {
    const { children, href, className } = this.props;
    const completeClassName = className ? `link ${className}` : 'link';

    return (
      <a className={completeClassName} href={href}>
        {children}
      </a>
    );
  }
}
