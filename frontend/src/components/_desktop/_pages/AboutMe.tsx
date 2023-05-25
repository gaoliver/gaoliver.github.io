import React from 'react';
import { useSelector } from 'react-redux';
import handleList from 'src/utils/listFormatter';
import { AppState } from 'src/redux/store';
import getAge from 'src/utils/getAge';
import styled from 'styled-components';
import { Button } from '../_atoms';
import { fonts, fontWeights } from 'src/constants/fonts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const AboutMeWrapper = styled.section`
  display: flex;
  height: fit-content;
  padding-top: 20px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .intro {
    padding: 0 20%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
      padding: 0 30px;
    }

    p {
      text-align: justify;
    }
  }
`;

const Image = styled.img`
  width: 200px;
  border-radius: 100%;
  margin: 20px 0 30px 0;
`;

const ButtonWrapper = styled.a`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-decoration: none;
`;

const ProfileWrapper = styled.div`
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
    text-align: center !important;
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
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.h1};
  line-height: 1;
`;

const FirstParagraph = styled.p`
  width: 100%;
  margin-top: 0;
  padding: 5px 0;
  background-color: ${(props) => props.theme.h1};
  color: ${(props) => props.theme.window};
  ${fonts.h3};
  font-weight: ${fontWeights.regular};

  @media screen and (max-width: 800px) {
    font-size: 1.3rem;
  }
`;

export const AboutMe: React.FC = () => {
  const { TOOLS, MYINFO } = useSelector((state: AppState) => state);

  const translate = {
    birthdate: MYINFO?.birthdate ? MYINFO.birthdate : '',
    about_me: MYINFO?.about_me ? documentToHtmlString(MYINFO.about_me) : ''
  };

  return (
    <AboutMeWrapper id="about-me">
      <Image src={MYINFO?.image} alt="Profile picture" />
      <div className="col intro">
        <H1>About me</H1>
        <FirstParagraph>
          {`My name is ${MYINFO?.name} ${MYINFO?.surname} 👨🏽‍💻. (${getAge(
            translate.birthdate
          )} y-o)`}
        </FirstParagraph>

        <div
          className="about_me_text"
          dangerouslySetInnerHTML={{
            __html: translate.about_me
          }}
        />

        <ProfileWrapper>
          <h2>{MYINFO?.role}</h2>
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
        </ProfileWrapper>

        <ButtonWrapper
          href={MYINFO?.resume.fields.file.url}
          target="_blank"
          download="Gabriel_Ramos_CV"
          rel="noreferrer"
        >
          <Button
            aria-label="download"
            role="link"
            label="Click to download my resumé (C.V.)"
          />
        </ButtonWrapper>
      </div>
    </AboutMeWrapper>
  );
};
