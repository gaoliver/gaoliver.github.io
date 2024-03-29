/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from 'react';
import { store } from './store';
import { Theme } from 'src/styles/styled';
import { dark, light } from 'src/styles';
import {
  GetPersonalDetailsApi,
  GetToolsApi,
  GetPortfolioApi,
  GetThemeApi,
  GetDesktopApi,
  NoteApi,
  GetStickyNotesApi
} from 'src/@types/Api';
import { createClient } from 'contentful';
import {
  Folder,
  PersonalDetails,
  ThemeModelApi,
  PortfolioModel,
  ToolsModel,
  WindowListProps
} from 'src/@types/Models';

export enum ActionTypes {
  ADD_NEW_WINDOW = 'ADD_NEW_WINDOW',
  WINDOW_ON_FOCUS = 'WINDOW_ON_FOCUS',
  MINIMIZE_WINDOW = 'MINIMIZE_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  CLOSE_ALL_APP = 'CLOSE_ALL_APP',
  TOGGLE_TASK_SETTINGS = 'TOGGLE_TASK_SETTINGS',
  TOGGLE_THEME = 'TOGGLE_THEME',
  ON_SET_TOOLS = 'ON_SET_TOOLS',
  ON_SET_INFO = 'ON_SET_INFO',
  ON_SET_PORTFOLIO = 'ON_SET_PORTFOLIO',
  TOGGLE_LOADING = 'TOGGLE_LOADING',
  GET_THEME = 'GET_THEME',
  GET_DESKTOP = 'GET_DESKTOP',
  GET_NOTES = 'GET_NOTES'
}

export interface AddNewWindow {
  readonly type: ActionTypes.ADD_NEW_WINDOW;
  payload: WindowListProps;
}

export interface WindowOnFocus {
  readonly type: ActionTypes.WINDOW_ON_FOCUS;
  payload: string;
}

export interface MinimizeWindow {
  readonly type: ActionTypes.MINIMIZE_WINDOW;
  payload: WindowListProps[];
}

export interface CloseWindow {
  readonly type: ActionTypes.CLOSE_WINDOW;
  payload: WindowListProps[];
}

export interface CloseAllApps {
  readonly type: ActionTypes.CLOSE_ALL_APP;
}

export interface ToggleTaskSettings {
  readonly type: ActionTypes.TOGGLE_TASK_SETTINGS;
}
export interface GetTheme {
  readonly type: ActionTypes.GET_THEME;
  payload: ThemeModelApi;
}

export interface ToggleTheme {
  readonly type: ActionTypes.TOGGLE_THEME;
  payload: Theme;
}

export interface ToggleLoading {
  readonly type: ActionTypes.TOGGLE_LOADING;
  payload: boolean;
}

export interface SetTools {
  readonly type: ActionTypes.ON_SET_TOOLS;
  payload: ToolsModel;
}

export interface SetInfo {
  readonly type: ActionTypes.ON_SET_INFO;
  payload: PersonalDetails;
}

export interface SetPortfolio {
  readonly type: ActionTypes.ON_SET_PORTFOLIO;
  payload: Array<PortfolioModel>;
}

export interface GetDesktop {
  readonly type: ActionTypes.GET_DESKTOP;
  payload: Array<Folder>;
}

export interface GetNotes {
  readonly type: ActionTypes.GET_NOTES;
  payload: Array<NoteApi>;
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
  | CloseAllApps
  | ToggleLoading
  | GetTheme
  | GetDesktop
  | GetNotes;

export const toggleTaskSettings = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.TOGGLE_TASK_SETTINGS
    });
  };
};

export const toggleTheme = (theme?: Theme) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.TOGGLE_THEME,
      payload: theme || (store.getState().theme === light ? dark : light)
    });
  };
};

export const addNewWindow = (
  id: string,
  title: string,
  content: JSX.Element
) => {
  history.pushState(id, '', `#${id}`);
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.ADD_NEW_WINDOW,
      payload: { id, title, minimized: false, content }
    });
  };
};

export const changeWindowOnFocus = (id: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.WINDOW_ON_FOCUS,
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
      type: ActionTypes.MINIMIZE_WINDOW,
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
      type: ActionTypes.CLOSE_WINDOW,
      payload: removeWindow()
    });
  };
};

export const toggleLoading = (value: boolean) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.TOGGLE_LOADING,
      payload: value
    });
  };
};

export const closeAllApps = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: ActionTypes.CLOSE_ALL_APP
    });
  };
};

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE || '',
  environment: process.env.REACT_APP_CONTENTFUL_ENV || '',
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN || ''
});

