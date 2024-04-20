import { ChartData, DataKey, DataSettingOption, Indicator } from '@/models/dataSetting'
import { create } from 'zustand'
import { produce, Draft } from 'immer'


interface DataSettingStore {
  options: {
    first: DataSettingOption,
    second: DataSettingOption
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

const useDataSettingStore = create<DataSettingStore>((set) => ({
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
  updateList: (dataKey, list) => set(produce(({ options }: Draft<DataSettingStore>) => { options[dataKey].list = list })),
  updateOrigin: (dataKey, origin) => set(produce(({ options }: Draft<DataSettingStore>) => { options[dataKey].origin = origin })),
  updateItem: (dataKey, code) => set(produce(({ options }: Draft<DataSettingStore>) => { options[dataKey].item = options[dataKey].list.find(value => value.code === code) || INITIAL_ITEM })),
  updatePeriod: (dataKey, period) => set(produce(({ options }: Draft<DataSettingStore>) => { options[dataKey].period = period })),
  updateColor: (dataKey, color) => set(produce(({ options }: Draft<DataSettingStore>) => { options[dataKey].color = color })),
  updateChartData: (dataKey, chartData) => set(produce(({ results }: Draft<DataSettingStore>) => { results[dataKey] = chartData }))
}))

export default useDataSettingStore