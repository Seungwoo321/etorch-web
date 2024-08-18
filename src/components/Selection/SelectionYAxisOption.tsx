import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDataOptionStore, useYAxisOptionStore } from '@/store/editPanel'
import {
  selectYAxisVisibility,
  selectYAxisType,
  selectYAxisTickCount,
  selectYAxisTickSize,
  selectYAxisDomainMin,
  selectYAxisDomainMax,
  selectYAxisAxisLine,
  selectYAxisTickLine,
  selectYAxisDataKey,
  selectUpdateYAxisVisibility,
  selectUpdateYAxisType,
  selectUpdateYAxisDomainMin,
  selectUpdateYAxisDomainMax,
  selectUpdateYAxisAxisLine,
  selectUpdateYAxisTickLine,
  selectUpdateYAxisTickSize,
  selectUpdateYAxisDataKey,
  selectUpdateYAxisTickCount,
  selectUniqueDataKeys
} from '@/store/editPanel/selector'
import FormField from '../shared/FormField'

function SelectionYAxisOption (): JSX.Element {
  const uniqueDataKey = useDataOptionStore(selectUniqueDataKeys)
  const yAxisDataKey = useYAxisOptionStore(selectYAxisDataKey)
  const yAxisVisibility = useYAxisOptionStore(selectYAxisVisibility)
  const yAxisType = useYAxisOptionStore(selectYAxisType)
  const yAxisDomainMin = useYAxisOptionStore(selectYAxisDomainMin)
  const yAxisDomainMax = useYAxisOptionStore(selectYAxisDomainMax)
  const yAxisAxisLine = useYAxisOptionStore(selectYAxisAxisLine)
  const yAxisTickCount = useYAxisOptionStore(selectYAxisTickCount)
  const yAxisTickSize = useYAxisOptionStore(selectYAxisTickSize)
  const yAxisTickLine = useYAxisOptionStore(selectYAxisTickLine)
  const updateYAxisDataKey = useYAxisOptionStore(selectUpdateYAxisDataKey)
  const updateYAxisVisibility = useYAxisOptionStore(selectUpdateYAxisVisibility)
  const updateYAxisType = useYAxisOptionStore(selectUpdateYAxisType)
  const updateYAxisDomainMin = useYAxisOptionStore(selectUpdateYAxisDomainMin)
  const updateYAxisDomainMax = useYAxisOptionStore(selectUpdateYAxisDomainMax)
  const updateYAxisAxisLine = useYAxisOptionStore(selectUpdateYAxisAxisLine)
  const updateYAxisTickCount = useYAxisOptionStore(selectUpdateYAxisTickCount)
  const updateYAxisTickSzie = useYAxisOptionStore(selectUpdateYAxisTickSize)
  const updateYAxisTickLine = useYAxisOptionStore(selectUpdateYAxisTickLine)
  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField htmlFor="y-axis-visibility" label="Visibility">
        <Switch
          id="y-axis-visibility"
          checked={yAxisVisibility}
          onCheckedChange={updateYAxisVisibility}
        />
      </FormField>

      <FormField htmlFor="y-axis-data-key" label="Data key">
        <div className="flex gap-1.5">
          <Select
            onValueChange={updateYAxisDataKey}
            value={yAxisDataKey}
          >
            <SelectTrigger id="y-axis-data-key">
              <SelectValue defaultValue={yAxisDataKey}>
                {(uniqueDataKey.length > 0) ? yAxisDataKey : 'Not selectable'}
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

      <FormField htmlFor="y-axis-type" label="Type">
        <Select
          onValueChange={(value) => {
            if (value === 'category' || value === 'number') {
              updateYAxisType(value)
            }
            if (value === 'category') {
              updateYAxisDomainMin(0)
              updateYAxisDomainMax('auto')
            }
          }}
          value={yAxisType}
        >
          <SelectTrigger id="y-axis-type">
            <SelectValue defaultValue="category"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">category</SelectItem>
            <SelectItem value="number">number</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      {yAxisType === 'number' && (
        <>
          <FormField htmlFor="y-axis-domain-min" label="Min">
            <Input
              id="y-axis-domain-min"
              type="text"
              className="sm"
              value={yAxisDomainMin}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateYAxisDomainMin(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisDomainMin(+e.currentTarget.value)
                }
              }}
            />
          </FormField>

          <FormField htmlFor="y-axis-domain-max" label="Max">
            <Input
              id="y-axis-domain-max"
              type="text"
              className="sm"
              value={yAxisDomainMax}
              onInput={(e) => {
                if (e.currentTarget.value === 'auto') {
                  updateYAxisDomainMax(e.currentTarget.value)
                } else if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                  updateYAxisDomainMax(+e.currentTarget.value)
                }
              }}
            />
          </FormField>
        </>
      )}

      <FormField htmlFor="y-axis-axis-line" label="Show Axis">
        <Switch
          id="y-axis-axis-line"
          checked={yAxisAxisLine}
          onCheckedChange={updateYAxisAxisLine}
        />
      </FormField>
      {yAxisType === 'number' && (
        <FormField htmlFor="y-axis-tick-count" label="Tick Count">
          <Input
            id="y-axis-tick-count"
            type="number"
            min={2}
            className="sm"
            value={yAxisTickCount}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateYAxisTickCount(+e.currentTarget.value)
              }
            }}
          />
        </FormField>
      )}
      <FormField htmlFor="y-axis-tick-line" label="Show Tick">
        <Switch
          id="y-axis-tick-line"
          checked={yAxisTickLine}
          onCheckedChange={updateYAxisTickLine}
        />
      </FormField>
      {yAxisTickLine && (
        <FormField htmlFor="y-axis-tick-size" label="Tick Size">
          <Input
            id="y-axis-tick-size"
            type="nuumber"
            max={10}
            className="sm"
            value={yAxisTickSize}
            onInput={(e) => {
              if (!isNaN(+e.currentTarget.value) && typeof +e.currentTarget.value === 'number') {
                updateYAxisTickSzie(+e.currentTarget.value)
              }
              
            }}
          />
        </FormField>
      )}

    </div>
  )
}

export default SelectionYAxisOption
