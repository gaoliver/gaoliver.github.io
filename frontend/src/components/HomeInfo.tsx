import React, { FC } from 'react';
import { PersonalDetails } from 'src/@types/Models';
import { colors } from 'src/constants/colors';
import styled, { keyframes } from 'styled-components';
import { Button } from './_desktop';

type HomeInfoProps = {
  info: PersonalDetails;
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
  z-index: -1;
  width: 100%;
  height: 200px;
  place-self: center;
  transform: translateY(35vh);
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  opacity: 0.5;
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
  z-index: -1;

  font-size: xx-large;
  max-width: 500px;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  opacity: 0.5;
  color: ${colors.black};
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
  info: { name, surname, role, company },
  isMaintenanceMode,
  maintenanceText
}) => {
  return (
    <>
      {isMaintenanceMode && (
        <MaintenanceModeText>{maintenanceText}</MaintenanceModeText>
      )}

      <HomeInfoWrapper>
        <h1>{`${name} ${surname}`}</h1>
        <h2>{role}</h2>
        <h3>{`@ ${company}`}</h3>
      </HomeInfoWrapper>

      {isMaintenanceMode && (
        <a href="http://linkedin.com/in/gabrielocramos">
          <LinkButton label="Go to LinkedIn" />
        </a>
      )}
    </>
  );
};
