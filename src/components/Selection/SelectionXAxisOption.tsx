import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataPanelItem } from "@/models"
import { useDataOptionStore } from "@/store/editPanel"
import {
  selectFrequency,
  selectSetFrequency,
  selectPanelsAllData
} from "@/store/editPanel/selector"

const frequencyConvertToText = (frequency: string) => ({ M: '월간', D: '일간', A: '연간', Q: '분기' }[frequency])
const uniqueFrequencyReducer = (acc: DataPanelItem[], cur: DataPanelItem) => {
  if (!cur.frequency) return acc
  if (acc.every(item => item.frequency !== cur.frequency)) {
    acc.push(cur)
  }
  return acc
}

function SelectionAxisOption() {
  const frequency = useDataOptionStore(selectFrequency)
  const setFrequency = useDataOptionStore(selectSetFrequency)
  const panelsAllData = useDataOptionStore(selectPanelsAllData)
  const uniqueFrequency = panelsAllData.reduce<DataPanelItem[]>(uniqueFrequencyReducer, [])


  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="data">Label </Label>
        <Select
          onValueChange={setFrequency}
          value={frequency}
          >
          <SelectTrigger>
            <SelectValue defaultValue={frequency}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {uniqueFrequency.map(panel => (

              <SelectItem
                key={panel.frequency}
                value={panel.frequency}>
                  {frequencyConvertToText(panel.frequency)}
                </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SelectionAxisOption