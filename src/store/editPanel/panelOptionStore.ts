import { create } from 'zustand'

export interface PanelOptionStore {
  // Panel options
  title: string
  description: string
  isTransparentBackground: boolean
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  updateIsTransparentBackground: (isTransparentBackground: boolean) => void
}

export const usePanelOptionStore = create<PanelOptionStore>(set => ({
  title: 'Title',
  description: 'description',
  isTransparentBackground: false,
  updateTitle: title => { set(() => ({ title })) },
  updateDescription: description => { set(() => ({ description })) },
  updateIsTransparentBackground: isTransparentBackground => { set(() => ({ isTransparentBackground })) }
}))

export default usePanelOptionStore
