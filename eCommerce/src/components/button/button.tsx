import React, { Component } from 'react';
import { ButtonProps } from '../../types/types';

export class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    const { type, className, children, onClick } = this.props;
    const completeClassName = className ? `btn ${className}` : 'btn';

    return (
      <button className={completeClassName} type={type} onClick={onClick}>
        {children}
      </button>
    );
  }
}
