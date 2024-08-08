import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart'
import { usePanelOptionStore, PanelOptionStore } from "@/store/editPanel/panelOptionStore"
import { useDataPanelStore, DataPanelStore } from '@/store/dataPanelStore'

const selectTitle = (state: PanelOptionStore) => state.title
const selectDescription = (state: PanelOptionStore) => state.description
const selectPanelsData = (state: DataPanelStore) => state.panels.filter(panel => panel.data.length)

function PreviewPanel() {
  const title = usePanelOptionStore(selectTitle)
  const description = usePanelOptionStore(selectDescription)
  const panelsData = useDataPanelStore(selectPanelsData)
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
        {panelsData.length
          ? <TimeSeriesLineChart />
          : <div className="flex items-center h-full m-auto">No data</div>
        }
        
      </CardContent>
    </Card>
  )
}
export default PreviewPanel