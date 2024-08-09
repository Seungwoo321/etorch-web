import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

function SelectionLegendOption() {
  // const isVisibility = 
  // const updateIsVisibility = 


  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="visibility">Visibility</Label>
        <Switch
          // checked={isVisibility}
          // onCheckedChange={updateIsVisibility}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="layout">Layout</Label>

      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="placement">Placement</Label>
        <ToggleGroup
          className="justify-start"
          type="single"
          variant="outline"
          // value={placement}
          onValueChange={(value: string | undefined) => {
            // if (value) updatePlacement(value)
          }}
        >
          vertical, horizontal
          top-center
          bottom-center


          horizontal
          top-right
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
      </div>
    </div>
  )
}

export default SelectionLegendOption