import React, { useRef, useEffect } from 'react';
import { store, toggleTheme } from 'src/redux';
import styled from 'styled-components';
import { CgDarkMode } from 'react-icons/cg';
import { useDispatch } from 'react-redux';

const TaskSettingsWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 10000;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.window};
  bottom: 5px;
  right: 90px;
  transition: ease-in-out 0.3s;
`;

export const TaskSettings = () => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  function handleToggleSettings() {
    if (!settingsRef.current) return;

    if (store.getState().taskSettings) {
      settingsRef.current.style.transform = 'translateY(0px)';
      settingsRef.current.style.opacity = '1';
    } else {
      settingsRef.current.style.transform = 'translateY(30px)';
      settingsRef.current.style.opacity = '0';
    }
  }

  useEffect(() => {
    handleToggleSettings();
  }, [store.getState().taskSettings]);
  return (
    <TaskSettingsWrapper ref={settingsRef}>
      <CgDarkMode size={16} onClick={() => dispatch(toggleTheme())} />
    </TaskSettingsWrapper>
  );
};
