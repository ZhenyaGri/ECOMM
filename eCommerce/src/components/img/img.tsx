import React, { Component } from 'react';

type ImgProps = {
  className: string;
  src: string;
  alt: string;
};

export class Img extends Component<ImgProps> {
  render(): React.ReactNode {
    return (
      <img
        className={this.props.className}
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}