export const getThemeApi = () => {
  let data: ThemeModelApi;
  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_THEME || '')
      .then((response) => {
        const res: GetThemeApi = response.fields as unknown as GetThemeApi;
        data = {
          ...res,
          desktopBackgroundImage: res.desktopBackgroundImage.fields.file.url,
          mobileBackgroundImage: res.mobileBackgroundImage.fields.file.url
        };
      })
      .catch((err) => {
        console.log('Erro:', err);
        dispatch({
          type: ActionTypes.TOGGLE_LOADING,
          payload: false
        });
      });
    dispatch({
      type: ActionTypes.GET_THEME,
      payload: data
    });
  };
};

export const getTools = () => {
  let data: ToolsModel;
  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_TOOL || '')
      .then((response) => {
        const res: GetToolsApi = response.fields as unknown as GetToolsApi;
        const languages = res.languages.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.fields.category]: curr.fields.list
          }),
          {}
        );
        data = {
          ...res,
          languages
        } as unknown as ToolsModel;
      })
      .catch((err) => {
        console.log('Erro:', err);
        dispatch({
          type: ActionTypes.TOGGLE_LOADING,
          payload: false
        });
      });
    dispatch({
      type: ActionTypes.ON_SET_TOOLS,
      payload: data
    });
  };
};

export const getInfo = () => {
  let data: PersonalDetails;
  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_INFO || '')
      .then((response) => {
        const res: GetPersonalDetailsApi =
          response.fields as unknown as GetPersonalDetailsApi;
        const social = res.social.map((item) => ({
          ...item.fields,
          image: item.fields.image.fields.file.url
        }));
        data = {
          ...res,
          image: res.image.fields.file.url,
          contact: [res.contact.fields],
          social
        } as unknown as PersonalDetails;
      })
      .catch((err) => {
        console.log('Erro:', err);
        dispatch({
          type: ActionTypes.TOGGLE_LOADING,
          payload: false
        });
      });
    dispatch({
      type: ActionTypes.ON_SET_INFO,
      payload: data
    });
  };
};

export const getPortfolio = () => {
  let data: Array<PortfolioModel>;
  let jobsList: GetPortfolioApi['portfolio'];
  let jobsInfoList: Array<GetPortfolioApi['portfolio'][0]['fields']['jobInfo']>;

  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_PORTFOLIO || '')
      .then((response) => {
        const res: GetPortfolioApi =
          response.fields as unknown as GetPortfolioApi;
        jobsList = res.portfolio;
      });

    await client
      .getEntries({ content_type: 'jobInfo' })
      .then((res) => (jobsInfoList = res.items as typeof jobsInfoList));

    data = jobsList.map((job) => {
      const jobInfo:
        | GetPortfolioApi['portfolio'][0]['fields']['jobInfo']['fields']
        | undefined = jobsInfoList.find(
        (i) => i.sys.id === job.fields.jobInfo.sys.id
      )?.fields;

      return {
        ...job.fields,
        mainImage: job.fields.mainImage.fields.file.url,
        jobInfo: {
          ...jobInfo,
          images: jobInfo?.images.map((i) => i.fields.file.url)
        }
      };
    }) as typeof data;
    dispatch({
      type: ActionTypes.ON_SET_PORTFOLIO,
      payload: data.reverse()
    });
  };
};

export const getDesktop = () => {
  let data: Array<Folder>;
  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_DESKTOP || '')
      .then((response) => {
        const res: GetDesktopApi = response.fields as unknown as GetDesktopApi;
        data = res.folders?.map((folder) => ({
          ...folder.fields,
          image: folder.fields.image?.fields,
          gallery: folder.fields.gallery?.map((item) => item.fields)
        }));
      })
      .catch((err) => console.log('Erro:', err));
    dispatch({
      type: ActionTypes.GET_DESKTOP,
      payload: data
    });
  };
};

export const getStickyNotes = () => {
  let data: Array<NoteApi>;
  return async (dispatch: Dispatch<AppActions>) => {
    await client
      .getEntry(process.env.REACT_APP_CONTENTFUL_GET_NOTES || '')
      .then((response) => {
        const res: GetStickyNotesApi =
          response.fields as unknown as GetStickyNotesApi;
        data = res.notesList.map((note) => ({ ...note.fields }));
      })
      .catch((err) => console.log('Erro:', err));
    dispatch({
      type: ActionTypes.GET_NOTES,
      payload: data
    });
  };
};
