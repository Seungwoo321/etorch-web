import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
}
  from '@/components/ui/tabs'
import {
  Database,
  Plus
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import DataPanelOptions from './DataPanelOption'
import { useDataOptionStore } from '@/store/editPanel'
import {
  selectPanelIds
} from '@/store/editPanel/selector'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import DataPanelDataMapping from './DataPanelDataMapping'
function DataPanel (): JSX.Element {
  const panelIds = useDataOptionStore(useShallow(selectPanelIds))
  const addPanelItem = useDataOptionStore.use.addPanelItem()
  const handleAddPanel = useCallback(() => {
    addPanelItem({
      id: (panelIds[panelIds.length - 1] ?? 0) + 1,
      isOpen: true,
      dataSource: '',
      indicatorCode: '',
      frequency: '',
      data: []
    })
  }, [panelIds])
  return (
    <Tabs
      className="flex-col flex md:order-2 w-full h-full"
      defaultValue="query"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="query"><Database className="mr-2"/>
          Query
          <Badge variant="default" className="ml-1">
            {panelIds.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="data-mapping">Data mapping</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-min-0 rounded-xl">
        <TabsContent value="query" className="space-y-4">
          <div className="grid gap-4">
            {panelIds.map(id => (
              <DataPanelOptions
                key={id}
                id={id}
              />
            ))}
          </div>
          <Button
            className="rounded-xl w-full"
            type="button"
            onClick={handleAddPanel}
          >
            <Plus className="mr-2"/>
            Add Query
          </Button>
        </TabsContent>
        <TabsContent value="data-mapping">
          <DataPanelDataMapping/>
        </TabsContent>
      </ScrollArea>
    </Tabs>

  )
}

export default DataPanel
