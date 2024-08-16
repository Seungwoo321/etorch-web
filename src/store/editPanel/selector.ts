import {
  type XAxisOptionStore,
  type DataOptionStore,
  type TooltipOptionStore,
  type LegendOptionStore,
  type PanelOptionStore,
  type GraphStylesOptionStore
} from './'

/** XAxisOptionStore */
export const selectXAxisDataKey = (state: XAxisOptionStore): XAxisOptionStore['xAxisDataKey'] => state.xAxisDataKey
export const selectXAxisVisibility = (state: XAxisOptionStore): XAxisOptionStore['xAxisVisibility'] => state.xAxisVisibility
export const selectXAxisType = (state: XAxisOptionStore): XAxisOptionStore['xAxisType'] => state.xAxisType
export const selectXAxisTickAngle = (state: XAxisOptionStore): XAxisOptionStore['xAxisTickAngle'] => state.xAxisTickAngle
export const selectXAxisDomainMin = (state: XAxisOptionStore): XAxisOptionStore['xAxisDomainMin'] => state.xAxisDomainMin
export const selectXAxisDomainMax = (state: XAxisOptionStore): XAxisOptionStore['xAxisDomainMax'] => state.xAxisDomainMax
export const selectXAxisAxisLine = (state: XAxisOptionStore): XAxisOptionStore['xAxisAxisLine'] => state.xAxisAxisLine
export const selectXAxisTickSize = (state: XAxisOptionStore): XAxisOptionStore['xAxisTickSize'] => state.xAxisTickSize
export const selectXAxisTickLine = (state: XAxisOptionStore): XAxisOptionStore['xAxisTickLine'] => state.xAxisTickLine
export const selectXAxisColor = (state: XAxisOptionStore): XAxisOptionStore['xAxisColor'] => state.xAxisColor
export const selecteUpdateXAxisDataKey = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisDataKey'] => state.updateXAxisDataKey
export const selectUpdateXAxisVisibility = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisVisibility'] => state.updateXAxisVisibility
export const selectUpdateXAxisType = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisType'] => state.updateXAxisType
export const selectUpdateXAxisTickSize = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisTickSize'] => state.updateXAxisTickSize
export const selectUpdateXAxisTickAngle = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisTickAngle'] => state.updateXAxisTickAngle
export const selectUpdateXAxisDomainMin = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisDomainMin'] => state.updateXAxisDomainMin
export const selectUpdateXAxisDomainMax = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisDomainMax'] => state.updateXAxisDomainMax
export const selectUpdateXAxisAxisLine = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisAxisLine'] => state.updateXAxisAxisLine
export const selectUpdateXAxisTickLine = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisTickLine'] => state.updateXAxisTickLine
export const selectUpdateXAxisColor = (state: XAxisOptionStore): XAxisOptionStore['updateXAxisColor'] => state.updateXAxisColor

/** DataOptionStore */
export const selectChartData = (state: DataOptionStore): DataOptionStore['chartData'] => state.chartData
export const selectIndicators = (state: DataOptionStore): DataOptionStore['indicators'] => state.indicators
export const selectFrequency = (state: DataOptionStore): DataOptionStore['frequency'] => state.frequency
export const selectPanelById = (id: number) => (state: DataOptionStore) => state.panels.find(panel => panel.id === id)
export const selectPanelsData = (state: DataOptionStore): DataOptionStore['panels'] => state.panels.filter(panel => (panel.data.length > 0) && panel.frequency === state.frequency)
export const selectPanelsAllData = (state: DataOptionStore): DataOptionStore['panels'] => state.panels.filter(panel => panel.data.length)
export const selectPanelIds = (state: DataOptionStore): number[] => state.panels.map(panel => panel.id)
export const selectSetChartData = (state: DataOptionStore): DataOptionStore['setChartData'] => state.setChartData
export const selectSetFrequency = (state: DataOptionStore): DataOptionStore['setFrequency'] => state.setFrequency
export const selectAddPanelItem = (state: DataOptionStore): DataOptionStore['addPanelItem'] => state.addPanelItem
export const selectUpdatePanelItem = (state: DataOptionStore): DataOptionStore['updatePanelItem'] => state.updatePanelItem
export const selectRemovePanelItem = (state: DataOptionStore): DataOptionStore['removePanelItem'] => state.removePanelItem
export const selectCreateIndicators = (state: DataOptionStore): DataOptionStore['createIndicators'] => state.createIndicators

