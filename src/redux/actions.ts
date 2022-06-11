/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { myInfoUrl, portfolioUrl, toolsUrl } from 'src/mocks/index';
import { Dispatch } from 'react';
import {
  MyInfoModel,
  PortfolioModel,
  ToolsModel,
  WindowListProps
} from './reducer';
import { store } from './store';
import { Theme } from 'src/styles/styled';
import { dark, light } from 'src/styles';

export interface AddNewWindow {
  readonly type: 'ADD_NEW_WINDOW';
  payload: WindowListProps;
}

export interface WindowOnFocus {
  readonly type: 'WINDOW_ON_FOCUS';
  payload: string;
}

export interface MinimizeWindow {
  readonly type: 'MINIMIZE_WINDOW';
  payload: WindowListProps[];
}

export interface CloseWindow {
  readonly type: 'CLOSE_WINDOW';
  payload: WindowListProps[];
}

export interface CloseAllApps {
  readonly type: 'CLOSE_ALL_APP';
}

export interface ToggleTaskSettings {
  readonly type: 'TOGGLE_TASK_SETTINGS';
}
export interface ToggleTheme {
  readonly type: 'TOGGLE_THEME';
  payload: Theme;
}

export interface SetTools {
  readonly type: 'ON_SET_TOOLS';
  payload: ToolsModel;
}

export interface SetInfo {
  readonly type: 'ON_SET_INFO';
  payload: MyInfoModel;
}

export interface SetPortfolio {
  readonly type: 'ON_SET_PORTFOLIO';
  payload: Array<PortfolioModel>;
}

export type AppActions =
  | SetTools
  | SetInfo
  | SetPortfolio
  | AddNewWindow
  | MinimizeWindow
  | CloseWindow
  | ToggleTaskSettings
  | ToggleTheme
  | WindowOnFocus
  | CloseAllApps;

export const toggleTaskSettings = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'TOGGLE_TASK_SETTINGS'
    });
  };
};

export const toggleTheme = (theme?: Theme) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'TOGGLE_THEME',
      payload: theme || (store.getState().theme === light ? dark : light)
    });
  };
};

export const addNewWindow = (
  id: string,
  title: string,
  content: JSX.Element
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'ADD_NEW_WINDOW',
      payload: { id, title, minimized: false, content }
    });
  };
};

export const windowOnFocus = (id: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'WINDOW_ON_FOCUS',
      payload: id
    });
  };
};

export const minimizeWindow = (id: string) => {
  const list = store.getState().windowsList;

  function checkMinimized() {
    const itemIndex = list.findIndex((item) => item.id === id);
    let status: boolean;

    if (list[itemIndex].minimized) {
      status = false;
    } else {
      status = true;
    }
    list[itemIndex] = { ...list[itemIndex], minimized: status };
    return [...list];
  }

  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'MINIMIZE_WINDOW',
      payload: checkMinimized()
    });
  };
};

export const closeWindow = (id: string) => {
  const list = store.getState().windowsList;

  function removeWindow() {
    const itemIndex = list.findIndex((item) => item.id === id);
    list.splice(itemIndex, 1);
    return [...list];
  }

  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'CLOSE_WINDOW',
      payload: removeWindow()
    });
  };
};

export const closeAllApps = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: 'CLOSE_ALL_APP'
    });
  };
};

export const getTools = () => {
  let data: ToolsModel;
  return async (dispatch: Dispatch<AppActions>) => {
    await axios
      .get(toolsUrl)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log('Erro:', err));
    dispatch({
      type: 'ON_SET_TOOLS',
      payload: data
    });
  };
};

export const getInfo = () => {
  let data: MyInfoModel;
  return async (dispatch: Dispatch<AppActions>) => {
    await axios
      .get(myInfoUrl)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log('Erro:', err));
    dispatch({
      type: 'ON_SET_INFO',
      payload: data
    });
  };
};

export const getPortfolio = () => {
  let data: Array<PortfolioModel>;
  return async (dispatch: Dispatch<AppActions>) => {
    await axios
      .get(portfolioUrl)
      .then((res) => {
        data = res.data;
        console.log(res.data)
      })
      .catch((err) => console.log('Erro:', err));
    dispatch({
      type: 'ON_SET_PORTFOLIO',
      payload: data
    });
  };
};
