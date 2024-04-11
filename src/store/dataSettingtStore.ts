import { Indicator } from '@/models/dashboard'
import { create } from 'zustand'

interface DataSettingStore {
  firstList: Indicator[]
  firstOrigin: string
  firstCode: string
  firstItem: Indicator
  secondList: Indicator[]
  secondOrigin: string
  secondCode: string
  // chartSetting: LineChart
  updateFirstList: (indicators: Indicator[]) => void
  updateFirstOrigin: (firstOrigin: string) => void
  updateSecondList: (indicators: Indicator[]) => void
  updateFirstCode: (firstCode: string) => void
  updateFirstItem: (firstCode: string) => void

  updateSecondOrigin: (secondOrigin: string) => void
  updateSecondCode: (secondCode: string) => void
}

const defaultItem = {
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
  firstList: [],
  firstOrigin: '',
  firstItem: defaultItem,
  firstCode: '',
  secondList: [],
  secondOrigin: '',
  secondCode: '',
  // chartSetting: {
  //   line: [],
  //   xAxisLine: {
  //     type: '',
  //     dataKey: '',
  //     stroke: ''
  //   },
  //   yAxisLine: []
  // },
  updateFirstList: (indicators: Indicator[]) => set(() => ({ firstList: indicators })),
  updateFirstOrigin: (firstOrigin: string) => set(() => ({ firstOrigin })),
  updateFirstCode: (firstCode: string) => set(() => ({ firstCode })),
  updateFirstItem: (firstCode: string) => set(({ firstList }) => ({ firstItem: firstList.find(value => value.code === firstCode) || defaultItem })),

  updateSecondList: (indicators: Indicator[]) => set(() => ({ secondList: indicators })),
  updateSecondOrigin: (secondOrigin: string) => set(() => ({ secondOrigin })),
  updateSecondCode: (secondCode: string) => set(() => ({ secondCode }))
}))

export default useDataSettingStore