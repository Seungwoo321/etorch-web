import { type Indicator, type DataPanelItem, type DataValue } from '@/models'
import { create } from 'zustand'

type CombineData = Record<string, DataValue>
const combineDataByFrequency = (panels: DataPanelItem[], frequency: string): DataValue[] => {
  const combinedData: CombineData = {}
  panels
    .filter(panel => panel.frequency === frequency)
    .forEach((panel) => {
      panel.data.forEach(item => {
        if (!(item.date in combinedData)) {
          combinedData[item.date] = {
            date: item.date,
            [panel.indicatorCode]: 0
          }
        }
        combinedData[item.date][panel.indicatorCode] = item.value
      })
    })
  return Object.values(combinedData)
}

export interface DataOptionStore {
  chartData: DataValue[]
  frequency: string
  panels: DataPanelItem[]
  indicators: Record<string, Indicator[]>
  setChartData: () => void
  setFrequency: (frequency: string) => void
  createIndicators: (dataSource: string, data: Indicator[]) => void
  addPanelItem: (item: DataPanelItem) => void
  updatePanelItem: (id: number, newItem: DataPanelItem) => void
  removePanelItem: (id: number) => void
}

export const useDataOptionStore = create<DataOptionStore>(set => ({
  chartData: [],
  frequency: '',
  panels: [],
  indicators: {
    kosis: [],
    ecos: [],
    oecd: []
  },
  setChartData: () => {
    set((state) => ({
      chartData: combineDataByFrequency(state.panels, state.frequency)
    }))
  },
  setFrequency: (frequency) => { set(() => ({ frequency })) },
  createIndicators: (dataSource, data) => {
    set(state => ({
      indicators: {
        ...state.indicators,
        [dataSource]: data
      }
    }))
  },
  addPanelItem: (item) => {
    set(state => ({
      panels: [...state.panels, item]
    }))
  },
  updatePanelItem: (id, newItem) => {
    set(state => ({
      panels: state.panels.map(panel => panel.id === id ? { ...panel, ...newItem } : panel)
    }))
  },
  removePanelItem: (id) => { set(state => ({ panels: state.panels.filter(panel => panel.id !== id) })) }
}))

export default useDataOptionStore
