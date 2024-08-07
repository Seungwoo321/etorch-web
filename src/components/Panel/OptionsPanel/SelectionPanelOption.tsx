import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEditPanelStore } from "@/store"
function SelectionPanelOption() {
  const title = useEditPanelStore((state) => state.title)
  const description = useEditPanelStore((state) => state.description)
  const {
    updateTitle,
    updateDescription
  } = useEditPanelStore()

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
    </div>
  )
}

export default SelectionPanelOption
