import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart'
import { useEditPanelStore } from "@/store"

function PreviewPanel() {
  const title = useEditPanelStore((state) => state.title)
  const description = useEditPanelStore((state) => state.description)
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
        <TimeSeriesLineChart/>
      </CardContent>
    </Card>
  )
}
export default PreviewPanel