import { DataKey, Indicator } from '@/models/chartData'
import { create } from 'zustand'
import { produce, Draft } from 'immer'
import { LineChartItem } from '@/models/dashboard'


interface ChartDataStore {
  mergedYAxis: boolean
  updateKey: DataKey | null,
  options: {
    first: LineChartItem,
    second: LineChartItem
  },
  first: {
    indicatorList: Indicator[],
    selectedItem: Indicator
  },
  second: {
    indicatorList: Indicator[],
    selectedItem: Indicator
  }
  updateOptions: (dataKey: DataKey, option: LineChartItem) => void
  updateMergedYAxis: (isMerged: boolean) => void
  updateIndicatorList: (dataKey: DataKey, indicators: Indicator[]) => void
  updateOrigin: (dataKey: DataKey, origin: string) => void
  updateCode: (dataKey: DataKey, code: string) => void
  updatePeriod: (dataKey: DataKey, period: string) => void
  updateStroke: (dataKey: DataKey, stroke: string) => void
  updateReferenceLineType: (dataKey: DataKey, referenceLineType: string) => void 
  updateReferenceLineValue: (dataKey: DataKey, referenceLineValue: number) => void
  updateReferenceLineColor: (dataKey: DataKey, referenceLineColor: string) => void
  updateReloadData: (dataKey: DataKey, reload: boolean) => void
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

const useChartDataStore = create<ChartDataStore>(set => ({
  mergedYAxis: false,
  updateKey: null,
  options: {
    first: {
      origin: '',
      code: '',
      period: '',
      stroke: '#f00000',
      yAxisId: '1',
      referenceLineColor: '#000000',
      referenceLineType: 'N/A',
      label: {
        value: '',
        position: 'insideTopLeft',
        angle: 90
      },
      reload: false
    },
    second: {
      origin: '',
      code: '',
      period: '',
      stroke: '#0000f0',
      yAxisId: '2',
      referenceLineColor: '#000000',
      referenceLineType: 'N/A',
      label: {
        value: '',
        position: 'insideTopRight',
        angle: -90
      },
      reload: false
    }
  },
  first: {
    indicatorList: [],
    selectedItem: INITIAL_ITEM
  },
  second: {
    indicatorList: [],
    selectedItem: INITIAL_ITEM
  },
  updateOptions: (dataKey, option) => set(produce((state: Draft<ChartDataStore>) => {
    state.options[dataKey] = option
  })),
  updateMergedYAxis: (isMerged) => set(produce((state: Draft<ChartDataStore>) => {
    state.options.second.yAxisId = isMerged ? '1' : '2'
  })),
  updateIndicatorList: (dataKey, list) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state[dataKey].indicatorList = list
    
  })),
  updateOrigin: (dataKey, origin) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].origin = origin
    state[dataKey].selectedItem = INITIAL_ITEM
    state.options[dataKey].code = ''
    state.options[dataKey].period = ''
    state.options[dataKey].reload = false
  })),
  updateCode: (dataKey, code) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].code = code
    state[dataKey].selectedItem = state[dataKey].indicatorList.find(value => value.code === code) || INITIAL_ITEM
    state.options[dataKey].period = ''
    state.options[dataKey].reload = false
  })),
  updatePeriod: (dataKey, period) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].period = period
    state.options[dataKey].reload = false
  })),
  updateStroke: (dataKey, lineColor) => set(produce((state: Draft<ChartDataStore>) => {
    state.updateKey = dataKey
    state.options[dataKey].stroke = lineColor
  })),
  updateReferenceLineType: (dataKey, referenceLineType) => set(produce((state: Draft<ChartDataStore>) => {
    state.options[dataKey].referenceLineType = referenceLineType
  })),
  updateReferenceLineValue: (dataKey, referenceLineValue) => set(produce((state: Draft<ChartDataStore>) => {
    state.options[dataKey].referenceLineValue = referenceLineValue
  })),
  updateReferenceLineColor: (dataKey, referenceLineColor) => set(produce((state: Draft<ChartDataStore>) => {
    state.options[dataKey].referenceLineColor = referenceLineColor
  })),
  updateReloadData: (dataKey, reload) => set(produce((state: Draft<ChartDataStore>) => {
    const diffKey = dataKey === 'first' ? 'second' : 'first'
    if (state.options[diffKey].period !== state.options[dataKey].period) {
      state.options[diffKey].reload = false
    }
    state.options[dataKey].reload = reload
  }))
}))

export default useChartDataStore