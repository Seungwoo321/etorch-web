import { create } from 'zustand'
import createSelectors from '../createSelectors'

export interface PanelOptionStore {
  // Panel options
  title: string
  description: string
  isTransparentBackground: boolean
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  updateIsTransparentBackground: (isTransparentBackground: boolean) => void
}

export const usePanelOptionStoreBase = create<PanelOptionStore>(set => ({
  title: 'Title',
  description: 'description',
  isTransparentBackground: false,
  updateTitle: title => { set(() => ({ title })) },
  updateDescription: description => { set(() => ({ description })) },
  updateIsTransparentBackground: isTransparentBackground => { set(() => ({ isTransparentBackground })) }
}))

export const usePanelOptionStore = createSelectors(usePanelOptionStoreBase)

export default usePanelOptionStore
