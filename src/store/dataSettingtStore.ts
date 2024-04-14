import { Indicator } from '@/models/dashboard'
import { create } from 'zustand'

export interface DataSettingOption {
  list: Indicator[],
  origin: string,
  item: Indicator,
  period: string
  color: string
}

export type DataKey = 'first' | 'second';

interface DataSettingStore {
  options: {
    first: DataSettingOption,
    second: DataSettingOption
  },

  updateList: (dataKey: DataKey, indicators: Indicator[]) => void
  updateOrigin: (dataKey: DataKey, origin: string) => void
  updateItem: (dataKey: DataKey, code: string) => void
  updatePeriod: (dataKey: DataKey, period: string) => void
  updateColor: (dataKey: DataKey, color: string) => void
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
  options: {
    first: {
      list: [],
      origin: '',
      item: defaultItem,
      period: '',
      color: '#bbb'
    },
    second: {
      list: [],
      origin: '',
      item: defaultItem,
      period: '',
      color: '#000'
    }
  },

  updateList: (dataKey, list) => set(({ options }) => ({
    options: {
      ...options,
      [dataKey]: {
        ...options[dataKey],
        list
      }
    }
  })),
  updateOrigin: (dataKey, origin) => set(({ options }) => ({
    options: {
      ...options,
      [dataKey]: {
        ...options[dataKey],
        origin
      }
    }
  })),
  updateItem: (dataKey, code) => set(({ options }) => ({
    options: {
      ...options,
      [dataKey]: {
        ...options[dataKey],
        item: options[dataKey].list.find(value => value.code === code) || defaultItem
      }
    }
  })),
  updatePeriod: (dataKey, period) => set(({ options }) => ({
    options: {
      ...options,
      [dataKey]: {
        ...options[dataKey],
        period
      }
    }
  })),
  updateColor: (dataKey, color) => set(({ options }) => ({
    options: {
      ...options,
      [dataKey]: {
        ...options[dataKey],
        color
      }
    }
  })),
}))

export default useDataSettingStore