import { Slider } from '@/components/ui/slider'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { useGraphStylesOptionStore } from '@/store/editPanel'
import FormField from '@/components/shared/FormField'
function SelectionGraphStyle (): JSX.Element {
  const graphStyle = useGraphStylesOptionStore.use.graphStyle()
  const lineWidth = useGraphStylesOptionStore.use.lineWidth()
  const fillOpacity = useGraphStylesOptionStore.use.fillOpacity()
  const updateGraphStyle = useGraphStylesOptionStore.use.updateGraphStyle()
  const updateLineWidth = useGraphStylesOptionStore.use.updateLineWidth()
  const updateFillOpacity = useGraphStylesOptionStore.use.updateFillOpacity()

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
                  onValueChange={values => { updateLineWidth(values[0]) }}
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
                  onValueChange={values => { updateFillOpacity(values[0]) }}
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
