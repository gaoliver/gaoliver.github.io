import { describe, expect, it, vi } from 'vitest';
import { initialWorkspace, workspaceReducer } from './workspace';

describe('workspaceReducer', () => {
  it('opens and reuses a single desktop window per app', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1);
    const opened = workspaceReducer(initialWorkspace, { type: 'open', appId: 'about', title: 'About' });
    const reopened = workspaceReducer(opened, { type: 'open', appId: 'about', title: 'About' });
    expect(reopened.windows).toHaveLength(1);
    expect(reopened.windows[0].minimized).toBe(false);
    vi.restoreAllMocks();
  });

  it('keeps mobile navigation independent from desktop windows', () => {
    const state = workspaceReducer(initialWorkspace, { type: 'openMobile', appId: 'work' });
    expect(state.mobileApp).toBe('work');
    expect(state.windows).toEqual([]);
  });

  it('supports focus, minimize and close lifecycle actions', () => {
    vi.spyOn(Date, 'now').mockReturnValue(2);
    let state = workspaceReducer(initialWorkspace, { type: 'open', appId: 'contact', title: 'Contact' });
    const id = state.windows[0].id;
    state = workspaceReducer(state, { type: 'minimize', id });
    expect(state.windows[0].minimized).toBe(true);
    state = workspaceReducer(state, { type: 'close', id });
    expect(state.windows).toEqual([]);
    vi.restoreAllMocks();
  });

  it('restores maximized windows and toggles appearance', () => {
    vi.spyOn(Date, 'now').mockReturnValue(3);
    let state = workspaceReducer(initialWorkspace, { type: 'open', appId: 'work', title: 'Work' });
    const id = state.windows[0].id;
    state = workspaceReducer(state, { type: 'maximize', id });
    expect(state.windows[0].maximized).toBe(true);
    state = workspaceReducer(state, { type: 'maximize', id });
    expect(state.windows[0].maximized).toBe(false);
    state = workspaceReducer(state, { type: 'toggleTheme' });
    expect(state.dark).toBe(false);
    vi.restoreAllMocks();
  });
});
