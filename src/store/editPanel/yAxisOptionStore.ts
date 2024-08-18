import { create } from 'zustand'

export interface YAxisOptionStore {
  
  yAxisDataKey: string
  yAxisVisibility: boolean
  yAxisType: 'number' | 'category' | undefined
  yAxisTickCount: number
  yAxisTickSize: number
  yAxisDomainMin: number | 'auto'
  yAxisDomainMax: number | 'auto'
  yAxisAxisLine: boolean
  yAxisTickLine: boolean
  yAxisColor: string
  updateYAxisDataKey: (yAxisDataKey: string) => void
  updateYAxisVisibility: (yAxisVisibility: boolean) => void
  updateYAxisType: (yAxisType: 'number' | 'category' | undefined) => void
  updateYAxisTickCount: (yAxisTickCount: number) => void
  updateYAxisTickSize: (yAxisTickSize: number) => void
  updateYAxisDomainMin: (yAxisDomainMin: number | 'auto') => void
  updateYAxisDomainMax: (yAxisDomainMax: number | 'auto') => void
  updateYAxisAxisLine: (yAxisAxisLine: boolean) => void
  updateYAxisTickLine: (yAxisTickLine: boolean) => void
  updateYAxisColor: (yAxisColor: string) => void
}

export const useYAxisOptionStore = create<YAxisOptionStore>(set => ({
  yAxisDataKey: '',
  yAxisVisibility: true,
  yAxisType: 'number',
  yAxisTickCount: 5,
  yAxisTickSize: 6,
  yAxisDomainMin: 0,
  yAxisDomainMax: 'auto',
  yAxisAxisLine: true,
  yAxisTickLine: true,
  yAxisColor: 'hsl(var(--muted-foreground))',
  updateYAxisDataKey: yAxisDataKey => { set(() => ({ yAxisDataKey })) },
  updateYAxisVisibility: yAxisVisibility => { set(() => ({ yAxisVisibility })) },
  updateYAxisType: yAxisType => { set(() => ({ yAxisType })) },
  updateYAxisTickCount: yAxisTickCount => { set(() => ({ yAxisTickCount }))},
  updateYAxisTickSize: yAxisTickSize => { set(() => ({ yAxisTickSize })) },
  updateYAxisDomainMin: yAxisDomainMin => { set(() => ({ yAxisDomainMin })) },
  updateYAxisDomainMax: yAxisDomainMax => { set(() => ({ yAxisDomainMax })) },
  updateYAxisAxisLine: yAxisAxisLine => { set(() => ({ yAxisAxisLine })) },
  updateYAxisTickLine: yAxisTickLine => { set(() => ({ yAxisTickLine })) },
  updateYAxisColor: yAxisColor => { set(() => ({ yAxisColor })) }
}))

export default useYAxisOptionStore
