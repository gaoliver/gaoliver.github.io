/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Folder,
  PersonalDetails,
  PortfolioModel,
  ThemeModelApi,
  ToolsModel,
  WindowListProps
} from 'src/@types/Models';
import { light } from 'src/styles';
import { Theme } from 'src/styles/styled';
import { ActionTypes, AppActions } from './actions';
interface InitialStateModel {
  isLoading: boolean;
  lastType: string;
  TOOLS: ToolsModel | undefined;
  MYINFO: PersonalDetails | undefined;
  PORTFOLIO: Array<PortfolioModel> | undefined;
  windowsList: WindowListProps[];
  taskSettings: boolean;
  theme: Theme;
  themeConfig: ThemeModelApi;
  windowOnFocus?: string;
  desktop: Array<Folder>;
}

const initialState: InitialStateModel = {
  isLoading: false,
  lastType: '',
  TOOLS: undefined,
  MYINFO: undefined,
  PORTFOLIO: undefined,
  windowsList: [],
  taskSettings: false,
  theme: light,
  themeConfig: { desktopBackgroundImage: '', mobileBackgroundImage: '' },
  windowOnFocus: undefined,
  desktop: []
};

export const reducer = (
  state: InitialStateModel = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_WINDOW:
      if (
        !state.windowsList.find((window) => window.id === action.payload.id)
      ) {
        state.windowsList.push(action.payload);
      }
      return {
        ...state,
        lastType: action.type,
        windowsList: [...state.windowsList]
      };

    case ActionTypes.WINDOW_ON_FOCUS:
      return {
        ...state,
        windowOnFocus: action.payload.length > 0 ? action.payload : undefined
      };

    case ActionTypes.MINIMIZE_WINDOW:
      return {
        ...state,
        lastType: action.type,
        windowsList: action.payload
      };

    case ActionTypes.CLOSE_WINDOW:
      return {
        ...state,
        lastType: action.type,
        windowsList: action.payload
      };

    case ActionTypes.CLOSE_ALL_APP:
      return {
        ...state,
        lastType: action.type,
        windowsList: []
      };

    case ActionTypes.TOGGLE_TASK_SETTINGS:
      return {
        ...state,
        lastType: action.type,
        taskSettings: !state.taskSettings
      };

    case ActionTypes.TOGGLE_THEME:
      return {
        ...state,
        lastType: action.type,
        theme: action.payload
      };

    case ActionTypes.GET_THEME:
      return {
        ...state,
        lastType: action.type,
        themeConfig: action.payload
      };

    case ActionTypes.ON_SET_TOOLS:
      return {
        ...state,
        lastType: action.type,
        TOOLS: action.payload
      };

    case ActionTypes.ON_SET_INFO:
      return {
        ...state,
        lastType: action.type,
        MYINFO: action.payload
      };

    case ActionTypes.ON_SET_PORTFOLIO:
      return {
        ...state,
        lastType: action.type,
        PORTFOLIO: action.payload
      };

    case ActionTypes.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case ActionTypes.GET_DESKTOP:
      return {
        ...state,
        desktop: action.payload
      };

    default:
      return state;
  }
};
