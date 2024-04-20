import { ChartData, DataKey, ChartDataOption, Indicator } from '@/models/chartData'
import { create } from 'zustand'
import { produce, Draft } from 'immer'


interface ChartDataStore {
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
  updateList: (dataKey, list) => set(produce(({ options }: Draft<ChartDataStore>) => {
    options[dataKey].list = list

  })),
  updateOrigin: (dataKey, origin) => set(produce(({ options, results }: Draft<ChartDataStore>) => {
    options[dataKey].origin = origin
    options[dataKey].item = INITIAL_ITEM
    options[dataKey].period = ''
    results[dataKey] = []
  })),
  updateItem: (dataKey, code) => set(produce(({ options, results }: Draft<ChartDataStore>) => {
    options[dataKey].item = options[dataKey].list.find(value => value.code === code) || INITIAL_ITEM
    options[dataKey].period = ''
    results[dataKey] = []
  })),
  updatePeriod: (dataKey, period) => set(produce(({ options, results }: Draft<ChartDataStore>) => {
    options[dataKey].period = period
    results[dataKey] = []
  })),
  updateColor: (dataKey, color) => set(produce(({ options }: Draft<ChartDataStore>) => {
    options[dataKey].color = color
  })),
  updateChartData: (dataKey, chartData) => set(produce(({ results }: Draft<ChartDataStore>) => {
    results[dataKey] = chartData
  }))
}))

export default useChartDataStore