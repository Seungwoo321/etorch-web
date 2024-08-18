import {
  Card,
  CardContent
} from '@/components/ui/card'
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart'
import PreviewPanelHeader from './PreviewPanelHeader'

function PreviewPanel (): JSX.Element {

  return (
    <Card className="flex flex-col h-full">
      <PreviewPanelHeader/>
      <CardContent className="flex h-[calc(100%-90px)] flex-grow">
        <TimeSeriesLineChart />
      </CardContent>
    </Card>
  )
}
export default PreviewPanel
