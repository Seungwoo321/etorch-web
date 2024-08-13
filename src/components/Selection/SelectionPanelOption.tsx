import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { usePanelOptionStore } from "@/store/editPanel"
import {
  selectIsTransparentBackground,
  selectTitle,
  selectDescription,
  selectUpdateTitle,
  selectUpdateDescription,
  selectUpdateIsTransparentBackground
} from "@/store/editPanel/selector"

function SelectionPanelOption() {
  const title = usePanelOptionStore(selectTitle)
  const description = usePanelOptionStore(selectDescription)
  const isTransparentBackground = usePanelOptionStore(selectIsTransparentBackground)
  const updateTitle = usePanelOptionStore(selectUpdateTitle)
  const updateDescription = usePanelOptionStore(selectUpdateDescription)
  const updateIsTransparentBackground = usePanelOptionStore(selectUpdateIsTransparentBackground)
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          className="sm"
          value={title}
          onInput={(e) => updateTitle(e.currentTarget.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onInput={(e) => updateDescription(e.currentTarget.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="transparent-background">Transparent background</Label>
        <Switch
          checked={isTransparentBackground}
          onCheckedChange={updateIsTransparentBackground}
        />
      </div>
    </div>
  )
}

export default SelectionPanelOption
