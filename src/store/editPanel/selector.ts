import {
  XAxisOptionStore,
  DataOptionStore,
  TooltipOptionStore,
  LegendOptionStore,
  PanelOptionStore,
  GraphStylesOptionStore
} from "./"

/** XAxisOptionStore */
export const selectXAxisDataKey = (state: XAxisOptionStore) => state.xAxisDataKey
export const selectXAxisVisibility = (state: XAxisOptionStore) => state.xAxisVisibility
export const selectXAxisType = (state: XAxisOptionStore) => state.xAxisType
export const selectXAxisTickAngle = (state: XAxisOptionStore) => state.xAxisTickAngle
export const selectXAxisDomainMin = (state: XAxisOptionStore) => state.xAxisDomainMin
export const selectXAxisDomainMax = (state: XAxisOptionStore) => state.xAxisDomainMax
export const selectXAxisAxisLine = (state: XAxisOptionStore) => state.xAxisAxisLine
export const selectXAxisTickSize = (state: XAxisOptionStore) => state.xAxisTickSize
export const selectXAxisTickLine = (state: XAxisOptionStore) => state.xAxisTickLine
export const selectXAxisColor = (state: XAxisOptionStore) => state.xAxisColor
export const selecteUpdateXAxisDataKey = (state: XAxisOptionStore) => state.updateXAxisDataKey
export const selectUpdateXAxisVisibility = (state: XAxisOptionStore) => state.updateXAxisVisibility
export const selectUpdateXAxisType = (state: XAxisOptionStore) => state.updateXAxisType
export const selectUpdateXAxisTickSize = (state: XAxisOptionStore) => state.updateXAxisTickSize
export const selectUpdateXAxisTickAngle = (state: XAxisOptionStore) => state.updateXAxisTickAngle
export const selectUpdateXAxisDomainMin = (state: XAxisOptionStore) => state.updateXAxisDomainMin
export const selectUpdateXAxisDomainMax = (state: XAxisOptionStore) => state.updateXAxisDomainMax
export const selectUpdateXAxisAxisLine = (state: XAxisOptionStore) => state.updateXAxisAxisLine
export const selectUpdateXAxisTickLine = (state: XAxisOptionStore) => state.updateXAxisTickLine
export const selectUpdateXAxisColor = (state: XAxisOptionStore) => state.updateXAxisColor

/** DataOptionStore */
export const selectChartData = (state: DataOptionStore) => state.chartData
export const selectIndicators = (state: DataOptionStore) =>  state.indicators
export const selectFrequency = (state: DataOptionStore) => state.frequency
export const selectPanelById = (id: number) => (state: DataOptionStore) => state.panels.find(panel => panel.id === id)
export const selectPanelsData = (state: DataOptionStore) => state.panels.filter(panel => panel.data.length && panel.frequency === state.frequency)
export const selectPanelsAllData = (state: DataOptionStore) => state.panels.filter(panel => panel.data.length)
export const selectPanelIds = (state: DataOptionStore) => state.panels.map(panel => panel.id)
export const selectSetChartData = (state: DataOptionStore) => state.setChartData
export const selectSetFrequency = (state: DataOptionStore) => state.setFrequency
export const selectAddPanelItem = (state: DataOptionStore) => state.addPanelItem
export const selectUpdatePanelItem = (state: DataOptionStore) => state.updatePanelItem
export const selectRemovePanelItem = (state: DataOptionStore) => state.removePanelItem
export const selectCreateIndicators = (state: DataOptionStore) => state.createIndicators

/** TooltipOptionStore */
export const selectTooltipMode = (state: TooltipOptionStore) => state.tooltipMode
export const selectTooltipMaxWidth = (state: TooltipOptionStore) => state.tooltiMaxWidth
export const selectCursorLineStyle = (state: TooltipOptionStore) => state.cursorLineStyle
export const selectCursorLineStyleWidth = (state: TooltipOptionStore) => state.cursorLineStyleWidth
export const selectCursorLineStyleDasharray = (state: TooltipOptionStore) => state.cursorLineStyleDasharray
export const selectUpdateTolltipMode = (state: TooltipOptionStore) => state.updateTooltipMode
export const selectUpdateTooltipMaxWidth = (state: TooltipOptionStore) => state.updateTooltipMaxWidth
export const selectUpdateCursorLineStyle = (state: TooltipOptionStore) => state.updateCursorLineStyle
export const selectUpdateCursorLineStyleWidth = (state: TooltipOptionStore) => state.updateCursorLineStyleWidth
export const selectUpdateCursorLineStyleDasharray = (state: TooltipOptionStore) => state.updateCursorLineStyleDasharray

/** LegendOptionStore */
export const selectLegendVisibility = (store: LegendOptionStore) => store.legendVisibility
export const selectLegendLayout = (store: LegendOptionStore) => store.legendLayout
export const selectLegendAlign = (store: LegendOptionStore) => store.legendAlign
export const selectLegendVerticalAlign = (store: LegendOptionStore) => store.legendVerticalAlign
export const selectUpdateLegendVisibility = (store: LegendOptionStore) => store.updateLegendVisibility
export const selectUpdateLegendLayout = (store: LegendOptionStore) => store.updateLegendLayout
export const selectUpdateLegendAlign = (store: LegendOptionStore) => store.updateLegendAlign
export const selectUpdateLegendVerticalAlign = (store: LegendOptionStore) => store.updateLegendVerticalAlign

/** PanelOptionStore */
export const selectIsTransparentBackground = (state: PanelOptionStore) => state.isTransparentBackground
export const selectTitle = (state: PanelOptionStore) => state.title
export const selectDescription = (state: PanelOptionStore) => state.description
export const selectUpdateTitle = (state: PanelOptionStore) => state.updateTitle
export const selectUpdateDescription = (state: PanelOptionStore) => state.updateDescription
export const selectUpdateIsTransparentBackground = (state: PanelOptionStore) => state.updateIsTransparentBackground


/** GraphStylesOptionStore */
export const selectGraphStyle = (state: GraphStylesOptionStore) => state.graphStyle
export const selectLineWidth = (state: GraphStylesOptionStore) => state.lineWidth
export const selectFillOpacity = (state: GraphStylesOptionStore) => state.fillOpacity
export const selectUpdateGraphStyle = (state: GraphStylesOptionStore) => state.updateGraphStyle
export const selectUpdateLineWidth = (state: GraphStylesOptionStore) => state.updateLineWidth
export const selectUpdateFillOpacity = (state: GraphStylesOptionStore) => state.updateFillOpacity