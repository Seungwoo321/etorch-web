import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Brush
} from "recharts";
import { useDataPanelStore, DataPanelStore } from "@/store/dataPanelStore";
import { useEffect, useState } from "react";
import { DataPanelItem } from "@/models";
import { useTooltipOptionStore, TooltipOptionStore } from "@/store/editPanel/tooltipOptionStore";
import { usePanelOptionStore, PanelOptionStore } from "@/store/editPanel/panelOptionStore";
import { useLegendOptionStore, LegendOptionStore } from "@/store/editPanel/legendOptionStore";


type CombineData = {
  [date: string]: {
    date: string;
    [x: string]: string | number;
  }
}

const combineDataByFrequency = (panels: DataPanelItem[], frequency: string) => {
  const combinedData: CombineData = {}
  panels
    .filter(panel => panel.frequency === frequency)
    .forEach((panel) => {
      panel.data.forEach(item => {
        if (!combinedData[item.date]) {
          combinedData[item.date] = {
            date: item.date,
            [panel.indicatorCode]: 0
          }
        }
        combinedData[item.date][panel.indicatorCode] = item.value;
      })
    })
  return Object.values(combinedData);
}

const selectIsTransparentBackground = (state: PanelOptionStore) => state.isTransparentBackground
const selectFrequency = (state: DataPanelStore) => state.frequency
const selectPanelsData = (state: DataPanelStore) => state.panels.filter(panel => panel.data.length && panel.frequency === state.frequency)
const selectCursorLineStyle = (state: TooltipOptionStore) => state.cursorLineStyle
const selectTooltipMode = (state: TooltipOptionStore) => state.tooltipMode
const selectMaxWidth = (state: TooltipOptionStore) => state.maxWidth
const selectCursorLineStyleWidth = (state: TooltipOptionStore) => state.cursorLineStyleWidth
const selectCursorLineStyleDasharray = (state: TooltipOptionStore) => state.cursorLineStyleDasharray

const selectVisibility = (store: LegendOptionStore) => store.visibility
const selectLayout = (store: LegendOptionStore) => store.layout
const selectAlign = (store: LegendOptionStore) => store.align
const selectVerticalAlign = (store: LegendOptionStore) => store.verticalAlign

function LineChartContainer() {
  const isTransparentBackground = usePanelOptionStore(selectIsTransparentBackground)
  const frequency = useDataPanelStore(selectFrequency)
  const panelsData = useDataPanelStore(selectPanelsData)
  
  const tooltipMode = useTooltipOptionStore(selectTooltipMode)
  const cursorLineStyle = useTooltipOptionStore(selectCursorLineStyle)
  const cursorLineStyleWidth = useTooltipOptionStore(selectCursorLineStyleWidth)
  const cursorLineStyleDasharray = useTooltipOptionStore(selectCursorLineStyleDasharray)

  const visibility = useLegendOptionStore(selectVisibility)
  const layout = useLegendOptionStore(selectLayout)
  const align = useLegendOptionStore(selectAlign)
  const verticalAlign = useLegendOptionStore(selectVerticalAlign)

  const [lineChartData, setLineChartData] = useState<unknown[]>([])

  useEffect(() => {
    setLineChartData(combineDataByFrequency(panelsData, frequency))
  }, [frequency, panelsData])
  return (
    <ResponsiveContainer className={isTransparentBackground ? "" : "bg-primary-foreground"} width="100%" height="100%" minHeight={0} minWidth={0}>
      <LineChart width={200} height={300} data={lineChartData} margin={{ top: 24, right: 20, bottom: 8, left: 0 }}>

        <CartesianGrid stroke="hsl(var(--muted))" strokeDasharray="0" />
        
        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
        
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          yAxisId={1}
        />
      
        {panelsData.map((panel) => (
          <Line
            key={`line-${panel.indicatorCode}`}
            type="monotone"
            dataKey={panel.indicatorCode}
            stroke={'rgb(115, 191, 105)'}
            yAxisId={1}
          />
        ))}

        {/* <XAxis dataKey="date" stroke="#777474" />
        {lineChartItems.map(({ code, yAxisId, label }) => (
          <YAxis
            key={`yAxis-${code}${yAxisId}`}
            label={label}
            stroke="#777474"
            yAxisId={yAxisId}
            orientation={yAxisId === "2" ? "right" : "left"}

          />
        ))} */}
        {/* {lineChartItems.map(({ code, referenceLineColor, referenceLineType, yAxisId }, index) => (
          referenceLineType !== "N/A"
            ? <ReferenceLine
                key={`ref-${referenceLineType}-${index}`}
                y={referenceLine[code]}
                yAxisId={yAxisId}
                strokeDasharray="3 3"
                stroke={referenceLineColor}
                ifOverflow="extendDomain"
            />
            : null)
        )} */}
        {/* <Brush /> */}
        {visibility ? (
          <Legend
            layout={layout}
            verticalAlign={verticalAlign}
            align={align}
          // width={140}
          // height={120}
          // iconSize={14}
          // iconType="line" // line plainLine square rect circle cross diamond star triangle wye
          />
        ) : null}

        <Tooltip
          active={tooltipMode === 'default' ? undefined : (tooltipMode === 'active')}
          cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: cursorLineStyleWidth, strokeDasharray: cursorLineStyle === 'dash' ? cursorLineStyleDasharray : '' }}
          content={<CustomTooltip/>}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    [key: string]: string | number
  }[]; 
  label?: string | number;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const maxWidth = useTooltipOptionStore(selectMaxWidth)
  if (active && payload && payload.length) {
    return (
      <div className={`flex flex-col bg-background border-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] w-[${maxWidth}px] overflow-hidden`}>
        <div className="flex flex-col flex-1 p-2">
          <div className="flex items-center">
            <div className="text-ellipsis overflow-hidden cursor-pointer">
              {label}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-1 border-t-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] p-2">
          {payload.map(item => (
            <div className="flex items-start justify-between mr-0" key={`${item.name}-${item.value}`}>
              <div className="flex items-center">
                {item.name}
              </div>
              <div className="flex items-center">
                <div className="text-ellipsis overflow-hidden cursor-pointer whitespace-normal break-words"> 
                  {item.value}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }
}

export default LineChartContainer