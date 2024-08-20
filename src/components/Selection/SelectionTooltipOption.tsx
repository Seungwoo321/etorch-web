import { Input } from '@/components/ui/input'
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group'
import { useTooltipOptionStore } from '@/store/editPanel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import FormField from '../shared/FormField'

function SelectionTooltipOption (): JSX.Element {
  const tooltipMode = useTooltipOptionStore.use.tooltipMode()
  const tooltiMaxWidth = useTooltipOptionStore.use.tooltiMaxWidth()
  const cursorLineStyleWidth = useTooltipOptionStore.use.cursorLineStyleWidth()
  const cursorLineStyleDasharray = useTooltipOptionStore.use.cursorLineStyleDasharray()
  const cursorLineStyle = useTooltipOptionStore.use.cursorLineStyle()
  const updateTooltipMode = useTooltipOptionStore.use.updateTooltipMode()
  const updateTooltipMaxWidth = useTooltipOptionStore.use.updateTooltipMaxWidth()
  const updateCursorLineStyle = useTooltipOptionStore.use.updateCursorLineStyle()
  const updateCursorLineStyleWidth = useTooltipOptionStore.use.updateCursorLineStyleWidth()
  const updateCursorLineStyleDasharray = useTooltipOptionStore.use.updateCursorLineStyleDasharray()

  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField label="Tooltip mode">
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={tooltipMode}
          onValueChange={(value: string | undefined) => {
            if (value != null) updateTooltipMode(value)
          }}
        >
          <ToggleGroupItem value="default" aria-label="Toggle default">
            Default
          </ToggleGroupItem>
          <ToggleGroupItem value="active" aria-label="Toggle active">
            Active
          </ToggleGroupItem>
          <ToggleGroupItem value="hidden" aria-label="Toggle hidden">
            Hidden
          </ToggleGroupItem>
        </ToggleGroup>
      </FormField>
      {tooltipMode !== 'hidden' && (
        <>
          <FormField htmlFor="tooltip-max-width" label="Max width">
            <Input
              id="tooltip-max-width"
              type="number"
              className="sm"
              value={tooltiMaxWidth}
              onInput={(e) => { updateTooltipMaxWidth(+e.currentTarget.value) }}
            />
          </FormField>
          <FormField label="Cursor style">
            <div className="flex gap-1.5">
              <ToggleGroup
                className="justify-start"
                type="single"
                variant="outline"
                value={cursorLineStyle}
                onValueChange={(value: string | undefined) => {
                  if (value != null) updateCursorLineStyle(value)
                }}
              >
                <ToggleGroupItem value="solid" aria-label="Toggle solid">
                  Solid
                </ToggleGroupItem>
                <ToggleGroupItem value="dash" aria-label="Toggle dash">
                  Dash
                </ToggleGroupItem>
              </ToggleGroup>
              {cursorLineStyle === 'dash' && (
                <Select
                  onValueChange={updateCursorLineStyleDasharray}
                  value={cursorLineStyleDasharray}
                >
                  <SelectTrigger>
                    <SelectValue defaultValue="2 2"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 1">1, 1</SelectItem>
                    <SelectItem value="2 2">2, 2</SelectItem>
                    <SelectItem value="3 3">3, 3</SelectItem>
                    <SelectItem value="4 4">4, 4</SelectItem>
                    <SelectItem value="5 5">5, 5</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </FormField>
          <FormField htmlFor="tooltip-cursor-width" label="Cursor width">
            <Input
              id="tooltip-cursor-width"
              type="number"
              max={10}
              className="sm"
              value={cursorLineStyleWidth}
              onInput={(e) => { updateCursorLineStyleWidth(+e.currentTarget.value) }}
            />
          </FormField>
        </>
      )}
    </div>
  )
}

export default SelectionTooltipOption
