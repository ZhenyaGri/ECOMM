import './text.css';
import React, { Component } from 'react';

type textProps = {
  className?: string;
  content: string;
};

export class Text extends Component<textProps> {
  render(): React.ReactNode {
    const { className, content } = this.props;
    const completeClassName = className ? `text ${className}` : 'text';

    return <p className={completeClassName}>{content}</p>;
  }
}
