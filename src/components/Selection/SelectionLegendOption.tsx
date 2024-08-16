import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group'
import { useLegendOptionStore } from '@/store/editPanel'
import {
  selectLegendVisibility,
  selectLegendLayout,
  selectLegendAlign,
  selectLegendVerticalAlign,
  selectUpdateLegendVisibility,
  selectUpdateLegendLayout,
  selectUpdateLegendAlign,
  selectUpdateLegendVerticalAlign
} from '@/store/editPanel/selector'
import { type LayoutType } from 'recharts/types/util/types'
import { type VerticalAlignmentType, type HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent'
import FormField from '../shared/FormField'

function SelectionLegendOption (): JSX.Element {
  const visibility = useLegendOptionStore(selectLegendVisibility)
  const layout = useLegendOptionStore(selectLegendLayout)
  const align = useLegendOptionStore(selectLegendAlign)
  const verticalAlign = useLegendOptionStore(selectLegendVerticalAlign)
  const updateVisibility = useLegendOptionStore(selectUpdateLegendVisibility)
  const updateLayout = useLegendOptionStore(selectUpdateLegendLayout)
  const updateAlign = useLegendOptionStore(selectUpdateLegendAlign)
  const updateVerticalAlign = useLegendOptionStore(selectUpdateLegendVerticalAlign)
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="legend-visibility">Visibility</Label>
        <Switch
          id="legend-visibility"
          checked={visibility}
          onCheckedChange={updateVisibility}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <span>Layout</span>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={layout}
          onValueChange={(value: LayoutType) => {
            if (value.length > 0) updateLayout(value)
            if (value === 'horizontal' && verticalAlign === 'middle') updateAlign('center')
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
          value={align}
          onValueChange={(value: HorizontalAlignmentType) => {
            if (value === 'left' || value === 'center' || value === 'right') {
              updateAlign(value)
            }
          }}
        >
        {(layout !== 'horizontal' || verticalAlign !== 'middle')
          ? (<ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>)
          : null
        }
          <ToggleGroupItem value="center" aria-label="Toggle center">
            Center
          </ToggleGroupItem>
          {(layout !== 'horizontal' || verticalAlign !== 'middle')
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
          value={verticalAlign}
          onValueChange={(value: VerticalAlignmentType) => {
            if (value === 'top' || value === 'bottom' || value === 'middle') {
              updateVerticalAlign(value)
            }
            if (layout === 'horizontal' && value === 'middle') updateAlign('center')
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
