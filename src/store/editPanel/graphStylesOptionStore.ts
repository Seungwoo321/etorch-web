import { create } from 'zustand'

export interface GraphStylesOptionStore {
  // Graph styles
  graphStyle: string
  updateGraphStyle: (graphStyle: string) => void

  // -> Line
  lineWidth: number
  updateLineWidth: (lineWidth: number) => void
  fillOpacity: number
  updateFillOpacity: (fillOpacity: number) => void
  // -> Bar

  // -> Point
}

export const useGraphStylesOptionStore = create<GraphStylesOptionStore>(set => ({
  graphStyle: 'Line',
  updateGraphStyle: graphStyle => { set(() => ({ graphStyle })) },

  lineWidth: 1,
  updateLineWidth: lineWidth => { set(() => ({ lineWidth })) },
  fillOpacity: 35,
  updateFillOpacity: fillOpacity => { set(() => ({ fillOpacity })) }
}))

export default useGraphStylesOptionStore
