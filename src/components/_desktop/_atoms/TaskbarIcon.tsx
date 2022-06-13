import { buttonInteraction } from 'src/constants/buttonInteraction';
import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { taskbarIconsShadow } from 'src/constants/taskbarIconsShadow';
import { colors } from 'src/constants/colors';
import { dark } from 'src/styles';

type TaskbarIconProps = HTMLAttributes<HTMLButtonElement> & {
  isMobile?: boolean;
};

const TaskbarIconWrapper = styled.button<TaskbarIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39px;
  max-width: fit-content;
  padding: 5px 10px;
  box-sizing: border-box;
  margin: 3px 2.5px;
  border-radius: 5px;
  border: 0;
  background-color: transparent;

  :first-of-type {
    width: 110px;
  }

  :not(:first-of-type) {
    svg {
      width: 39px;
    }
  }

  svg {
    path {
      object-position: center;
      object-fit: contain;
    }
  }
  ${buttonInteraction}

  :hover {
    ${(props) =>
      !props.isMobile && {
        cursor: 'pointer',
        backgroundColor: rgba(props.theme.window, 0.5),
        border:
          props.theme === dark ? `0.5px solid ${rgba(colors.white, 0.3)}` : 0,
        boxShadow: taskbarIconsShadow.boxShadow
      }}
  }
`;

export const TaskbarIcon: FC<TaskbarIconProps> = ({
  children,
  isMobile,
  ...props
}) => {
  return (
    <TaskbarIconWrapper isMobile={isMobile} role="button" {...props}>
      {children}
    </TaskbarIconWrapper>
  );
};
