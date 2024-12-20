import SettingTabs from "@/components/shared/SettingTabs"
import LineChartCard from "@/components/cards/LineChartCard"
import { Button } from "@/components/ui/button"
import { useChartDataStore } from "@/store"
import { useNavigate } from "react-router-dom"

const CreateChart = () => {
  const {
    options,
    resetOption
  } = useChartDataStore()
  const navigate = useNavigate();
  const handleBackButton = () => {
    resetOption()
    navigate('/')
  }
  const handleSaveButton = () => {
    console.log(options)
  }

  const isDiabled = !options.first.reload && !options.second.reload

  return (
    <div className="container py-6">
      <div className="gap-6 grid h-full items-stretch md:grid-cols-[1fr_300px]">
        <SettingTabs/>
        <LineChartCard
          mode="edit"
          firstLine={options.first}
          secondLine={options.second}
        />
      </div>
      <div className="py-6">
        <div className="flex justify-between">
          <Button
            onClick={handleBackButton}
          >
            Back
          </Button>
          <Button
            disabled={isDiabled}
            onClick={handleSaveButton}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateChart
