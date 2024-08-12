import { VerticalAlignmentType, HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent';
import { LayoutType } from 'recharts/types/util/types';
import { create } from 'zustand'

export interface LegendOptionStore {
  visibility: boolean;
  layout: LayoutType;
  align: HorizontalAlignmentType ;
  verticalAlign: VerticalAlignmentType;
  updateVisibility: (visibility: boolean) => void;
  updateLayout: (layout: LayoutType) => void;
  updateAlign: (align: HorizontalAlignmentType) => void;
  updateVerticalAlign: (verticalAlign: VerticalAlignmentType) => void;
}

export const useLegendOptionStore = create<LegendOptionStore>(set => ({
  visibility: true,
  layout: 'horizontal',
  align: 'left',
  verticalAlign: 'bottom',
  updateVisibility: (visibility) => set(() => ({ visibility })),
  updateLayout: (layout) => set(() => ({ layout })),
  updateAlign: (align) => set(() => ({ align })),
  updateVerticalAlign: (verticalAlign) => set(() => ({ verticalAlign }))
}))

export default useLegendOptionStore