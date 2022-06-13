import React, { FC, HTMLAttributes } from 'react';
import { colors } from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import styled from 'styled-components';

export type ButtonProps = {
  label: string;
  color?: string;
} & HTMLAttributes<HTMLButtonElement>;

const ButtonWrapper = styled.button`
  padding: 15px 30px;
  background-color: ${(props) => props.color || props.theme.primary};
  color: ${colors.white};
  border-radius: 5px;
  border: none;
  transition: ease-in-out 0.1s;
  box-shadow: 0px 0px 2px 1px ${colors.black};
  ${fonts.button}

  :active {
    filter: brightness(0.7);
    box-shadow: none;
  }
  :hover {
    cursor: pointer;
  }
`;

export const Button: FC<ButtonProps> = ({ label, children, ...props }) => {
  return (
    <ButtonWrapper style={{ ...fonts.button }} type="button" {...props} role="button">
      {label}{children}
    </ButtonWrapper>
  );
};
