import { rgba } from 'polished';
import React, { FC } from 'react';
import { TaskbarIcon } from 'src/components/_shared';
import { colors } from 'src/constants/colors';
import styled, { useTheme } from 'styled-components';
import { BiCircle, BiLeftArrow, BiSquareRounded } from 'react-icons/bi';
import { dark } from 'src/styles';
import { taskbarIconsShadow } from 'src/constants/taskbarIconsShadow';
import { useDispatch } from 'react-redux';
import { toggleTheme } from 'src/redux';

type TaskbarMobileProps = {
  onBack: () => void;
  onHome: () => void;
};

enum ActionsNavigation {
  BACK = 'Back',
  HOME = 'Home',
  TOOGLE = 'Toggle'
}

const TaskbarWrapper = styled.footer`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1000;
  bottom: 0;
  width: 92%;
  height: 60px;
  margin: 0 4% 10px;
  border-radius: 10px;
  background-color: ${(props) => rgba(props.theme.window, 0.2)};
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 2px ${colors.black};
`;

const MobileNavIcon = styled(TaskbarIcon)`
  margin: 0 !important;

  :active {
    background-color: ${(props) => rgba(props.theme.window, 0.5)};
    ${(props) =>
      props.theme === dark && {
        border: `0.5px solid ${rgba(colors.white, 0.3)}`
      }}
    ${taskbarIconsShadow}
  }
`;

export const Taskbar: FC<TaskbarMobileProps> = ({ onBack, onHome }) => {
  const dispatch = useDispatch();

  function actionVibrate(action: ActionsNavigation) {
    navigator.vibrate(10);

    switch (action) {
      case ActionsNavigation.TOOGLE:
        dispatch(toggleTheme());
        break;

      case ActionsNavigation.HOME:
        onHome()
        break;

      case ActionsNavigation.BACK:
        onBack()
        break;

      default:
        break;
    }
  }

  return (
    <TaskbarWrapper>
      <MobileNavIcon
        isMobile
        onClick={() => actionVibrate(ActionsNavigation.BACK)}
      >
        <BiLeftArrow size={35} color={rgba(useTheme().text, 0.4)} />
      </MobileNavIcon>
      <MobileNavIcon
        isMobile
        onClick={() => actionVibrate(ActionsNavigation.HOME)}
      >
        <BiCircle size={35} color={rgba(useTheme().text, 0.4)} />
      </MobileNavIcon>
      <MobileNavIcon
        isMobile
        onClick={() => actionVibrate(ActionsNavigation.TOOGLE)}
      >
        <BiSquareRounded size={35} color={rgba(useTheme().text, 0.4)} />
      </MobileNavIcon>
    </TaskbarWrapper>
  );
};
