import SettingTabs from "@/components/shared/SettingTabs"
import LineChartCard from "@/components/cards/LineChartCard"
import { Button } from "@/components/ui/button"
import { useChartDataStore } from "@/store"
import { useNavigate } from "react-router-dom"
import { LineChartItem } from "@/models/dashboard"

const CreateChart = () => {
  const { resetOption} = useChartDataStore()
  const firstOptions = useChartDataStore<LineChartItem>(state => state.options.first)
  const secondOptions = useChartDataStore<LineChartItem>(state => state.options.second)
  const navigate = useNavigate();
  const handleBackButton = () => {
    resetOption()
    navigate('/')
  }
  const handleSaveButton = () => {
    console.log(firstOptions)
    console.log(secondOptions)
  }

  // const isDiabled = !options.first.reload && !options.second.reload

  return (
    <div className="container py-6">
      <div className="gap-6 grid h-full items-stretch md:grid-cols-[1fr_300px]">
        <SettingTabs/>
        <LineChartCard
          mode="edit"
          firstLine={firstOptions}
          secondLine={secondOptions}
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
            // disabled={isDiabled}
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
