import React from 'react';
import { useSelector } from 'react-redux';
import PDFCV from 'src/assets/Gabriel_Ramos_CV.pdf';
import handleList from 'src/utils/listFormatter';
import { AppState } from 'src/redux/store';
import getAge from 'src/utils/getAge';
import styled from 'styled-components';
import { Button } from '../_atoms';
import { fonts, fontWeights } from 'src/constants/fonts';

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
      line-height: 1;
    }

    .first-paragraph__highlight {
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
    birthdate: MYINFO?.birthdate ? MYINFO.birthdate : ''
  };

  return (
    <AboutMeWrapper id="about-me">
      <img src={MYINFO?.image} alt="Profile picture" />
      <div className="col intro">
        <h1>About me</h1>
        <p className="first-paragraph__highlight">
          My name is {`${MYINFO?.name} ${MYINFO?.surname}`} 👨🏽‍💻.{' '}
          {`(${getAge(translate.birthdate)} y-o)`}
        </p>

        <div
          className="about_me_text"
          dangerouslySetInnerHTML={{ __html: MYINFO?.about_me || '' }}
        />

        <div className="profile">
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
        </div>

        <a
          href={PDFCV}
          download="Gabriel_Ramos_CV"
          style={{ display: 'contents' }}
        >
          <Button
            aria-label="download"
            role="link"
            label="Click to download my resumé (C.V.)"
          />
        </a>
      </div>
    </AboutMeWrapper>
  );
};
