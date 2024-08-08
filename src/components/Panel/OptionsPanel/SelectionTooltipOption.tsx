import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useTooltipOptionStore, { TooltipOptionStore } from "@/store/editPanel/tooltipOptionStore";

const selectIsHidden = (state: TooltipOptionStore) => state.isHidden
const selectUpdateIsHidden = (state: TooltipOptionStore) => state.updateIsHidden

function SelectionTooltipOption() {
  const isHidden = useTooltipOptionStore(selectIsHidden)
  const updateIsHidden = useTooltipOptionStore(selectUpdateIsHidden)

  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label> Hidden </Label>
        <Switch
          checked={isHidden}
          onCheckedChange={updateIsHidden}
        />
      </div>
    </div>
  )
}

export default SelectionTooltipOption
