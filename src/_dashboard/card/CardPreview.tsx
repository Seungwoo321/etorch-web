import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useChartDataStore } from '@/store';
import { ChartData, ChartDataOption, DataKey } from '@/models/chartData';
import { useEffect, useState } from 'react';


interface LineItem {
  [key: string]: string | number | null;
}

const addLineData = (
  lineData: LineItem[],
  results: { first: ChartData, second: ChartData },
  options: { first: ChartDataOption, second: ChartDataOption },
  dataKey: DataKey
) => {
  const result = results[dataKey]
  const keyName = options[dataKey].item.name
  if (!result.length) {
    return lineData.map(item => {
      return {
        ...item,
        [keyName]: null
      }
    })
  }
  if (lineData[0]?.date !== result[0]?.date) {
    console.log(keyName)
    return result.map(item => ({ date: item.date, [keyName]: item.value }))
  }
  return lineData.map((item, index) => {
    return {
      ...item,
      [keyName]: item.date === result[index]?.date ? result[index].value : null
    }
  })
}

const CardPreview = () => {
  const [lineChart, setLineChart] = useState<LineItem[]>([])
  const {
    mergedYAxis,
    options,
    results,
    updateKey
  } = useChartDataStore()

  const y1AxisLabel = {
    value: options.first.item.unit_ko,
    angle: 90,
    position: 'insideTopLeft'
  }
  const y2AxisLabel = {
    value: options.second.item.unit_ko,
    angle: -90,
    position: 'insideTopRight'
  }

  useEffect(() => {
    if (updateKey) {
      setLineChart(lineChart => addLineData(lineChart, results, options, updateKey))
    }
  }, [options, results, updateKey]);

  return (
    <div className="md:order-1">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={600} height={300} data={lineChart} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <Line type="monotone" dataKey={options.first.item.name} stroke={options.first.color} yAxisId="1" />
              <Line type="monotone" dataKey={options.second.item.name} stroke={options.second.color} yAxisId={mergedYAxis ? "1" : "2"} />
              <CartesianGrid stroke="#ddd" strokeDasharray="0" />
              <XAxis dataKey="date" stroke='#777474' />
              <YAxis label={y1AxisLabel} stroke='#777474' yAxisId="1" />
              <YAxis label={y2AxisLabel} stroke="#777474" orientation="right" allowDataOverflow type="number" yAxisId="2" />
              {options.first.referenceValue ? <ReferenceLine y={options.first.referenceValue} label="y1" stroke="red" strokeDasharray="3 3" yAxisId="1" ifOverflow="extendDomain"/> : null}
              {options.second.referenceValue ? <ReferenceLine y={options.second.referenceValue} label="y2" stroke="blue" strokeDasharray="3 3" yAxisId="2" ifOverflow="extendDomain" /> : null}
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardPreview
1