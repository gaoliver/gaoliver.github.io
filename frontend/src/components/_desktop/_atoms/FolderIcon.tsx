import { rgba } from 'polished';
import React, { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { addNewWindow } from 'src/redux';
import styled from 'styled-components';

export type FolderIconProps = {
  imageSource: string;
  label: string;
  id: string;
};

const FolderIconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  width: 110px;
  height: 120px;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 6px;
  border: none;
  background-color: transparent;
  user-select: none;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid transparent;

  &.selected {
    background-color: ${rgba(colors.white, 0.2)};
    border: 1px dotted ${colors.silver};
  }
`;

const ImageStyled = styled.img`
  display: block;
  height: 60%;
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0px 0px 2px ${colors.black});
`;

const LabelStyled = styled.span`
  width: 100%;
  flex: 0.8;
  margin-bottom: 5%;
  color: ${props => props.theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  ${fonts.label}
`;

export const FolderIcon: FC<FolderIconProps> = ({
  imageSource,
  label,
  id,
  children
}) => {
  const dispatch = useDispatch();
  const iconRef = useRef<HTMLButtonElement>(null);

  window.addEventListener('click', function (event) {
    if (!iconRef.current?.contains(event.target as Node)) {
      iconRef.current?.classList.remove('selected');
    }
  });

  window.addEventListener('contextmenu', function (event) {
    if (iconRef.current?.contains(event.target as Node)) {
      event.preventDefault();
    }
  });

  function selectIcon() {
    iconRef.current?.classList.add('selected');
  }

  function openWindow() {
    dispatch(addNewWindow(id, label, children as JSX.Element));
    iconRef.current?.classList.remove('selected');
  }

  return (
    <FolderIconWrapper
      ref={iconRef}
      onClick={selectIcon}
      onDoubleClick={openWindow}
      onDrag={selectIcon}
      role="button"
      aria-label={`${label} icon`}
      draggable
    >
      <ImageStyled src={imageSource} draggable={false} />
      <LabelStyled>{label}</LabelStyled>
    </FolderIconWrapper>
  );
};
