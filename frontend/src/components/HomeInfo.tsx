import React, { FC } from 'react';
import { PersonalDetails } from 'src/@types/Api';
import { colors } from 'src/constants/colors';
import styled from 'styled-components';

type HomeInfoProps = {
  info: PersonalDetails;
};

const HomeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 200px;
  place-self: center;
  transform: translateY(30vh);
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
`;

export const HomeInfo: FC<HomeInfoProps> = ({
  info: { name, surname, role, company }
}) => {
  return (
    <HomeInfoWrapper>
      <h1>{`${name} ${surname}`}</h1>
      <h2>{role}</h2>
      <h3>{`@ ${company}`}</h3>
    </HomeInfoWrapper>
  );
};
