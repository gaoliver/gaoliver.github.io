import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { Icon } from 'src/components/_shared';
import { TaskbarIcon } from '../_atoms';
import { ClockComponent } from '../_molecules/ClockComponent';
import { rgba } from 'polished';
import {
  addNewWindow,
  minimizeWindow,
  store,
  toggleTaskSettings,
  changeWindowOnFocus
} from 'src/redux';
import { useDispatch } from 'react-redux';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { EmbedModel } from './EmbedModel';
import { IconOption } from 'src/constants/icons';
import { fonts } from 'src/constants/fonts';
import { colors } from 'src/constants/colors';
import { taskbarIconsShadow } from 'src/constants/taskbarIconsShadow';
import { dark } from 'src/styles';
import { SocialNetwork, WindowListProps } from 'src/@types/Models';

type TaskbarProps = {
  windowsList: WindowListProps[];
  onClickWindow: (id: string) => void;
};

const TaskbarWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: ${(props) => rgba(props.theme.window, 0.9)};
  backdrop-filter: blur(10px);
`;

const WindowsListWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: auto;
  align-items: center;
`;

const WindowButton = styled(TaskbarIcon)<
  typeof TaskbarIcon & { isActive: boolean }
>`
  flex: 1;
  max-width: 25%;
  color: ${(props) => rgba(props.theme.text, props.isActive ? 1 : 0.8)};
  background-color: ${(props) =>
    props.isActive ? props.theme.window : 'transparent'};
  border: none;
  padding: 0 5px;
  font-size: ${fonts.body.fontSize};
  ${(props) => props.isActive && taskbarIconsShadow}
  ${(props) =>
    props.theme === dark &&
    props.isActive && {
      border: `0.5px solid ${rgba(colors.white, 0.5)}`
    }}

  span {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const Taskbar: FC<TaskbarProps> = ({ windowsList, onClickWindow }) => {
  const dispatch = useDispatch();
  const { MYINFO } = store.getState();
  const theme = useTheme();

  const renderSocialContent = (social: SocialNetwork) => {
    return <EmbedModel url={social.url} icon={social.id} isNotWorking />;
  };

  function openWindow(id: string, title: string, content: JSX.Element) {
    dispatch(addNewWindow(id, title, content));
  }

  function cleanUpDesktop() {
    const filteredList = windowsList.filter((window) => !window.minimized);
    filteredList.forEach((window) => dispatch(minimizeWindow(window.id)));
    dispatch(changeWindowOnFocus(''));
  }

  const RenderList = () => {
    return (
      <>
        {windowsList.map((item) => (
          <WindowButton
            key={item.id}
            onClick={() => onClickWindow(item.id)}
            isActive={
              store
                .getState()
                .windowsList.find((window) => window.id === item.id)?.minimized
                ? false
                : store.getState().windowOnFocus === item.id
            }
          >
            <span>{item.title}</span>
          </WindowButton>
        ))}
      </>
    );
  };

  return (
    <TaskbarWrapper id="taskbar">
      <TaskbarIcon onClick={cleanUpDesktop} aria-label='home'>
        <Icon
          id="website-logo"
          icon="logo-transparent"
          height="35px"
          color={useTheme().text}
          style={{ opacity: 0.9, top: '3px' }}
        />
      </TaskbarIcon>
      {MYINFO?.social?.map((social) => (
        <TaskbarIcon
          id={social.id}
          key={social.id}
          aria-label={`${social.name} icon`}
          onClick={() =>
            openWindow(
              social.id,
              `${MYINFO?.name} - ${social.name}`,
              renderSocialContent(social)
            )
          }
        >
          <Icon icon={social.id as IconOption} height="100%" />
        </TaskbarIcon>
      ))}
      <WindowsListWrapper>
        <RenderList />
      </WindowsListWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <TaskbarIcon
          onClick={() => dispatch(toggleTaskSettings())}
          style={{ minWidth: 30, width: 'fit-content' }}
          aria-label='settings'
        >
          <BsFillCaretUpFill color={rgba(theme.text, 0.5)} />
        </TaskbarIcon>
        <TaskbarIcon aria-label='clock'>
          <ClockComponent />
        </TaskbarIcon>
      </div>
    </TaskbarWrapper>
  );
};
