import { DataPanelItem, type DataValue } from '@/models'
import {
  type DataOptionStore,
  type TooltipOptionStore
} from './'

const uniqueDataKeyReducer = (acc: string[], cur: DataValue): string[] => {
  Object.keys(cur).forEach((key) => {
    if (!acc.includes(key)) {
      acc.push(key)
    }
  })
  return acc
}
const dataMapReducer = (acc: Record<string, DataPanelItem[]>, cur: DataPanelItem) => {
  if (!(cur.unit in acc)) {
    acc = {
      ...acc,
      [cur.unit]: []
    }
  }
  acc[cur.unit].push(cur)
  return acc
}

/** YAxisOptionStore */
/** XAxisOptionStore */

/** DataOptionStore */
export const selectUniqueDataKeys = (state: DataOptionStore): string[] => state.chartData.reduce<string[]>(uniqueDataKeyReducer, [])
export const selectPanelById = (id: number) => (state: DataOptionStore) => state.panels.find(panel => panel.id === id)
export const selectPanelDataMapByUnit = (state: DataOptionStore) => state.panels.filter(panel => panel.unit).reduce<Record<string, DataPanelItem[]>>(dataMapReducer, {})
export const selectDataKeysByUnit = (unit: string) => (state: DataOptionStore) => state.panels.filter(panel => panel.unit === unit)
export const selectPanelsData = (state: DataOptionStore): DataOptionStore['panels'] => state.panels.filter(panel => (panel.data.length > 0) && panel.frequency === state.frequency)
export const selectPanelsDataByUnit = (unit: string) => (state: DataOptionStore): DataOptionStore['panels'] => state.panels.filter(panel => (panel.data.length > 0) && panel.frequency === state.frequency && panel.unit === unit)
export const selectPanelsAllData = (state: DataOptionStore): DataOptionStore['panels'] => state.panels.filter(panel => panel.data.length)
export const selectPanelIds = (state: DataOptionStore): number[] => state.panels.map(panel => panel.id)

/** TooltipOptionStore */
export const selectTooltipMode = (state: TooltipOptionStore): string => state.tooltipMode

/** LegendOptionStore */

/** PanelOptionStore */

/** GraphStylesOptionStore */
