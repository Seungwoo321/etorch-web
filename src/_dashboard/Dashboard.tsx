import CardPreview from "@/_dashboard/card/CardPreview"
import CardControl from "@/_dashboard/card/CardControl"
const Dashboard = () => {
  return (
    <div className="container py-6">
      <div className="gap-6 grid h-full items-stretch md:grid-cols-[1fr_300px]">
        <CardControl/>
        <CardPreview/>
      </div>
    </div>
  )
}

export default Dashboard
