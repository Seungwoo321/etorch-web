import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart'
import {
  usePanelOptionStore,
  useDataOptionStore,
} from "@/store/editPanel"
import {
  selectTitle,
  selectDescription,
  selectPanelsAllData
} from "@/store/editPanel/selector"

function PreviewPanel() {
  const title = usePanelOptionStore(selectTitle)
  const description = usePanelOptionStore(selectDescription)
  const panelsAllData = useDataOptionStore(selectPanelsAllData)
  return (
    <Card className="flex flex-col h-full">
      {title
        ? (<CardHeader className="flex">
          <CardTitle>
            {title}
          </CardTitle>
          {description
            ? (
              <CardDescription>
                {description}
              </CardDescription>
            ) : null}
        </CardHeader>)
        : null
      }
      <CardContent className="flex h-[calc(100%-90px)] flex-grow">
        {panelsAllData.length
          ? <TimeSeriesLineChart />
          : <div className="flex items-center h-full m-auto">No data</div>
        }
        
      </CardContent>
    </Card>
  )
}
export default PreviewPanel