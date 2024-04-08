import { Indicator } from '@/models/indicator'
import { create } from 'zustand'

interface IndicatorState {
  firstList: Indicator[]
  secondList: Indicator[]
  updateFirstList: (indicators: Indicator[]) => void
  updateSecondList: (indicators: Indicator[]) => void
}

const useIndicatorStore = create<IndicatorState>((set) => ({
  firstList: [],
  secondList: [],
  updateFirstList: (indicators: Indicator[]) => set(() => ({ firstList: indicators })),
  updateSecondList: (indicators: Indicator[]) => set(() => ({ secondList: indicators })),
}))

export default useIndicatorStore