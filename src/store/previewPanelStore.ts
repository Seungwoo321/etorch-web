import { DataValue } from '@/models'
import { create } from 'zustand'

interface PreviewPanelStore {
  frequency: string;
  setFrequency: (frequency: string) => void;

  lineChartData: {
    [key: string]: DataValue[]  
  };
  updateLineChartData: (panelId: string, data: DataValue[]) => void;
}

const usePreviewPanelStore = create<PreviewPanelStore>(set => ({
  frequency: 'M',
  setFrequency: (frequency) => set({ frequency }),
  
  lineChartData: {},
  updateLineChartData: (panelId, data) => set(state => ({
    lineChartData: {
      ...state.lineChartData,
      [panelId]: data
    }
  }))
}))

export default usePreviewPanelStore