'use client';

import { create, } from 'zustand';

export enum VIEWS {
  CHANNELS = 0,
  SINGLE_CHANNEL = 1,
}

interface SidebarState {
  view: VIEWS,
  toChannelsAside: () => void,
  toChannelAside: (channelId: string) => void,

  selectedChannelId: string | null,
  isActive: boolean,
  openSidebar: () => void,
  closeSidebar: () => void,
}


const useSidebar = create<SidebarState>()((set) => {

  return {
    view: VIEWS.CHANNELS,
    toChannelsAside: () => set(() => ({ view: VIEWS.CHANNELS })),
    toChannelAside: (channelId) => set(() => ({
      view: VIEWS.SINGLE_CHANNEL,
      selectedChannelId: channelId
    })),

    selectedChannelId: null,
    isActive: false,
    openSidebar: () => set((state) => ({ isActive: true })),
    closeSidebar: () => set((state) => ({ isActive: false })),
  }
});

export default useSidebar;