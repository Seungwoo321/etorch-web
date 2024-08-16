import { Slider } from "@/components/ui/slider"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { useGraphStylesOptionStore } from "@/store/editPanel"
import {
  selectGraphStyle,
  selectLineWidth,
  selectFillOpacity,
  selectUpdateGraphStyle,
  selectUpdateLineWidth,
  selectUpdateFillOpacity
} from "@/store/editPanel/selector"
import FormField from '@/components/shared/FormField'
const SelectionGraphStyle = () => {
  const graphStyle = useGraphStylesOptionStore(selectGraphStyle)
  const lineWidth = useGraphStylesOptionStore(selectLineWidth)
  const fillOpacity = useGraphStylesOptionStore(selectFillOpacity)
  const updateGraphStyle = useGraphStylesOptionStore(selectUpdateGraphStyle)
  const updateLineWidth = useGraphStylesOptionStore(selectUpdateLineWidth)
  const updateFillOpacity = useGraphStylesOptionStore(selectUpdateFillOpacity)

  return (
    <div className="space-y-2 pl-2 pr-1">
      <FormField label="Style">
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
                  <span>Line width</span>
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
                  <span>Fill opacity</span>
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
      </FormField>
    </div>
  )
}

export default SelectionGraphStyle
