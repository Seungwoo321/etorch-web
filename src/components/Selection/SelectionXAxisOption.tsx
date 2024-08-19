import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDataOptionStore, useXAxisOptionStore } from '@/store/editPanel'
import {
  selectUniqueDataKeys
} from '@/store/editPanel/selector'
import FormField from '../shared/FormField'

function SelectionAxisOption (): JSX.Element {
  const uniqueDataKey = useDataOptionStore(selectUniqueDataKeys)
  const xAxisDataKey = useXAxisOptionStore.use.xAxisDataKey()
  const xAxisVisibility = useXAxisOptionStore.use.xAxisVisibility()
  const xAxisType = useXAxisOptionStore.use.xAxisType()
  const xAxisDomainMin = useXAxisOptionStore.use.xAxisDomainMin()
  const xAxisDomainMax = useXAxisOptionStore.use.xAxisDomainMax()
  const xAxisAxisLine = useXAxisOptionStore.use.xAxisAxisLine()
  const xAxisTickCount = useXAxisOptionStore.use.xAxisTickCount()
  const xAxisTickAngle = useXAxisOptionStore.use.xAxisTickAngle()
  const xAxisTickSize = useXAxisOptionStore.use.xAxisTickSize()
  const xAxisTickLine = useXAxisOptionStore.use.xAxisTickLine()
  const updateXAxisDataKey = useXAxisOptionStore.use.updateXAxisDataKey()
  const updateXAxisVisibility = useXAxisOptionStore.use.updateXAxisVisibility()
  const updateXAxisType = useXAxisOptionStore.use.updateXAxisType()
  const updateXAxisDomainMin = useXAxisOptionStore.use.updateXAxisDomainMin()
  const updateXAxisDomainMax = useXAxisOptionStore.use.updateXAxisDomainMax()
  const updateXAxisAxisLine = useXAxisOptionStore.use.updateXAxisAxisLine()
  const updateXAxisTickCount = useXAxisOptionStore.use.updateXAxisTickCount()
  const updateXAxisTickAngle = useXAxisOptionStore.use.updateXAxisTickAngle()
  const updateXAxisTickSize = useXAxisOptionStore.use.updateXAxisTickSize()
  const updateXAxisTickLine = useXAxisOptionStore.use.updateXAxisTickLine()
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
              <SelectValue>
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
            <SelectValue></SelectValue>
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

      {xAxisType === 'number' && (
        <FormField htmlFor="x-axis-tick-count" label="Tick Count">
          <Input
            id="x-axis-tick-count"
            type="number"
            min={5}
            className="sm"
            value={xAxisTickCount}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateXAxisTickCount(+e.currentTarget.value)
              }
            }}
          />
        </FormField>
      )}
      <FormField htmlFor="x-axis-tick-angle" label="Tick Angle">
        <Input
          id="x-axis-tick-angle"
          type="number"
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
            type="number"
            max={10}
            className="sm"
            value={xAxisTickSize}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateXAxisTickSize(+e.currentTarget.value)
              }
            }}
          />
        </FormField>
      )}

    </div>
  )
}

export default SelectionAxisOption
