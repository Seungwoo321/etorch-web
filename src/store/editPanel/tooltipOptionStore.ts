import { create } from 'zustand'

export interface TooltipOptionStore {
  tooltipMode: string
  maxWidth: number
  cursorLineStyle: string
  cursorLineStyleWidth: number
  cursorLineStyleDasharray: string
  updateTooltipMode: (tooltipMode: undefined | string) => void
  updateMaxWidth: (maxWdith: number) => void
  updateCursorLineStyle: (cursorLineStyle: string) => void
  updateCursorLineStyleWidth: (cursorLineStyleWidth: number) => void
  updateCursorLineStyleDasharray: (cursorLineStyleDasharray: string) => void
}

export const useTooltipOptionStore = create<TooltipOptionStore>(set => ({
  tooltipMode: 'default',
  maxWidth: 160,
  cursorLineStyleWidth: 2,
  cursorLineStyleDasharray: '2 2',
  cursorLineStyle: 'dash',
  updateTooltipMode: tooltipMode => set(() => ({ tooltipMode })),
  updateMaxWidth: maxWidth => set(() =>({ maxWidth })),
  updateCursorLineStyle: cursorLineStyle  => set(() => ({ cursorLineStyle })),
  updateCursorLineStyleWidth: cursorLineStyleWidth  => set(() => ({ cursorLineStyleWidth })),
  updateCursorLineStyleDasharray: cursorLineStyleDasharray  => set(() => ({ cursorLineStyleDasharray })),
}))

export default useTooltipOptionStore
