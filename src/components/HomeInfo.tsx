import React, { FC } from 'react';
import { MyInfoModel } from 'src/redux';
import styled from 'styled-components';

type HomeInfoProps = {
  info: MyInfoModel;
};

const HomeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 200px;
  place-self: center;
  transform: translateY(30vh);
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.window};
  opacity: 0.3;
  user-select: none;

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
