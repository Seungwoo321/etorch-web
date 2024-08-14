import { Indicator, DataPanelItem } from '@/models';
import { create } from 'zustand'

export interface DataOptionStore {
  chartData: unknown[]
  frequency: string
  panels: DataPanelItem[]
  indicators: {
    [key: string]: Indicator[]
  };
  setChartData: (chartData: unknown[]) => void
  setFrequency: (frequency: string) => void;
  createIndicators: (dataSource: string, data: Indicator[]) => void;
  addPanelItem: (item: DataPanelItem) => void;
  updatePanelItem: (id: number, newItem: DataPanelItem) => void;
  removePanelItem: (id: number) => void;
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
  setChartData: (chartData) => set(() => ({ chartData })),
  setFrequency: (frequency) => set(() => ({ frequency })),
  createIndicators: (dataSource, data) => set(state => ({
    indicators: {
      ...state.indicators,
      [dataSource]: data
    }
  })),
  addPanelItem: (item) => set(state => ({
    panels: [...state.panels, item]
  })),
  updatePanelItem: (id, newItem) => set(state => ({
    panels: state.panels.map(panel => panel.id === id ? { ...panel, ...newItem } : panel)
  })),
  removePanelItem: (id) => set(state => ({ panels: state.panels.filter(panel => panel.id !== id )}))
}))

export default useDataOptionStore