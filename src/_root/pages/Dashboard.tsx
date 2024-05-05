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
            firstLine={{
              ...item.line[0],
              reload: item.line.length > 0
            }}
            secondLine={{
              ...item.line[1],
              reload: item.line.length > 1
            }}
          >
          </LineChartCard>
      ))}
      </div>
    </div>
  )
}

export default Dashboard
