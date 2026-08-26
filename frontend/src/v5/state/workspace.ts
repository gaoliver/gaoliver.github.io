import type { AppId } from '../types/content';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export interface WorkspaceState {
  windows: WindowState[];
  mobileApp: AppId | null;
  dark: boolean;
  islandExpanded: boolean;
  nextZ: number;
}

export type WorkspaceAction =
  | { type: 'open'; appId: AppId; title: string }
  | { type: 'close'; id: string }
  | { type: 'focus'; id: string }
  | { type: 'minimize'; id: string }
  | { type: 'maximize'; id: string }
  | { type: 'move'; id: string; x: number; y: number }
  | { type: 'openMobile'; appId: AppId }
  | { type: 'closeMobile' }
  | { type: 'toggleTheme' }
  | { type: 'toggleIsland' };

export const initialWorkspace: WorkspaceState = {
  windows: [],
  mobileApp: null,
  dark: true,
  islandExpanded: false,
  nextZ: 2,
};

export function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case 'open': {
      const existing = state.windows.find((window) => window.appId === action.appId);
      if (existing) {
        return {
          ...state,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((window) => window.id === existing.id
            ? { ...window, minimized: false, z: state.nextZ }
            : window),
        };
      }
      const offset = state.windows.length * 28;
      const isExplorer = action.appId === 'work' || action.appId.startsWith('folder:');
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: [...state.windows, {
          id: `${action.appId}-${Date.now()}`,
          appId: action.appId,
          title: action.title,
          x: 88 + offset,
          y: 74 + offset,
          width: isExplorer ? 820 : 620,
          height: isExplorer ? 590 : 460,
          z: state.nextZ,
          minimized: false,
          maximized: false,
        }],
      };
    }
    case 'close':
      return { ...state, windows: state.windows.filter((window) => window.id !== action.id) };
    case 'focus':
      return { ...state, nextZ: state.nextZ + 1, windows: state.windows.map((window) => window.id === action.id ? { ...window, z: state.nextZ } : window) };
    case 'minimize':
      return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, minimized: true } : window) };
    case 'maximize':
      return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, maximized: !window.maximized } : window) };
    case 'move':
      return { ...state, windows: state.windows.map((window) => window.id === action.id ? { ...window, x: action.x, y: action.y } : window) };
    case 'openMobile':
      return { ...state, mobileApp: action.appId, islandExpanded: false };
    case 'closeMobile':
      return { ...state, mobileApp: null };
    case 'toggleTheme':
      return { ...state, dark: !state.dark };
    case 'toggleIsland':
      return { ...state, islandExpanded: !state.islandExpanded };
  }
}
