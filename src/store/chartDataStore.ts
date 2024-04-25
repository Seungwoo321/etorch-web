import { ChartData, DataKey, ChartDataOption, Indicator } from '@/models/chartData'
import { create } from 'zustand'
import { produce, Draft } from 'immer'


interface ChartDataStore {
  mergedYAxis: boolean
  updateKey: DataKey | null,
  options: {
    first: ChartDataOption,
    second: ChartDataOption
  },
  results: {
    first: ChartData,
    second: ChartData
  },
  updateMergedYAxis: (isMerged: boolean) => void
  updateList: (dataKey: DataKey, indicators: Indicator[]) => void
  updateOrigin: (dataKey: DataKey, origin: string) => void
  updateItem: (dataKey: DataKey, code: string) => void
  updatePeriod: (dataKey: DataKey, period: string) => void
  updateLineColor: (dataKey: DataKey, lineColor: string) => void
  updateChartData: (dataKey: DataKey, chartData: ChartData) => void
  updateReferenceLineType: (dataKey: DataKey, referenceLineType: string) => void 
  updateReferenceLineValue: (dataKey: DataKey, referenceLineValue: number) => void
  updateReferenceLineColor: (dataKey: DataKey, referenceLineColor: string) => void
  getLineAverage: (dataKey: DataKey) => number
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

const useChartDataStore = create<ChartDataStore>((set, get) => ({
  mergedYAxis: false,
  updateKey: null,
  options: {
    first: {
      list: [],
      origin: '',
      item: INITIAL_ITEM,
      period: '',
      lineColor: '#000000',
      referenceLineColor: '#f00000',
      referenceLineType: 'N/A'
    },
    second: {
      list: [],
      origin: '',
      item: INITIAL_ITEM,
      period: '',
      lineColor: '#eeeeee',
      referenceLineColor: '#0000f0',
      referenceLineType: 'N/A'
    }
  },

  results: {
    first: [],
    second: []
  },
  updateMergedYAxis: (isMerged) => set(() => ({ mergedYAxis: isMerged })),
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
  updateLineColor: (dataKey, lineColor) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].lineColor = lineColor
  })),
  updateChartData: (dataKey, chartData) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.results[dataKey] = chartData
  })),
  updateReferenceLineType: (dataKey, referenceLineType) => set(produce((state: Draft<ChartDataStore>) => {
    // state.updateKey = dataKey
    state.options[dataKey].referenceLineType = referenceLineType

  })),
  updateReferenceLineValue: (dataKey, referenceLineValue) => set(produce((state: Draft<ChartDataStore>) => {
    // state.updateKey = dataKey
    state.options[dataKey].referenceLineValue = referenceLineValue
  })),
  updateReferenceLineColor: (dataKey, referenceLineColor) => set(produce((state: Draft<ChartDataStore>) => {
    // state.updateKey = dataKey
    state.options[dataKey].referenceLineColor = referenceLineColor
  })),
  getLineAverage: (dataKey) => {
    const lines = get().results[dataKey]
    return lines.reduce((acc, cur) => acc + cur.value, 0) / lines.length
  }
}))

export default useChartDataStore