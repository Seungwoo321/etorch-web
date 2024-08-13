import {
  DataOptionStore,
  TooltipOptionStore,
  LegendOptionStore,
  PanelOptionStore,
  GraphStylesOptionStore
} from "./"

/** DataOptionStore */
export const selectIndicators = (state: DataOptionStore) =>  state.indicators
export const selectFrequency = (state: DataOptionStore) => state.frequency
export const selectPanelById = (id: number) => (state: DataOptionStore) => state.panels.find(panel => panel.id === id)
export const selectPanelsData = (state: DataOptionStore) => state.panels.filter(panel => panel.data.length && panel.frequency === state.frequency)
export const selectPanelsAllData = (state: DataOptionStore) => state.panels.filter(panel => panel.data.length)
export const selectPanelIds = (state: DataOptionStore) => state.panels.map(panel => panel.id)
export const selectAddPanelItem = (state: DataOptionStore) => state.addPanelItem
export const selectSetFrequency = (state: DataOptionStore) => state.setFrequency
export const selectUpdatePanelItem = (state: DataOptionStore) => state.updatePanelItem
export const selectRemovePanelItem = (state: DataOptionStore) => state.removePanelItem
export const selectCreateIndicators = (state: DataOptionStore) => state.createIndicators

/** TooltipOptionStore */
export const selectCursorLineStyle = (state: TooltipOptionStore) => state.cursorLineStyle
export const selectTooltipMode = (state: TooltipOptionStore) => state.tooltipMode
export const selectMaxWidth = (state: TooltipOptionStore) => state.maxWidth
export const selectCursorLineStyleWidth = (state: TooltipOptionStore) => state.cursorLineStyleWidth
export const selectCursorLineStyleDasharray = (state: TooltipOptionStore) => state.cursorLineStyleDasharray
export const selectUpdateTolltipMode = (state: TooltipOptionStore) => state.updateTooltipMode
export const selectUpdateMaxWidth = (state: TooltipOptionStore) => state.updateMaxWidth
export const selectUpdateCursorLineStyle = (state: TooltipOptionStore) => state.updateCursorLineStyle
export const selectUpdateCursorLineStyleWidth = (state: TooltipOptionStore) => state.updateCursorLineStyleWidth
export const selectUpdateCursorLineStyleDasharray = (state: TooltipOptionStore) => state.updateCursorLineStyleDasharray

/** LegendOptionStore */
export const selectVisibility = (store: LegendOptionStore) => store.visibility
export const selectLayout = (store: LegendOptionStore) => store.layout
export const selectAlign = (store: LegendOptionStore) => store.align
export const selectVerticalAlign = (store: LegendOptionStore) => store.verticalAlign
export const selectUpdateVisibility = (store: LegendOptionStore) => store.updateVisibility
export const selectUpdateLayout = (store: LegendOptionStore) => store.updateLayout
export const selectUpdateAlign = (store: LegendOptionStore) => store.updateAlign
export const selectUpdateVerticalAlign = (store: LegendOptionStore) => store.updateVerticalAlign

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