/** TooltipOptionStore */
export const selectTooltipMode = (state: TooltipOptionStore): string => state.tooltipMode
export const selectTooltipMaxWidth = (state: TooltipOptionStore): TooltipOptionStore['tooltiMaxWidth'] => state.tooltiMaxWidth
export const selectCursorLineStyle = (state: TooltipOptionStore): TooltipOptionStore['cursorLineStyle'] => state.cursorLineStyle
export const selectCursorLineStyleWidth = (state: TooltipOptionStore): TooltipOptionStore['cursorLineStyleWidth'] => state.cursorLineStyleWidth
export const selectCursorLineStyleDasharray = (state: TooltipOptionStore): TooltipOptionStore['cursorLineStyleDasharray'] => state.cursorLineStyleDasharray
export const selectUpdateTolltipMode = (state: TooltipOptionStore): TooltipOptionStore['updateTooltipMode'] => state.updateTooltipMode
export const selectUpdateTooltipMaxWidth = (state: TooltipOptionStore): TooltipOptionStore['updateTooltipMaxWidth'] => state.updateTooltipMaxWidth
export const selectUpdateCursorLineStyle = (state: TooltipOptionStore): TooltipOptionStore['updateCursorLineStyle'] => state.updateCursorLineStyle
export const selectUpdateCursorLineStyleWidth = (state: TooltipOptionStore): TooltipOptionStore['updateCursorLineStyleWidth'] => state.updateCursorLineStyleWidth
export const selectUpdateCursorLineStyleDasharray = (state: TooltipOptionStore): TooltipOptionStore['updateCursorLineStyleDasharray'] => state.updateCursorLineStyleDasharray

/** LegendOptionStore */
export const selectLegendVisibility = (store: LegendOptionStore): LegendOptionStore['legendVisibility'] => store.legendVisibility
export const selectLegendLayout = (store: LegendOptionStore): LegendOptionStore['legendLayout'] => store.legendLayout
export const selectLegendAlign = (store: LegendOptionStore): LegendOptionStore['legendAlign'] => store.legendAlign
export const selectLegendVerticalAlign = (store: LegendOptionStore): LegendOptionStore['legendVerticalAlign'] => store.legendVerticalAlign
export const selectUpdateLegendVisibility = (store: LegendOptionStore): LegendOptionStore['updateLegendVisibility'] => store.updateLegendVisibility
export const selectUpdateLegendLayout = (store: LegendOptionStore): LegendOptionStore['updateLegendLayout'] => store.updateLegendLayout
export const selectUpdateLegendAlign = (store: LegendOptionStore): LegendOptionStore['updateLegendAlign'] => store.updateLegendAlign
export const selectUpdateLegendVerticalAlign = (store: LegendOptionStore): LegendOptionStore['updateLegendVerticalAlign'] => store.updateLegendVerticalAlign

/** PanelOptionStore */
export const selectIsTransparentBackground = (state: PanelOptionStore): PanelOptionStore['isTransparentBackground'] => state.isTransparentBackground
export const selectTitle = (state: PanelOptionStore): PanelOptionStore['title'] => state.title
export const selectDescription = (state: PanelOptionStore): PanelOptionStore['description'] => state.description
export const selectUpdateTitle = (state: PanelOptionStore): PanelOptionStore['updateTitle'] => state.updateTitle
export const selectUpdateDescription = (state: PanelOptionStore): PanelOptionStore['updateDescription'] => state.updateDescription
export const selectUpdateIsTransparentBackground = (state: PanelOptionStore): PanelOptionStore['updateIsTransparentBackground'] => state.updateIsTransparentBackground

/** GraphStylesOptionStore */
export const selectGraphStyle = (state: GraphStylesOptionStore): GraphStylesOptionStore['graphStyle'] => state.graphStyle
export const selectLineWidth = (state: GraphStylesOptionStore): GraphStylesOptionStore['lineWidth'] => state.lineWidth
export const selectFillOpacity = (state: GraphStylesOptionStore): GraphStylesOptionStore['fillOpacity'] => state.fillOpacity
export const selectUpdateGraphStyle = (state: GraphStylesOptionStore): GraphStylesOptionStore['updateGraphStyle'] => state.updateGraphStyle
export const selectUpdateLineWidth = (state: GraphStylesOptionStore): GraphStylesOptionStore['updateLineWidth'] => state.updateLineWidth
export const selectUpdateFillOpacity = (state: GraphStylesOptionStore): GraphStylesOptionStore['updateFillOpacity'] => state.updateFillOpacity
