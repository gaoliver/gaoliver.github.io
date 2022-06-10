import React, { FC } from 'react';
import styled from 'styled-components';

import { colors } from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
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
  width: ${window.screen.width / 5}px;
  aspect-ratio: 0;
  margin: 10px 0;
  border: none;
  background-color: transparent;
  user-select: none;
  overflow: hidden;
`;

const ScreenIconImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 15px;
  object-fit: contain;
`;

const LabelStyled = styled.span`
  width: 100%;
  flex: 1;
  margin-top: 5px;
  color: ${props => props.theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  ${fonts.label}
`;

export const FolderScreenIcon: FC<ScreenIconProps> = ({
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
      <LabelStyled>{label}</LabelStyled>
    </ScreenIconWrapper>
  );
};
