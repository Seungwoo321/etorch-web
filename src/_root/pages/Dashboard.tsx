import LineChartCard from "@/components/cards/LineChartCard"
import { useDashboardStore } from "@/store"

function Dashboard() {

  const {
    currentDashboard
  } = useDashboardStore()

  return (
    <div className="container py-6 space-y-6">
      <div className="grid grid-cols-2 items-start justify-center gap-6">
      {currentDashboard?.data?.map((item, index) => (
          <LineChartCard
            key={index}
            {...item}
          >
          </LineChartCard>
      ))}
      </div>
    </div>
  )
}

export default Dashboard
