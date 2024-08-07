import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { useEditPanelStore } from "@/store"
const SelectionGraphStyle = () => {
  const graphStyle = useEditPanelStore(state => state.graphStyle)
  const lineWidth = useEditPanelStore(state => state.lineWidth)
  const fillOpacity = useEditPanelStore(state => state.fillOpacity)
  const {
    updateGraphStyle,
    updateLineWidth,
    updateFillOpacity
  } = useEditPanelStore()
  return (
    <div className="space-y-2 pl-2 pr-1">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="Style">Style</Label>
        <Tabs
          defaultValue="Line"
          value={graphStyle}
          className="w-full"
          onValueChange={updateGraphStyle}
        >
          <TabsList>
            <TabsTrigger value="Line">Line</TabsTrigger>
            <TabsTrigger value="Bar">Bar</TabsTrigger>
            <TabsTrigger value="Point">Point</TabsTrigger>
          </TabsList>
          <TabsContent value="Line">
            <div className="grid gap-2 pt-2">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="line-width"
                  >Line width
                  </Label>
                  <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                    {lineWidth}
                  </span>
                </div>
                <Slider
                  value={[lineWidth]}
                  defaultValue={[1]}
                  max={10}
                  step={1}
                  onValueChange={values => updateLineWidth(values[0])}
                />
              </div>
            </div>

            <div className="grid gap-2 pt-2">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="fill-opacity"
                  >Fill opacity
                  </Label>
                  <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                    {fillOpacity}
                  </span>
                </div>
                <Slider
                  value={[fillOpacity]}
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  onValueChange={values => updateFillOpacity(values[0])}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Bar">

          </TabsContent>
          <TabsContent value="Point">

          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SelectionGraphStyle
