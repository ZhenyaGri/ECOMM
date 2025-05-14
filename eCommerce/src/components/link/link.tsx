import './link.css';
import React, { Component } from 'react';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

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
