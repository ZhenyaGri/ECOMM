import './button.css';
import React, { Component } from 'react';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  className?: string;
};

export class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    const { type, text, className } = this.props;
    const combinedClassName = className ? `btn ${className}` : 'btn';

    return (
      <button className={combinedClassName} type={type}>
        {text}
      </button>
    );
  }
}
