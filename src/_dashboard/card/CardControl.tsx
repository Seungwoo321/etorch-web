import { useEffect, useState } from "react";
import { getIndicators } from "@/lib/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDataSettingStore } from "@/store";
import DataSettingCard from '@/components/card/DataSettingCard'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CardControl = () => {
  const [merge, setMerge] = useState(false)

  const {
    options,
    updateList,
    updateOrigin,
    updateItem,
    updatePeriod,
    updateColor,
  } = useDataSettingStore()
  useEffect(() => {
    if (!options.first.origin) return
    getIndicators(options.first.origin).then(({ indicators }) => {
      updateList('first', indicators)
      updateItem('first', '')
      updatePeriod('first', '')
    })
  }, [updateList, updateItem, updatePeriod, options.first.origin])


  useEffect(() => {
    if (!options.second.origin) return
    getIndicators(options.second.origin).then(({ indicators }) => {
      updateList('second', indicators)
      updateItem('second', '')
      updatePeriod('second', '')
    })
  }, [updateList, updateItem, updatePeriod, options.second.origin])

  const handleYaxisMerge = () => {
    setMerge(!merge)
  }

  return (
    <Tabs defaultValue="data-1" className="flex-col sm:flex md:order-2 w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data-1">Data 1</TabsTrigger>
        <TabsTrigger value="data-2">Data 2</TabsTrigger>
      </TabsList>

      <TabsContent value="data-1" className="space-y-2">
        <DataSettingCard
          dataKey="first"
          title="Data 1"
          description="첫 번째 데이터를 선택하세요. 이 데이터는 Y축에 표시됩니다."
          selectedOption={options.first}
          onUpdateOrigin={updateOrigin}
          onUpdateItem={updateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateColor={updateColor}
        >
        </DataSettingCard>

      </TabsContent>

      <TabsContent value="data-2">
        <DataSettingCard
          dataKey="second"
          title="Data 2"
          description="두 번째 데이터를 선택하세요. 이 데이터는 Y축 또는 Y1축에 표시됩니다."
          selectedOption={options.second}
          onUpdateOrigin={updateOrigin}
          onUpdateItem={updateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateColor={updateColor}
        >
          <div className="flex items-center space-x-2">
            <Switch
              id="Combined"
              checked={merge}
              onCheckedChange={handleYaxisMerge}
            />
            <Label htmlFor="Combined">
              {merge ? 'Combined Y-axis' : 'Separated Y-axes'}
            </Label>
          </div>
        </DataSettingCard>
      </TabsContent>
    </Tabs>
  )
}

export default CardControl
