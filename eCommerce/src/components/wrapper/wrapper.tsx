import React, { Component } from 'react';

type wrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

export class Wrapper extends Component<wrapperProps> {
  render(): React.ReactNode {
    const { children, className } = this.props;
    const completeClassName = className ? `wrapper ${className}` : 'wrapper';

    return <div className={completeClassName}>{children}</div>;
  }
}
