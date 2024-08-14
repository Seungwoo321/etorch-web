import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataPanelItem } from "@/models"
import { useDataOptionStore, useXAxisOptionStore } from "@/store/editPanel"
import {
  selectFrequency,
  selectSetFrequency,
  selectPanelsAllData,
  selectXAxisVisibility,
  selectXAxisType,
  selectXAxisTickAngle,
  selectXAxisDomainMin,
  selectXAxisDomainMax,
  selectXAxisAxisLine,
  selectXAxisTickLine,
  selectXAxisColor,
  selectUpdateXAxisVisibility,
  selectUpdateXAxisType,
  selectUpdateXAxisTickAngle,
  selectUpdateXAxisDomainMin,
  selectUpdateXAxisDomainMax,
  selectUpdateXAxisAxisLine,
  selectUpdateXAxisTickLine,
  selectUpdateXAxisColor,
  selectXAxisTickSize,
  selectUpdateXAxisTickSize,
  selecteUpdateXAxisDataKey,
  selectXAxisDataKey
} from "@/store/editPanel/selector"


const frequencyConvertToText = (frequency: string) => ({ M: '월간', D: '일간', A: '연간', Q: '분기' }[frequency])
const uniqueFrequencyReducer = (acc: DataPanelItem[], cur: DataPanelItem) => {
  if (!cur.frequency) return acc
  if (acc.every(item => item.frequency !== cur.frequency)) {
    acc.push(cur)
  }
  return acc
}
const uniqueDataKeyReducer = (acc: string[], cur: DataPanelItem) => {
  Object.keys(cur.data[0]).forEach((key) => {
    if (!acc.includes(key)) {
      acc.push(key)
    }
  })
  return acc
}
function SelectionAxisOption() {
  // const frequency = useDataOptionStore(selectFrequency)
  // const setFrequency = useDataOptionStore(selectSetFrequency)
  const panelsAllData = useDataOptionStore(selectPanelsAllData)
  // const uniqueFrequency = panelsAllData.reduce<DataPanelItem[]>(uniqueFrequencyReducer, [])
  const uniqueDataKey = panelsAllData.reduce<string[]>(uniqueDataKeyReducer, [])
  const xAxisDataKey = useXAxisOptionStore(selectXAxisDataKey)
  const xAxisVisibility = useXAxisOptionStore(selectXAxisVisibility)
  const xAxisType = useXAxisOptionStore(selectXAxisType)
  const xAxisTickAngle = useXAxisOptionStore(selectXAxisTickAngle)
  const xAxisDomainMin = useXAxisOptionStore(selectXAxisDomainMin)
  const xAxisDomainMax = useXAxisOptionStore(selectXAxisDomainMax)
  const xAxisAxisLine = useXAxisOptionStore(selectXAxisAxisLine)
  const xAxisTickSize = useXAxisOptionStore(selectXAxisTickSize)
  const xAxisTickLine = useXAxisOptionStore(selectXAxisTickLine)
  const xAxisColor = useXAxisOptionStore(selectXAxisColor)
  const updateXAxisDataKey = useXAxisOptionStore(selecteUpdateXAxisDataKey)
  const updateXAxisVisibility = useXAxisOptionStore(selectUpdateXAxisVisibility)
  const updateXAxisType = useXAxisOptionStore(selectUpdateXAxisType)
  const updateXAxisTickAngle = useXAxisOptionStore(selectUpdateXAxisTickAngle)
  const updateXAxisDomainMin = useXAxisOptionStore(selectUpdateXAxisDomainMin)
  const updateXAxisDomainMax = useXAxisOptionStore(selectUpdateXAxisDomainMax)
  const updateXAxisAxisLine = useXAxisOptionStore(selectUpdateXAxisAxisLine)
  const updateXAxisTickSzie = useXAxisOptionStore(selectUpdateXAxisTickSize)
  const updateXAxisTickLine = useXAxisOptionStore(selectUpdateXAxisTickLine)
  const updateXAxisColor = useXAxisOptionStore(selectUpdateXAxisColor)
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="label">Visibility</Label>
        <Switch
          name="label"
          checked={xAxisVisibility}
          onCheckedChange={updateXAxisVisibility}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="label">Data key</Label>
        <div className="flex gap-1.5">
          {/* <Select
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
          </Select> */}
          <Select
            onValueChange={updateXAxisDataKey}
            value={xAxisDataKey}
          >
            <SelectTrigger>
              <SelectValue defaultValue={xAxisDataKey}></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {uniqueDataKey.map(key => (
                <SelectItem
                  key={key}
                  value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="axis-line">Show Axis</Label>
        <Switch
          checked={xAxisAxisLine}
          onCheckedChange={updateXAxisAxisLine}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="type">Type</Label>
        <Select
          onValueChange={(value) => {
            if (value === 'category' || value === 'number') {
              updateXAxisType(value)
            }
          }}
          value={xAxisType}
        >
          <SelectTrigger>
            <SelectValue defaultValue="category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="number">Number</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {xAxisType === 'number'
        ? (
        <>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="domain-min">Min</Label>
            <Input
              id="domain-min"
              type="text"
              className="sm"
              value={xAxisDomainMin}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateXAxisDomainMin(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value)  && typeof +e.currentTarget.value === 'number') {
                  updateXAxisDomainMin(+e.currentTarget.value)
                }
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="domain-max">Max</Label>
            <Input
              id="domain-max"
              type="text"
              className="sm"
              value={xAxisDomainMax}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateXAxisDomainMax(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateXAxisDomainMax(+e.currentTarget.value)
                }
              }}
            />
          </div>
        </>)
        : null}

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="tick-line">Show Tick</Label>
        <Switch
          checked={xAxisTickLine}
          onCheckedChange={updateXAxisTickLine}
        />
      </div>
      {xAxisTickLine ? (
        <>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="tick-size">Tick Size</Label>
            <Input
              id="tick-size"
              type="nuumber"
              max={10}
              className="sm"
              value={xAxisTickSize}
              onInput={(e) => updateXAxisTickSzie(+e.currentTarget.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="tick-angle">Tick Angle</Label>
            <Input
              id="tick-angle"
              type="nuumber"
              max={10}
              className="sm"
              value={xAxisTickAngle}
              onInput={(e) => updateXAxisTickAngle(+e.currentTarget.value)}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default SelectionAxisOption