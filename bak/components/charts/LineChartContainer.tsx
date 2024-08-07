import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  // Brush
} from "recharts";
import { LineChartItem } from "@/models/dashboard";
type LineChartContainerProps = {
  lineItems: LineItem[],
  lineChartItems: LineChartItem[],
  referenceLine: referenceLineMap
}

interface LineItem {
  [key: string]: string | number | null;
}

interface referenceLineMap {
  [code: string]: number
}

function LineChartContainer({
  lineItems,
  lineChartItems,
  referenceLine
}: LineChartContainerProps) {
  return (
    <ResponsiveContainer width={100} height={100}>
      <LineChart width={200} height={100} data={lineItems} margin={{ top: 5, right: 20, bottom: 15, left: 20 }}>

        {lineChartItems.map(({ code, stroke, yAxisId }) => (
          <Line
            key={`line-${code}${yAxisId}`}
            type="monotone"
            dataKey={code}
            stroke={stroke}
            yAxisId={yAxisId}
          />
        ))}

        <CartesianGrid stroke="#ddd" strokeDasharray="0" />
        <XAxis dataKey="date" stroke="#777474" />
        {lineChartItems.map(({ code, yAxisId, label }) => (
          <YAxis
            key={`yAxis-${code}${yAxisId}`}
            label={label}
            stroke="#777474"
            yAxisId={yAxisId}
            orientation={yAxisId === "2" ? "right" : "left"}
            
          />
        ))}
        {lineChartItems.map(({ code, referenceLineColor, referenceLineType, yAxisId }, index) => (
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
        )}
        {/* <Brush /> */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartContainer