import React, { FC } from 'react';
import { PersonalDetails } from 'src/@types/Models';
import { colors } from 'src/constants/colors';
import styled, { keyframes } from 'styled-components';
import { Button } from './_desktop';

type HomeInfoProps = {
  info?: PersonalDetails;
  isMaintenanceMode?: boolean;
  maintenanceText?: string;
};

const fadeInTextAnimation = keyframes`
  0% {
    opacity: 0
  }
  30% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0);
  }
  80% {
    opacity: 1
  }
  100% {
    opacity: 0.5
  }
`;

const fadeInButtonAnimation = keyframes`
  0% {
    opacity: 0
  }
  60% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 200px;
  place-self: center;
  transform: translateY(35vh);
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  mix-blend-mode: difference;
  opacity: 0.8;
  user-select: none;
  line-height: normal;

  :hover {
    cursor: default;
  }

  @media (max-width: 800px) {
    color: ${colors.white};
  }

  h1,
  h2,
  h3 {
    margin: 0;
    line-height: 1;
  }
`;

const MaintenanceModeText = styled.span`
  position: absolute;
  top: 9rem;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 0;
  font-size: xx-large;
  max-width: 500px;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  opacity: 0.5;
  color: ${colors.black};
  mix-blend-mode: darken;
  animation: ${fadeInTextAnimation} 3s;

  @media (max-width: 800px) {
    color: ${colors.white};
  }
`;

const LinkButton = styled(Button)`
  position: absolute;
  width: fit-content;
  color: ${(props) => props.theme.button.label};
  margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 0;
  bottom: 9rem;
  animation: ${fadeInButtonAnimation} 2s;
`;

export const HomeInfo: FC<HomeInfoProps> = ({
  info,
  isMaintenanceMode,
  maintenanceText = "We're in maintenance at the moment. Please, come back later!"
}) => {
  return (
    <>
      {isMaintenanceMode && (
        <MaintenanceModeText>{maintenanceText}</MaintenanceModeText>
      )}

      <HomeInfoWrapper role='textbox' aria-multiline="true">
        {info?.name
          ? (
          <>
            <h1>{`${info.name} ${info.surname}`}</h1>
            <h2>{info.role}</h2>
            <h3>{`@ ${info.company}`}</h3>
          </>
            )
          : (
          <>
            <h1>Gabriel Ramos</h1>
            <h2>Frontend Developer</h2>
          </>
            )}
      </HomeInfoWrapper>

      {isMaintenanceMode && (
        <a href="http://linkedin.com/in/gabrielocramos">
          <LinkButton label="Go to LinkedIn" />
        </a>
      )}
    </>
  );
};
