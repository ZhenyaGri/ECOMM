import React, { Component } from 'react';
import { BaseProps } from '../../types/types';

export class List extends Component<BaseProps> {
  render(): React.ReactNode {
    const { children, className } = this.props;
    const completeClassName = className ? `list ${className}` : 'list';

    return <ul className={completeClassName}>{children}</ul>;
  }
}
