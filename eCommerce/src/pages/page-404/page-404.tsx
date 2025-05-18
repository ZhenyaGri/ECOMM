import React, { Component } from 'react';
import { Section } from '../../components/section/section';
import { Text } from '../../components/text/text';
import { Heading } from '../../components/heading/heading';
import { Link } from '../../components/link/link';
import { Button } from '../../components/button/button';
import { Wrapper } from '../../components/wrapper/wrapper';

export class Page404 extends Component {
  render(): React.ReactNode {
    return (
      <Section className="section-404">
        <Wrapper className="wrapper-404">
          <Text className="accent-text" content="oops..." />
          <Heading
            tag="h2"
            className="heading-secondary"
            content="Page not found"
          />
          <Text content="The page you're looking for cannot be found." />
          <Link href="#">
            <Button
              className="btn btn-dark"
              type="button"
              text="Continue browsing"
            />
          </Link>
        </Wrapper>
      </Section>
    );
  }
}
