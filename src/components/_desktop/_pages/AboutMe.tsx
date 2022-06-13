import React from 'react';
import { useSelector } from 'react-redux';
import PDFCV from 'src/assets/Gabriel_Ramos_CV.pdf';
import handleList from 'src/utils/listFormatter';
import { AppState } from 'src/redux/store';
import getAge from 'src/utils/getAge';
import styled from 'styled-components';
import { Button } from '../_atoms';
import { fonts, fontWeights } from 'src/constants/fonts';

import ProfilePicture from "src/assets/images/professinal_profile_edited.png"

const AboutMeWrapper = styled.section`
  display: flex;
  height: fit-content;
  padding-top: 20px;
  padding-bottom: 80px !important;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
    border-radius: 100%;
    margin: 20px 0 30px 0;
  }

  .intro {
    padding: 0 20%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
      padding: 0 30px;
    }

    h1 {
      color: ${(props) => props.theme.h1};
    }

    p:first-of-type {
      width: 100%;
      margin-top: 0;
      padding: 5px 0;
      background-color: ${(props) => props.theme.h1};
      color: ${(props) => props.theme.window};
      ${fonts.h3};
      font-weight: ${fontWeights.regular};
    }

    p {
      text-align: justify;
    }

    .profile {
      margin: 40px 10%;
      padding: 20px;
      border: 3px dotted ${(props) => props.theme.h1};
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (max-width: 800px) {
        margin: 40px 0 !important;
      }

      h2 {
        color: ${(props) => props.theme.h1};
      }

      h3 {
        margin-top: 40px;
        text-align: center;
      }

      p {
        background: none;
        color: ${(props) => props.theme.text};
        width: fit-content;
        text-align: center;
        line-height: 20px;
        margin-top: 10px;
        ${fonts.body};

        b {
          margin-top: 20px;
        }

        li {
          list-style: none;
        }
      }
    }
  }
`;

export const AboutMe: React.FC = () => {
  const { TOOLS, MYINFO } = useSelector((state: AppState) => state);
  const translate = {
    age: MYINFO?.age ? MYINFO.age : ''
  };

  return (
    <AboutMeWrapper id="about-me">
      <img src={ProfilePicture} alt="Profile picture" />
      <div className="col intro">
        <h1>About me</h1>
        <p>
          My name is {`${MYINFO?.name} ${MYINFO?.surname}`} 👨🏽‍💻.{' '}
          {`(${getAge(translate.age)} y-o)`}
        </p>
        <p>
          I am Frontend and Mobile Developer - with some few experiences as
          Fullstack - since 2018, always searching for learning new languages
          and frameworks, like React and React Native (which ones I use the most
          today), also C#.NET (which I have used in some big important projects
          for companies, and for learning) and Python (for learning and creating
          data projects in the University, when I was graduating in Physics.)
        </p>
        <p>
          I have worked for Inventa Produtos Digitais, where I was part of many
          projects for companies and even for the government. During that time,
          I worked with Wordpress, HTML, CSS, JavaScript, React Native, GIT,
          Redux and C#/.NET.
        </p>
        <p>
          Then I got the position as Project Manager and React Native Developer
          at Loomer Tech, where I created many mobile apps for companies and for
          internal projects, using React Native, Azure, Redux, GIT, and
          React.js.
        </p>
        <p>
          By the middle of the same year, I received an opportunity to be React
          Native Developer at Americanas S.A., the largest international
          e-commerce Company in Latin America. I was hired for working on a
          project of renewing an old app - from scratch - which is used for
          international e-commerce. So I did it, being the main mobile developer
          of the whole project and making it happen. The app is very famous
          around the country until nowadays. For that project, I worked using
          React Native, Redux, AWS, GIT, Jira and everything needed to learn,
          for making a better work everyday.
        </p>
        <p>
          By the end of 2021, I received an opportunity that changed my whole
          life. I was hired for (starting in 2022) working as Frontend Developer
          at Dept Agency, in Rotterdam, Netherlands. This is my current Company,
          and I work in many important projects for huge companies from all
          around the world, as Dept is one of the greatest marketing companies
          in the world. And as Frontend Developer, I work a lot on web
          development using React.js and learning the most I can to improve
          every project.
        </p>
        <p>
          P.S.: During the time I was studying Physics at the University, I was
          part of Rio de Janeiro Rocket Team (GFRJ), an extracurricular
          scientific group for building rockets for national and international
          competitions. Working on it, I was the developer of payload systems,
          in Python. We got #1 as Best Rocket, in Brazil, and #3 in an
          international compatition called Spaceport American Cup, in the USA,
          in the category of Best Solid Motor Rocket.
        </p>
        <p>You can download my resumé (C.V.) in the end of the page.</p>

        <div className="profile">
          <h2>{MYINFO?.position}</h2>
          <p>{TOOLS?.description}</p>
          <h3>Languages and Frameworks</h3>
          <p>
            <b>PRO level:</b>
            <br />
            {handleList(TOOLS?.languages.pro)}
          </p>
          <br />
          <p>
            <b>Intermediate/Academic level:</b>
            <br />
            {handleList(TOOLS?.languages.intermediate)}
          </p>
          <br />
          <p>
            <b>Learning/Low level:</b>
            <br />
            {handleList(TOOLS?.languages.beginner)}
          </p>
          <h3>Dev tools</h3>
          <p>
            {TOOLS?.tools.map((tool) => {
              return <li key={Math.random()}>{tool}</li>;
            })}
          </p>
        </div>

        <a
          href={PDFCV}
          download="Gabriel_Ramos_CV"
          style={{ display: 'contents' }}
        >
          <Button aria-label='download' role="link" label="Click to download my resumé (C.V.)" />
        </a>
      </div>
    </AboutMeWrapper>
  );
};
