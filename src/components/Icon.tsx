import { IconOption, icons } from 'src/constants/icons';
import React, { FC, HTMLAttributes } from 'react';
import styled, { useTheme } from 'styled-components';

export type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: IconOption;
  rotate?: number;
  color?: string;
  size?: number;
  height?: string | number;
  width?: string | number;
};

const StyledIconWrapper = styled.span<
  HTMLAttributes<HTMLSpanElement> & {
    rotate?: number;
    width?: string | number;
    height?: string | number;
    color?: string;
  }
>`
  display: block;
  position: relative;
  line-height: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  ${(props) => props.rotate && `transform: rotate(${props.rotate}deg);`};
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    fill: ${(props) => props.color} !important;
    object-fit: fill;
  }
`;

export const Icon: FC<IconProps> = ({
  size,
  width,
  height,
  icon,
  rotate,
  ...props
}) => {
  const IconComponent = icons[icon];

  return (
    <StyledIconWrapper
      rotate={rotate}
      width={width || size}
      height={height || size}
      color={icon === 'github' ? useTheme().text : props.color}
      {...props}
    >
      <IconComponent height="100%" width="100%" />
    </StyledIconWrapper>
  );
};
