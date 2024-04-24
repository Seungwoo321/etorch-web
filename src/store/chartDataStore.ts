import { ChartData, DataKey, ChartDataOption, Indicator } from '@/models/chartData'
import { create } from 'zustand'
import { produce, Draft } from 'immer'


interface ChartDataStore {
  updateKey: DataKey | null,
  options: {
    first: ChartDataOption,
    second: ChartDataOption
  },
  results: {
    first: ChartData,
    second: ChartData
  },
  updateList: (dataKey: DataKey, indicators: Indicator[]) => void
  updateOrigin: (dataKey: DataKey, origin: string) => void
  updateItem: (dataKey: DataKey, code: string) => void
  updatePeriod: (dataKey: DataKey, period: string) => void
  updateColor: (dataKey: DataKey, color: string) => void
  updateChartData: (dataKey: DataKey, chartData: ChartData) => void
}

const INITIAL_ITEM = {
    origin: '',
    name: '',
    description: '',
    unit_ko: '',
    unit_en: '',
    code: '',
    hasMonth: false,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  }

const useChartDataStore = create<ChartDataStore>((set) => ({
  updateKey: null,
  options: {
    first: {
      list: [],
      origin: '',
      item: INITIAL_ITEM,
      period: '',
      color: '#bbb'
    },
    second: {
      list: [],
      origin: '',
      item: INITIAL_ITEM,
      period: '',
      color: '#000'
    }
  },

  results: {
    first: [],
    second: []
  },
  updateList: (dataKey, list) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].list = list

  })),
  updateOrigin: (dataKey, origin) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].origin = origin
    state.options[dataKey].item = INITIAL_ITEM
    state.options[dataKey].period = ''
    state.results[dataKey] = []
  })),
  updateItem: (dataKey, code) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].item = state.options[dataKey].list.find(value => value.code === code) || INITIAL_ITEM
    state.options[dataKey].period = ''
    state.results[dataKey] = []
  })),
  updatePeriod: (dataKey, period) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].period = period
    state.results[dataKey] = []
  })),
  updateColor: (dataKey, color) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].color = color
  })),
  updateChartData: (dataKey, chartData) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.results[dataKey] = chartData
  }))
}))

export default useChartDataStore