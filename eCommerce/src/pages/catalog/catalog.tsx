import React from 'react';
import { Heading } from '../../components/heading/heading';
import { Section } from '../../components/section/section';

export const Catalog = (): React.ReactNode => {
  return (
    <Section className="heading-content">
      <Heading tag="h1" content="All Products" />
    </Section>
  );
};
