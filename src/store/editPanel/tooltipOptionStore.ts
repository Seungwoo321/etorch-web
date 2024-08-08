import { create } from 'zustand'

export interface TooltipOptionStore {
  isHidden: boolean
  updateIsHidden: (isHidden: boolean) => void
}

export const useTooltipOptionStore = create<TooltipOptionStore>(set => ({
  isHidden: false,
  updateIsHidden: isHidden => set(() => ({ isHidden }))
}))

export default useTooltipOptionStore
