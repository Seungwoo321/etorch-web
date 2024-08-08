import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Brush
} from "recharts";
// import { usePreviewPanelStore } from "@/store/previewPanelStore"
import { useDataPanelStore, DataPanelStore } from "@/store/dataPanelStore";
import { useEffect, useState } from "react";
import { DataPanelItem } from "@/models";
import { useTooltipOptionStore, TooltipOptionStore } from "@/store/editPanel/tooltipOptionStore";
import { usePanelOptionStore, PanelOptionStore } from "@/store/editPanel/panelOptionStore";

const selectIsTransparentBackground = (state: PanelOptionStore) => state.isTransparentBackground
const selectIsHidden = (state: TooltipOptionStore) => state.isHidden
const selectPanelsData = (state: DataPanelStore) => state.panels.filter(panel => panel.data.length)


function LineChartContainer() {
  const isTransparentBackground = usePanelOptionStore(selectIsTransparentBackground)
  const isHidden = useTooltipOptionStore(selectIsHidden)
  const panelsData = useDataPanelStore(selectPanelsData)
  const [lineChartData, setLineChartData] = useState<unknown[]>([])

  console.log(isHidden)
  useEffect(() => {
    setLineChartData(combineDataByFrequency(panelsData, 'M'))
  }, [panelsData])
  return (
    <ResponsiveContainer className={isTransparentBackground ? "" : "bg-primary-foreground"} width="100%" height="100%" minHeight={0} minWidth={0}>
      <LineChart width={200} height={300} data={lineChartData} margin={{ top: 24, right: 48, bottom: 16, left: 0 }}>
        
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
        <Tooltip
          cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2, strokeDasharray: '2 2' }}
          content={<CustomTooltip />}
        />

        {/* <Tooltip
          // content={<CustomTooltip />}
          separator=""
          label={"text"}
          itemStyle={{
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: "160px",
            width: "100%"
          }}
          wrapperStyle={{
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          labelStyle={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))'
          }}
        /> */}
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
  const isHidden = useTooltipOptionStore(selectIsHidden)
  
  if (isHidden) return null

  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col bg-background border-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] min-w-[160px]">
        <div className="flex flex-col flex-1 p-2">
          <div className="flex items-center">
            <div className="text-ellipsis overflow-hidden cursor-pointer">
              {label}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-1 border-t-[1px] border-solid border-[rgba(204, 204, 220, 0.2)] p-2">
          {payload.map(item => (
            <div className="flex items-start justify-between mr-0">
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
      });
    });
  return Object.values(combinedData);
};

export default LineChartContainer