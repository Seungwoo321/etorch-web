import { Label } from "@/components/ui/label"


function SelectionAxisOption() {
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="x-axis">Y-Axis</Label>
        
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="x-axis">Y-Axis</Label>
      </div>
    </div>
  )
}

export default SelectionAxisOption