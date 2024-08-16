import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type DataValue } from '@/models'
import { useDataOptionStore, useXAxisOptionStore } from '@/store/editPanel'
import {
  selectXAxisVisibility,
  selectXAxisType,
  selectXAxisTickAngle,
  selectXAxisDomainMin,
  selectXAxisDomainMax,
  selectXAxisAxisLine,
  selectXAxisTickLine,
  selectUpdateXAxisVisibility,
  selectUpdateXAxisType,
  selectUpdateXAxisTickAngle,
  selectUpdateXAxisDomainMin,
  selectUpdateXAxisDomainMax,
  selectUpdateXAxisAxisLine,
  selectUpdateXAxisTickLine,
  selectXAxisTickSize,
  selectUpdateXAxisTickSize,
  selecteUpdateXAxisDataKey,
  selectXAxisDataKey,
  selectChartData
} from '@/store/editPanel/selector'
import FormField from '../shared/FormField'

const uniqueDataKeyReducer = (acc: string[], cur: DataValue): string[] => {
  Object.keys(cur).forEach((key) => {
    if (!acc.includes(key)) {
      acc.push(key)
    }
  })
  return acc
}
function SelectionYAxisOption (): JSX.Element {
  const chartData = useDataOptionStore(selectChartData)
  const uniqueDataKey = chartData.reduce<string[]>(uniqueDataKeyReducer, [])
  const xAxisDataKey = useXAxisOptionStore(selectXAxisDataKey)
  const xAxisVisibility = useXAxisOptionStore(selectXAxisVisibility)
  const xAxisType = useXAxisOptionStore(selectXAxisType)
  const xAxisTickAngle = useXAxisOptionStore(selectXAxisTickAngle)
  const xAxisDomainMin = useXAxisOptionStore(selectXAxisDomainMin)
  const xAxisDomainMax = useXAxisOptionStore(selectXAxisDomainMax)
  const xAxisAxisLine = useXAxisOptionStore(selectXAxisAxisLine)
  const xAxisTickSize = useXAxisOptionStore(selectXAxisTickSize)
  const xAxisTickLine = useXAxisOptionStore(selectXAxisTickLine)
  const updateXAxisDataKey = useXAxisOptionStore(selecteUpdateXAxisDataKey)
  const updateXAxisVisibility = useXAxisOptionStore(selectUpdateXAxisVisibility)
  const updateXAxisType = useXAxisOptionStore(selectUpdateXAxisType)
  const updateXAxisTickAngle = useXAxisOptionStore(selectUpdateXAxisTickAngle)
  const updateXAxisDomainMin = useXAxisOptionStore(selectUpdateXAxisDomainMin)
  const updateXAxisDomainMax = useXAxisOptionStore(selectUpdateXAxisDomainMax)
  const updateXAxisAxisLine = useXAxisOptionStore(selectUpdateXAxisAxisLine)
  const updateXAxisTickSzie = useXAxisOptionStore(selectUpdateXAxisTickSize)
  const updateXAxisTickLine = useXAxisOptionStore(selectUpdateXAxisTickLine)
  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField htmlFor="x-axis-visibility" label="Visibility">
        <Switch
          id="x-axis-visibility"
          checked={xAxisVisibility}
          onCheckedChange={updateXAxisVisibility}
        />
      </FormField>

      <FormField htmlFor="x-axis-data-key" label="Data key">
        <div className="flex gap-1.5">
          <Select
            onValueChange={updateXAxisDataKey}
            value={xAxisDataKey}
          >
            <SelectTrigger id="x-axis-data-key">
              <SelectValue defaultValue={xAxisDataKey}>
                {(uniqueDataKey.length > 0) ? xAxisDataKey : 'Not selectable'}
              </SelectValue>
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
      </FormField>

      <FormField htmlFor="x-axis-type" label="Type">
        <Select
          onValueChange={(value) => {
            if (value === 'category' || value === 'number') {
              updateXAxisType(value)
            }
            if (value === 'category') {
              updateXAxisDomainMin(0)
              updateXAxisDomainMax('auto')
            }
          }}
          value={xAxisType}
        >
          <SelectTrigger id="x-axis-type">
            <SelectValue defaultValue="category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">category</SelectItem>
            <SelectItem value="number">number</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      {xAxisType === 'number' && (
        <>
          <FormField htmlFor="x-axis-domain-min" label="Min">
            <Input
              id="x-axis-domain-min"
              type="text"
              className="sm"
              value={xAxisDomainMin}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateXAxisDomainMin(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateXAxisDomainMin(+e.currentTarget.value)
                }
              }}
            />
          </FormField>

          <FormField htmlFor="x-axis-domain-max" label="Max">
            <Input
              id="x-axis-domain-max"
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
          </FormField>
        </>
      )}

      <FormField htmlFor="x-axis-axis-line" label="Show Axis">
        <Switch
          id="x-axis-axis-line"
          checked={xAxisAxisLine}
          onCheckedChange={updateXAxisAxisLine}
        />
      </FormField>

      <FormField htmlFor="x-axis-tick-angle" label="Tick Angle">
        <Input
          id="x-axis-tick-angle"
          type="nuumber"
          min={0}
          max={360}
          className="sm"
          value={xAxisTickAngle}
          onInput={(e) => {
            if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
              updateXAxisTickAngle(+e.currentTarget.value)
            }
          }}
        />
      </FormField>

      <FormField htmlFor="x-axis-tick-line" label="Show Tick">
        <Switch
          id="x-axis-tick-line"
          checked={xAxisTickLine}
          onCheckedChange={updateXAxisTickLine}
        />
      </FormField>
      {xAxisTickLine && (
        <FormField htmlFor="x-axis-tick-size" label="Tick Size">
          <Input
            id="x-axis-tick-size"
            type="nuumber"
            max={10}
            className="sm"
            value={xAxisTickSize}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateXAxisTickAngle(+e.currentTarget.value)
              }
              updateXAxisTickSzie(+e.currentTarget.value)
            }}
          />
        </FormField>
      )}

    </div>
  )
}

export default SelectionYAxisOption
