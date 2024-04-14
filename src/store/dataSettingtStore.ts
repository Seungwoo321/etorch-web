import { Indicator } from '@/models/dashboard'
import { create } from 'zustand'

interface DataSettingStore {
  firstOption: {
    list: Indicator[],
    origin: string,
    item: Indicator,
    period: string
  },
  secondOption: {
    list: Indicator[],
    origin: string,
    item: Indicator,
    period: string
  }

  updateFirstList: (indicators: Indicator[]) => void 
  updateFirstOrigin: (origni: string) => void
  updateFirstItem: (code: string) => void
  updateFirstPeriod: (period: string) => void

  updateSecondList: (indicators: Indicator[]) => void
  updateSecondOrigin: (origni: string) => void
  updateSecondItem: (code: string) => void
  updateSecondPeriod: (period: string) => void
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
  firstOption: {
    list: [],
    origin: '',
    item: defaultItem,
    period: ''
  },
  secondOption: {
    list: [],
    origin: '',
    item: defaultItem,
    period: ''
  },

  updateFirstList: (list: Indicator[]) => set(({ firstOption }) => ({ firstOption: { ...firstOption, list } })),
  updateFirstOrigin: (origin: string) => set(({ firstOption }) => ({ firstOption: { ...firstOption, origin } })),
  updateFirstItem: (code: string) => set(({ firstOption }) => ({ firstOption: { ...firstOption, item: firstOption.list.find(value => value.code === code) || defaultItem} })),
  updateFirstPeriod: (period: string) => set(({ firstOption }) => ({ firstOption: { ...firstOption, period }})),


  updateSecondList: (list: Indicator[]) => set(({ secondOption }) => ({ secondOption: { ...secondOption, list } })),
  updateSecondOrigin: (origin: string) => set(({ secondOption }) => ({ secondOption: { ...secondOption, origin } })),
  updateSecondItem: (code: string) => set(({ secondOption }) => ({ secondOption: { ...secondOption, item: secondOption.list.find(value => value.code === code) || defaultItem }})),
  updateSecondPeriod: (period: string) => set(({ secondOption }) => ({ secondOption: { ...secondOption, period }}))
}))

export default useDataSettingStore