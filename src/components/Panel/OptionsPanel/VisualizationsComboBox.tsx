import { ReactElement, useState } from "react"
import {
  ChevronDown,
  ChartSpline,
  ChartNoAxesColumn,
  ChartNoAxesGantt,
  ChartPie,
  Gauge,
  Table,
  Grid3X3,
  Type
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Visualization = {
  icon: ReactElement
  value: string
  label: string
  description: string
}

type VisualizationListProps = {
  setOpen: (open: boolean) => void
  setSelectedVisualization: (visualization: Visualization | null) => void
}

function VisualizationsComboBox() {
  const [open, setOpen] = useState(false)
  const [selectedVisualization, setSelectedVisualization] = useState<Visualization | null>(visualizations[0])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-[40px] rounded-xl"
        >
          <div className="flex">
            {selectedVisualization
              ? <><span className="mr-2">{selectedVisualization.icon}</span><div className="p-1">{selectedVisualization.label}</div></>
              : <>Set visualization</>}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <VisualizationList setOpen={setOpen} setSelectedVisualization={setSelectedVisualization} />
      </PopoverContent>
    </Popover>
  )
}


const visualizations: Visualization[] = [
  {
    icon: <ChartSpline/>,
    value: 'timeseries',
    label: 'Time series',
    description: 'Time based line, area and bar charts'
  },
  {
    icon: <ChartNoAxesColumn/>,
    value: 'barchart',
    label: 'Bar Chart',
    description: 'Categorical charts with group support'
  },
  {
    icon: <Type/>,
    value: 'text',
    label: 'Text',
    description: 'Supports markdown and html content'
  },
  {
    icon: <Gauge/>,
    value: 'gauge',
    label: 'Gauge',
    description: 'Standard gauge visualization'
  },
  {
    icon: <ChartNoAxesGantt/>,
    value: 'bargauge',
    label: 'Bar gauge',
    description: 'Horizontal and vertical gauges'
  },
  {
    icon: <Table/>,
    value: 'table',
    label: 'Table',
    description: 'Supports many column styles'
  },
  {
    icon: <ChartPie/>,
    value: 'piechart',
    label: 'Pie chart',
    description: 'The new core pie chart visualization'
  },
  {
    icon: <Grid3X3/>,
    value: 'heatmap',
    label: 'Heatmap',
    description: 'Like a histogram over time'
  }
]

function VisualizationList({
  setOpen,
  setSelectedVisualization
}: VisualizationListProps) {
  return (
    <Command>
      <CommandInput placeholder="Search for..." />
      <CommandList>
        <CommandEmpty>No results found. </CommandEmpty>
        <CommandGroup>
          {visualizations.map(visualization => (
            <CommandItem
              key={visualization.value}
              value={visualization.value}
              onSelect={(value) => {
                setSelectedVisualization(
                  visualizations.find(item => item.value === value) || null
                )
                setOpen(false)
              }}
            >
              <div className="flex items-center">
                {visualization.icon}
                {/* <span>
                </span> */}
              </div>
              <div className="p-2">
                <p className="text-sm font-medium leading-none">
                  {visualization.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {visualization.description}
                </p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>


    </Command>
  )
}

export default VisualizationsComboBox