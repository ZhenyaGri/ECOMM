import './wrapper.css';
import React, { Component } from 'react';
import { BaseProps } from '../../types/types';

export class Wrapper extends Component<BaseProps> {
  render(): React.ReactNode {
    const { children, className } = this.props;
    const completeClassName = className ? `wrapper ${className}` : 'wrapper';

    return <div className={completeClassName}>{children}</div>;
  }
}
