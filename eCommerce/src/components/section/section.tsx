import React, { Component } from 'react';
import { BaseProps } from '../../types/types';

export class Section extends Component<BaseProps> {
  render(): React.ReactNode {
    const { className, children } = this.props;
    const completeClassName = className ? `section ${className}` : 'section';

    return <section className={completeClassName}>{children}</section>;
  }
}
