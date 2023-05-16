import React, { FC } from 'react';
import { colors } from 'src/constants/colors';
import { MyInfoModel } from 'src/redux';
import styled from 'styled-components';

type HomeInfoProps = {
  info: MyInfoModel;
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
  color: ${colors.white};
  opacity: 0.7;
  user-select: none;
  line-height: normal;

  :hover {
    cursor: default;
  }
`;

export const HomeInfo: FC<HomeInfoProps> = ({
  info: { name, surname, position, company }
}) => {
  return (
    <HomeInfoWrapper>
      <h1>{`${name} ${surname}`}</h1>
      <h2>{position}</h2>
      <h3>{`@ ${company}`}</h3>
    </HomeInfoWrapper>
  );
};
