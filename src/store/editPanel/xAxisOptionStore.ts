import { create } from 'zustand'

export interface XAxisOptionStore {
  xAxisDataKey: string
  xAxisVisibility: boolean
  xAxisType: 'number' | 'category' | undefined
  xAxisTickSize: number
  xAxisTickAngle: number
  xAxisDomainMin: number | 'auto'
  xAxisDomainMax: number | 'auto'
  xAxisAxisLine: boolean
  xAxisTickLine: boolean
  xAxisColor: string
  updateXAxisDataKey: (xAxisDataKey: string) => void
  updateXAxisVisibility: (xAxisVisibility: boolean) => void
  updateXAxisType: (xAxisType: 'number' | 'category' | undefined) => void
  updateXAxisTickSize: (xAxisTickSize: number) => void
  updateXAxisTickAngle: (xAxisTickAngle: number) => void
  updateXAxisDomainMin: (xAxisDomainMin: number | 'auto') => void
  updateXAxisDomainMax: (xAxisDomainMax: number | 'auto') => void
  updateXAxisAxisLine: (xAxisAxisLine: boolean) => void
  updateXAxisTickLine: (xAxisTickLine: boolean) => void
  updateXAxisColor: (xAxisColor: string) => void
}

export const useXAxisOptionStore = create<XAxisOptionStore>(set => ({
  xAxisDataKey: 'date',
  xAxisVisibility: true,
  xAxisType: 'category',
  xAxisTickSize: 6,
  xAxisTickAngle: 0,
  xAxisDomainMin: 0,
  xAxisDomainMax: 'auto',
  xAxisAxisLine: true,
  xAxisTickLine: true,
  xAxisColor: 'hsl(var(--muted-foreground))',
  updateXAxisDataKey: xAxisDataKey => set(() => ({ xAxisDataKey })),
  updateXAxisVisibility: xAxisVisibility => set(() => ({ xAxisVisibility })),
  updateXAxisType: xAxisType => set(() => ({ xAxisType })),
  updateXAxisTickSize: xAxisTickSize => set(() => ({ xAxisTickSize })),
  updateXAxisTickAngle: xAxisTickAngle => set(() => ({ xAxisTickAngle })),
  updateXAxisDomainMin: xAxisDomainMin => set(() => ({ xAxisDomainMin })),
  updateXAxisDomainMax: xAxisDomainMax => set(() => ({ xAxisDomainMax })),
  updateXAxisAxisLine: xAxisAxisLine => set(() => ({ xAxisAxisLine })),
  updateXAxisTickLine: xAxisTickLine => set(() => ({ xAxisTickLine })),
  updateXAxisColor: xAxisColor => set(() => ({ xAxisColor })),
}))

export default useXAxisOptionStore