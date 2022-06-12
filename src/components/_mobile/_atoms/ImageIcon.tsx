import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'src/constants/colors';
import { addNewWindow } from 'src/redux';
import { useDispatch } from 'react-redux';

type ScreenIconProps = {
  imageSource: string;
  label: string;
  id: string;
};

const ScreenIconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  width: ${window.screen.width / 3.5}px;
  aspect-ratio: 0;
  margin: 5px;
  border: none;
  background-color: transparent;
  user-select: none;
  overflow: hidden;
`;

const ScreenIconImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.white};
  object-fit: cover;
`;

export const ImageIcon: FC<ScreenIconProps> = ({
  id,
  imageSource,
  label,
  children
}) => {
  const dispatch = useDispatch();

  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  function openWindow() {
    dispatch(addNewWindow(id, label, children as JSX.Element));
  }

  return (
    <ScreenIconWrapper onClick={openWindow}>
      <ScreenIconImage src={imageSource} />
    </ScreenIconWrapper>
  );
};
