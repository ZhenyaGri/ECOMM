import React, { Component } from 'react';
import { BaseProps } from '../../types/types';

export class Span extends Component<BaseProps> {
  render(): React.ReactNode {
    return <span className="span">{this.props.children}</span>;
  }
}
