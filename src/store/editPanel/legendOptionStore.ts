import { VerticalAlignmentType, HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent';
import { LayoutType } from 'recharts/types/util/types';
import { create } from 'zustand'

export interface LegendOptionStore {
  legendVisibility: boolean;
  legendLayout: LayoutType;
  legendAlign: HorizontalAlignmentType ;
  legendVerticalAlign: VerticalAlignmentType;
  updateLegendVisibility: (visibility: boolean) => void;
  updateLegendLayout: (layout: LayoutType) => void;
  updateLegendAlign: (align: HorizontalAlignmentType) => void;
  updateLegendVerticalAlign: (verticalAlign: VerticalAlignmentType) => void;
}

export const useLegendOptionStore = create<LegendOptionStore>(set => ({
  legendVisibility: true,
  legendLayout: 'horizontal',
  legendAlign: 'left',
  legendVerticalAlign: 'bottom',
  updateLegendVisibility: (legendVisibility) => set(() => ({ legendVisibility })),
  updateLegendLayout: (legendLayout) => set(() => ({ legendLayout })),
  updateLegendAlign: (legendAlign) => set(() => ({ legendAlign })),
  updateLegendVerticalAlign: (legendVerticalAlign) => set(() => ({ legendVerticalAlign }))
}))

export default useLegendOptionStore