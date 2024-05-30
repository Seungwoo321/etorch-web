import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { LineChartItem } from '@/models/dashboard';
import { getIndicatorData, getIndicators } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { ChartData, DataKey } from '@/models/chartData';
import LineChartContainer from "../charts/LineChartContainer";
import {
  Pencil2Icon
} from "@radix-ui/react-icons"
import { useChartDataStore } from "@/store";
type LineChartCardProps = {
  mode: string
  firstLine: LineChartItem
  secondLine: LineChartItem
}

interface LineItem {
  [key: string]: string | number | null;
}

interface referenceLineMap {
  [code: string]: number
}

const addLineChartData = (
  lineItems: LineItem[],
  lineChartItem: LineChartItem,
  chartData: ChartData
) => {
  
  if (!lineItems.length || lineItems[0].date !== chartData[0].date) {
    return chartData.map(item => {
      return {
        date: item.date,
        [lineChartItem.code]: item.value
      }
    })
  }
  return lineItems.map((item, index) => {
    return {
      ...item,
      [lineChartItem.code]: chartData[index].date === item.date ? chartData[index].value : null
    }
  })
}

const getLineAverage = (chartData: ChartData ) => {
  return chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length
}

const calcReferenceValue = (lineChartItem: LineChartItem, chartData: ChartData) => {
  return lineChartItem.referenceLineType === 'avg' ? getLineAverage(chartData) : (lineChartItem.referenceLineValue || 0)
}

function LineChartCard({
  mode,
  firstLine,
  secondLine
}: LineChartCardProps) {
  const navigate = useNavigate();
  const {
    updateOptions,
    updateIndicatorList
  } = useChartDataStore()
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [referenceLine, setReferenceLine] = useState<referenceLineMap>({})

  async function fetchIndicatorData(lineChartItem: LineChartItem) {
    if (!lineChartItem.reload) return
    const { data } = await getIndicatorData(lineChartItem);
    setLineItems(lineItems => addLineChartData(lineItems, lineChartItem, data));
    setReferenceLine(referenceLine => ({ ...referenceLine, [lineChartItem.code]: calcReferenceValue(lineChartItem, data) }))
  }
  useEffect(() => {
    fetchIndicatorData(firstLine)
  }, [firstLine])

  useEffect(() => {
    fetchIndicatorData(secondLine)
  }, [secondLine])

  const fetchIndicatorList = async (dataKey: DataKey, origin: string) => {
    try {
      const { indicators } = await getIndicators(origin);
      updateIndicatorList(dataKey, indicators);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditChart = async () => {
    await fetchIndicatorList('first', firstLine.origin)
    updateOptions('first', firstLine)
    if (secondLine.reload) {
      await fetchIndicatorList('second', secondLine.origin)
      updateOptions('second', secondLine)
    }
    
    navigate('/create-chart')
  }

  if (!firstLine.reload && !secondLine.reload) {
    return (
      <div className='md:order-1'>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex justify-center items-center">
            No data
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <Card className="h-full grid select-none">
      <div className="p-6 flex flex-row items-center justify-between space-y-1.5">
        <h3 className="font-semibold leading-none tracking-tight">
          {firstLine.reload ? firstLine.code : ''}
          {firstLine.reload && secondLine.reload ? ' vs ' : ''}
          {secondLine.reload ? secondLine.code : ''}
        </h3>
        {
          mode === "view"
          ? <Pencil2Icon
              className="cursor-pointer"
              onClick={handleEditChart}
            />
          : null
        }

      </div>
      <CardContent>
        <LineChartContainer
          lineItems={lineItems}
          lineChartItems={[firstLine, secondLine].filter(item => item.reload)}
          referenceLine={referenceLine}
        />
      </CardContent>
    </Card>
  )
}

export default LineChartCard
