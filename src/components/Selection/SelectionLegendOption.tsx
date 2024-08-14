import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
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
} from "@/store/editPanel/selector"
import { LayoutType } from "recharts/types/util/types"
import { VerticalAlignmentType, HorizontalAlignmentType } from 'recharts/types/component/DefaultLegendContent';

function SelectionLegendOption() {
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
        <Label htmlFor="visibility">Visibility</Label>
        <Switch
          checked={visibility}
          onCheckedChange={updateVisibility}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="layout">Layout</Label>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={layout}
          onValueChange={(value: LayoutType | undefined) => {
            if (value) updateLayout(value)
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
        <Label htmlFor="placement">Horizontal Align</Label>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={align}
          onValueChange={(value: HorizontalAlignmentType | undefined) => {
            if (value) updateAlign(value)
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
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="placement">Vertical Align</Label>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          value={verticalAlign}
          onValueChange={(value: VerticalAlignmentType | undefined) => {
            if (value) updateVerticalAlign(value)
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
      </div>
    </div>
  )
}

export default SelectionLegendOption