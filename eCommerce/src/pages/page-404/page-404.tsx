import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/section/section';
import { Text } from '../../components/text/text';
import { Heading } from '../../components/heading/heading';
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
          <Link to="/">
            <Button
              className="btn btn-dark"
              type="button"
              children="Continue browsing"
            />
          </Link>
        </Wrapper>
      </Section>
    );
  }
}
