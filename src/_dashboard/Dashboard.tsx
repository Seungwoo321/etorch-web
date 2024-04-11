import ChartPreview from "@/_dashboard/card/ChartPreview"
import ChartControl from "@/_dashboard/card/ChartControl"
// import { Separator } from "@/components/ui/separator"
const Dashboard = () => {
  return (
    <div className="container py-6">
      <div className="gap-6 grid h-full items-stretch md:grid-cols-[1fr_250px]">
        <ChartControl/>
        <ChartPreview />
      </div>
    </div>
  )
}

export default Dashboard
