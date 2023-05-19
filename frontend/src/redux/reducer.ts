/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PersonalDetails } from 'src/@types/Api';
import { light } from 'src/styles';
import { Theme } from 'src/styles/styled';
import { ActionTypes, AppActions } from './actions';

export type WindowListProps = {
  id: string;
  title: string;
  minimized: boolean;
  content: JSX.Element;
};

export type PortfolioModel = {
  id: number;
  name: string;
  company: string;
  mainImage: string;
  url: string;
  slug: string;
  color: string;
  jobInfo: {
    role: string;
    type: string;
    language: string;
    startDate: {
      month: string;
      year: number;
    };
    endDate?: {
      month?: string;
      year?: number;
    };
    mainTools: Array<string>;
    images: Array<string>;
  };
  text?: string;
};

export type ToolsModel = {
  description: string;
  languages: {
    pro: Array<string>;
    intermediate: Array<string>;
    beginner: Array<string>;
  };
  tools: Array<string>;
};

interface InitialStateModel {
  isLoading: boolean;
  lastType: string;
  TOOLS: ToolsModel | undefined;
  MYINFO: PersonalDetails | undefined;
  PORTFOLIO: Array<PortfolioModel> | undefined;
  windowsList: WindowListProps[];
  taskSettings: boolean;
  theme: Theme;
  windowOnFocus?: string;
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
  windowOnFocus: undefined
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
    default:
      return state;
  }
};
