import React, { Component } from 'react';
import { Section } from '../../components/section/section';
import { Wrapper } from '../../components/wrapper/wrapper';
import { AnchorLink } from '../../components/link/link';
import { Img } from '../../components/img/img';
import rsschool from '../../assets/icons/logo-rsschool.svg';
import github from '../../assets/icons/logo-github.svg';
import { Heading } from '../../components/heading/heading';
import { Text } from '../../components/text/text';
import { lorem } from './lorem-ipsum';

export class AboutUs extends Component {
  render(): React.ReactNode {
    return (
      <Section className="section-about-us">
        <Wrapper className="wrapper-collaboration">
          <Text className="collaboration-text" content={lorem} />
        </Wrapper>
        <Wrapper className="wrapper-about">
          <Wrapper className="wrapper-person">
            <Wrapper className="wrapper-photo"></Wrapper>
            <Heading
              tag="h4"
              className="heading-person"
              content="Evgeniya Gribova"
            />
            <AnchorLink
              className="link-person"
              href="https://github.com/zhenyagri"
              target="_blank"
            >
              <Img className="github-logo" src={github} alt="GitHub Logo" />
              zhenyagri
            </AnchorLink>
            <Text className="person-text" content={lorem} />
          </Wrapper>
          <Wrapper className="wrapper-person">
            <Wrapper className="wrapper-photo"></Wrapper>
            <Heading
              tag="h4"
              className="heading-person"
              content="Andrei Sparish"
            />
            <AnchorLink
              className="link-person"
              href="https://github.com/rabbitdrew"
              target="_blank"
            >
              <Img className="github-logo" src={github} alt="GitHub Logo" />
              rabbitdrew
            </AnchorLink>
            <Text className="person-text" content={lorem} />
          </Wrapper>
          <Wrapper className="wrapper-person">
            <Wrapper className="wrapper-photo"></Wrapper>
            <Heading
              tag="h4"
              className="heading-person"
              content="Olga Mokeeva"
            />
            <AnchorLink
              className="link-person"
              href="https://github.com/electriccrimson"
              target="_blank"
            >
              <Img className="github-logo" src={github} alt="GitHub Logo" />
              electriccrimson
            </AnchorLink>
            <Text className="person-text" content={lorem} />
          </Wrapper>
        </Wrapper>
        <AnchorLink
          className="link-school"
          href="https://rs.school/"
          target="_blank"
        >
          <Img className="school-logo" src={rsschool} alt="RS School Logo" />
        </AnchorLink>
      </Section>
    );
  }
}
