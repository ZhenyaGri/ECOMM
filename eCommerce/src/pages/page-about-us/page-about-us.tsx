import React, { Component } from 'react';
import { Section } from '../../components/section/section';
import { Wrapper } from '../../components/wrapper/wrapper';
import { AnchorLink } from '../../components/link/link';
import { Img } from '../../components/img/img';
import rsschool from '../../assets/icons/logo-rsschool.svg';
import github from '../../assets/icons/logo-github.svg';
import { Heading } from '../../components/heading/heading';
import { Text } from '../../components/text/text';
import { teamText } from './about-us-data';
import { personalInfo } from './about-us-data';

const aboutUsCards = (): React.ReactNode[] => {
  const cards = [];

  for (let i = 0; i < personalInfo.length; i++) {
    cards.push(
      <Wrapper className="wrapper-person" key={`person-${i}`}>
        <Wrapper className="wrapper-photo">
          <Img
            className="person-photo"
            src={personalInfo[i].imgSrc}
            alt="Photo of team member"
          />
        </Wrapper>
        <Heading
          tag="h4"
          className="heading-person"
          content={personalInfo[i].name}
        />
        <AnchorLink
          className="link-person"
          href={personalInfo[i].link}
          target="_blank"
        >
          <Img className="github-logo" src={github} alt="GitHub Logo" />
          {personalInfo[i].githubName}
        </AnchorLink>
        <Text className="person-role" content={personalInfo[i].role} />
        <Text className="person-text" content={personalInfo[i].description} />
        {personalInfo[i].tags && (
          <Wrapper className="wrapper-tags">
            {personalInfo[i].tags.map((tag, index) => (
              <span className="person-tag" key={`tag-${index}`}>
                {tag}
              </span>
            ))}
          </Wrapper>
        )}
      </Wrapper>
    );
  }

  return cards;
};

export class AboutUs extends Component {
  render(): React.ReactNode {
    return (
      <Section className="section-about-us">
        <Wrapper className="wrapper-collaboration">
          <Text className="collaboration-text" content={teamText} />
        </Wrapper>
        <Wrapper className="wrapper-about">{aboutUsCards()}</Wrapper>
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
