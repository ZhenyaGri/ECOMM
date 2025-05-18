import React, { Component } from 'react';
import { headingProps } from '../../types/types';

export class Heading extends Component<headingProps> {
  render(): React.ReactNode {
    const { tag, className, content } = this.props;
    const completeClassName = className ? `heading ${className}` : 'heading';

    if (tag === 'h2') {
      return <h2 className={completeClassName}>{content}</h2>;
    }

    if (tag === 'h3') {
      return <h3 className={completeClassName}>{content}</h3>;
    }

    if (tag === 'h4') {
      return <h4 className={completeClassName}>{content}</h4>;
    }
  }
}
