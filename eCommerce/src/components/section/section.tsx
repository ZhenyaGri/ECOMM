import React, { Component } from 'react';

type sectionProps = {
  className?: string;
  children: React.ReactNode;
};

export class Section extends Component<sectionProps> {
  render(): React.ReactNode {
    const { className, children } = this.props;
    const completeClassName = className ? `section ${className}` : 'section';

    return <section className={completeClassName}>{children}</section>;
  }
}
