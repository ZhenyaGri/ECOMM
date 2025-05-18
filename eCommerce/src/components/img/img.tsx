import React, { Component } from 'react';
import { ImgProps } from '../../types/types';

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
