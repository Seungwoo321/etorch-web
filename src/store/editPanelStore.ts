import { create } from 'zustand'

interface EditPanelStore {
  // Panel options
  title: string
  description: string
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void

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

const useEditPanelStore = create<EditPanelStore>(set => ({
  title: 'Title',
  description: 'description',
  updateTitle: title => set(() => ({ title })),
  updateDescription: description => set(() => ({ description })),

  graphStyle: 'Line',
  updateGraphStyle: graphStyle => set(() => ({ graphStyle })),
  
  lineWidth: 1,
  updateLineWidth: lineWidth => set(() => ({ lineWidth })),
  fillOpacity: 35,
  updateFillOpacity: fillOpacity => set(() => ({ fillOpacity }))
}))

export default useEditPanelStore