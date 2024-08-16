import {
  ComposedChart,
  // Bar,
  // Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  // ReferenceLine,
  ResponsiveContainer,
  type TooltipProps
  // Brush
} from 'recharts'
import {
  useLegendOptionStore,
  usePanelOptionStore,
  useTooltipOptionStore,
  useDataOptionStore,
  useXAxisOptionStore
} from '@/store/editPanel'
import {
  selectChartData,
  selectPanelsData,
  selectCursorLineStyle,
  selectTooltipMode,
  selectTooltipMaxWidth,
  selectCursorLineStyleWidth,
  selectCursorLineStyleDasharray,
  selectLegendVisibility,
  selectLegendLayout,
  selectLegendAlign,
  selectLegendVerticalAlign,
  selectIsTransparentBackground,
  selectXAxisAxisLine,
  selectXAxisColor,
  selectXAxisDomainMax,
  selectXAxisDomainMin,
  selectXAxisTickAngle,
  selectXAxisTickLine,
  selectXAxisTickSize,
  selectXAxisType,
  selectXAxisVisibility,
  selectXAxisDataKey
} from '@/store/editPanel/selector'

function LineChartContainer (): JSX.Element {
  const isTransparentBackground = usePanelOptionStore(selectIsTransparentBackground)
  const panelsData = useDataOptionStore(selectPanelsData)
  const chartData = useDataOptionStore(selectChartData)
  const tooltipMode = useTooltipOptionStore(selectTooltipMode)
  const cursorLineStyle = useTooltipOptionStore(selectCursorLineStyle)
  const cursorLineStyleWidth = useTooltipOptionStore(selectCursorLineStyleWidth)
  const cursorLineStyleDasharray = useTooltipOptionStore(selectCursorLineStyleDasharray)

  const legendVisibility = useLegendOptionStore(selectLegendVisibility)
  const legendLayout = useLegendOptionStore(selectLegendLayout)
  const legendAlign = useLegendOptionStore(selectLegendAlign)
  const legendVerticalAlign = useLegendOptionStore(selectLegendVerticalAlign)

  const xAxisDataKey = useXAxisOptionStore(selectXAxisDataKey)
  const xAxisVisibility = useXAxisOptionStore(selectXAxisVisibility)
  const xAxisType = useXAxisOptionStore(selectXAxisType)
  const xAxisTickAngle = useXAxisOptionStore(selectXAxisTickAngle)
  const xAxisDomainMin = useXAxisOptionStore(selectXAxisDomainMin)
  const xAxisDomainMax = useXAxisOptionStore(selectXAxisDomainMax)
  const xAxisAxisLine = useXAxisOptionStore(selectXAxisAxisLine)
  const xAxisTickSize = useXAxisOptionStore(selectXAxisTickSize)
  const xAxisTickLine = useXAxisOptionStore(selectXAxisTickLine)
  const xAxisColor = useXAxisOptionStore(selectXAxisColor)

  return (
    <ResponsiveContainer className={isTransparentBackground ? '' : 'bg-primary-foreground'} width="100%" height="100%" minHeight={0} minWidth={0}>
      <ComposedChart width={200} height={300} data={chartData} margin={{ top: 24, right: 20, bottom: 8, left: 0 }}>

        <CartesianGrid
          vertical={true}
          horizontal={true}
          stroke="hsl(var(--muted))"
          strokeDasharray="0"
        />

        <XAxis
          // padding={{ left: 20, right: 200 }}
          hide={!xAxisVisibility}
          dataKey={xAxisDataKey}
          stroke={xAxisColor}
          type={xAxisType}
          domain={[xAxisDomainMin, xAxisDomainMax]}
          angle={xAxisTickAngle}
          tickSize={xAxisTickSize}
          tickLine={xAxisTickLine}
          axisLine={xAxisAxisLine}
          allowDecimals={true}
          allowDataOverflow={true}
          // tickFormatter={(value) => {
          //   // return value.replace('-', '. ')
          //   return `${value.substring(2, 4)}-${value.substring(5, 7) }`
          // }}
        />

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
        {/* {panelsData.map((panel) => (
          <Area
            key={`area-${panel.indicatorCode}`}
            type="monotone"
            dataKey={panel.indicatorCode}
            stroke={'rgb(115, 191, 105)'}
            yAxisId={1}
          />
        ))} */}
        {/* {panelsData.map((panel) => (
          <Bar
            key={`bar-${panel.indicatorCode}`}
            type="monotone"
            dataKey={panel.indicatorCode}
            stroke={'rgb(115, 191, 105)'}
            yAxisId={1}
          />
        ))} */}
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
        {legendVisibility && (
          <Legend
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
          // width={140}
          // height={120}
          // iconSize={14}
          // iconType="line" // line plainLine square rect circle cross diamond star triangle wye
          />
        )}

        <Tooltip
          active={tooltipMode === 'default' ? undefined : (tooltipMode === 'active')}
          cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: cursorLineStyleWidth, strokeDasharray: cursorLineStyle === 'dash' ? cursorLineStyleDasharray : '' }}
          content={<CustomTooltip/>}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<Record<string, string | number>>
  label?: string | number
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }: TooltipProps<string, string>) => {
  const maxWidth = useTooltipOptionStore(selectTooltipMaxWidth)
  if (active === true && payload?.length != null) {
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
          {payload.map((item, index) => (
            <div className="flex items-start justify-between mr-0" key={`${index}-${item.name}-${item.value}`}>
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
