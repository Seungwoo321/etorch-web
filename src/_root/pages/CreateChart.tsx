import SettingTabs from "@/components/shared/SettingTabs"
import PreviewCard from "@/components/cards/PreviewCard"
import { Button } from "@/components/ui/button"
import { useChartDataStore } from "@/store"
import { useNavigate } from "react-router-dom"

const CreateChart = () => {
  const { options } = useChartDataStore()
  const navigate = useNavigate();


  const handleBackButton = () => {
    navigate('/')
  }
  const handleSaveButton = () => {
    console.log(options)
  }

  const isDiabled = !options.first.item.code && !options.second.item.code

  return (
    <div className="container py-6">
      <div className="gap-6 grid h-full items-stretch md:grid-cols-[1fr_300px]">
        <SettingTabs/>
        <PreviewCard/>
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
