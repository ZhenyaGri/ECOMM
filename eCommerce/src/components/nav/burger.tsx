import React, { Component } from 'react';
import { Button } from '../button/button';
import { Span } from '../span/span';
import { IBurgerProps } from '../../types/interfaces';

export class Burger extends Component<IBurgerProps> {
  render(): React.ReactNode {
    const { isOpen, toggleNav } = this.props;

    return (
      <Button
        className={`btn-burger${isOpen ? ' open' : ''}`}
        type="button"
        onClick={toggleNav}
      >
        <Span />
        <Span />
      </Button>
    );
  }
}
