import './button.css';
import React, { Component } from 'react';
import { ButtonProps } from '../../types/types';

export class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    const { type, text, className } = this.props;
    const completeClassName = className ? `btn ${className}` : 'btn';

    return (
      <button className={completeClassName} type={type}>
        {text}
      </button>
    );
  }
}
