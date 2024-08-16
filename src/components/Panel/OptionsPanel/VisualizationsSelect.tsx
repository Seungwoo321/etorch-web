import { type ReactElement, useState } from 'react'
import {
  ChartSpline,
  ChartNoAxesColumn,
  ChartNoAxesGantt,
  ChartPie,
  Gauge,
  Table,
  Grid3X3,
  Type
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Visualization {
  icon: ReactElement
  value: string
  label: string
  description: string
}

const visualizations: Visualization[] = [
  {
    icon: <ChartSpline />,
    value: 'timeseries',
    label: 'Time series',
    description: 'Time based line, area and bar charts'
  },
  {
    icon: <ChartNoAxesColumn />,
    value: 'barchart',
    label: 'Bar Chart',
    description: 'Categorical charts with group support'
  },
  {
    icon: <Type />,
    value: 'text',
    label: 'Text',
    description: 'Supports markdown and html content'
  },
  {
    icon: <Gauge />,
    value: 'gauge',
    label: 'Gauge',
    description: 'Standard gauge visualization'
  },
  {
    icon: <ChartNoAxesGantt />,
    value: 'bargauge',
    label: 'Bar gauge',
    description: 'Horizontal and vertical gauges'
  },
  {
    icon: <Table />,
    value: 'table',
    label: 'Table',
    description: 'Supports many column styles'
  },
  {
    icon: <ChartPie />,
    value: 'piechart',
    label: 'Pie chart',
    description: 'The new core pie chart visualization'
  },
  {
    icon: <Grid3X3 />,
    value: 'heatmap',
    label: 'Heatmap',
    description: 'Like a histogram over time'
  }
]

function VisualizationsSelect (): JSX.Element {
  const [selectedVisualization, setSelectedVisualization] = useState<string>('timeseries')
  return (
    <Select
      onValueChange={setSelectedVisualization}
      value={selectedVisualization}
      defaultValue={'timeseries'}
    >
      <SelectTrigger className="w-full" >
        <SelectValue asChild>
          <div className="flex justify-between">
              <span className="mr-2">
                {visualizations.find(visualization => visualization.value === selectedVisualization)?.icon}
              </span>
              <div className="p-1">
                {visualizations.find(visualization => visualization.value === selectedVisualization)?.label}
              </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {visualizations.map(visualization => (
          <SelectItem
            key={visualization.value}
            value={visualization.value}
          >
            <div
              className="flex space-x-2 m-2"
            >
              <div>
                {visualization.icon}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">
                  {visualization.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {visualization.description}
                </p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default VisualizationsSelect
