import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group'
import { useLegendOptionStore } from '@/store/editPanel'
import { type LayoutType } from 'recharts/types/util/types'
import { type VerticalAlignmentType, type HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import FormField from '../shared/FormField'

function SelectionLegendOption (): JSX.Element {
  const legendVisibility = useLegendOptionStore.use.legendVisibility()
  const legendLayout = useLegendOptionStore.use.legendLayout()
  const legendAlign = useLegendOptionStore.use.legendAlign()
  const legendVerticalAlign = useLegendOptionStore.use.legendVerticalAlign()
  const updateLegendVisibility = useLegendOptionStore.use.updateLegendVisibility()
  const updateLegendLayout = useLegendOptionStore.use.updateLegendLayout()
  const updateLegendAlign = useLegendOptionStore.use.updateLegendAlign()
  const updateLegendVerticalAlign = useLegendOptionStore.use.updateLegendVerticalAlign()
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="legend-visibility">Visibility</Label>
        <Switch
          id="legend-visibility"
          checked={legendVisibility}
          onCheckedChange={updateLegendVisibility}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <span>Layout</span>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={legendLayout}
          onValueChange={(value: LayoutType) => {
            if (value.length > 0) updateLegendLayout(value)
            if (value === 'horizontal' && legendVerticalAlign === 'middle') updateLegendAlign('center')
          }}
        >
          <ToggleGroupItem value="vertical" aria-label="Toggle vertical">
            Vertical
          </ToggleGroupItem>
          <ToggleGroupItem value="horizontal" aria-label="Toggle horizontal">
            Horizontal
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <span>Horizontal Align</span>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={legendAlign}
          onValueChange={(value: HorizontalAlignmentType) => {
            if (value === 'left' || value === 'center' || value === 'right') {
              updateLegendAlign(value)
            }
          }}
        >
          {(legendLayout !== 'horizontal' || legendVerticalAlign !== 'middle')
            ? (<ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>)
            : null
        }
          <ToggleGroupItem value="center" aria-label="Toggle center">
            Center
          </ToggleGroupItem>
          {(legendLayout !== 'horizontal' || legendVerticalAlign !== 'middle')
            ? (<ToggleGroupItem value="right" aria-label="Toggle right">
              Right
            </ToggleGroupItem>)
            : null
          }
        </ToggleGroup>
      </div>
      <FormField label="Vertical Alig">
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={legendVerticalAlign}
          onValueChange={(value: VerticalAlignmentType) => {
            if (value === 'top' || value === 'bottom' || value === 'middle') {
              updateLegendVerticalAlign(value)
            }
            if (legendLayout === 'horizontal' && value === 'middle') updateLegendAlign('center')
          }}
        >
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="middle" aria-label="Toggle middle">
            Middle
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
        </ToggleGroup>
      </FormField>
    </div>
  )
}

export default SelectionLegendOption
