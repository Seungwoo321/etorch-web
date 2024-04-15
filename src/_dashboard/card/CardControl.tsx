import { useState, useCallback } from "react";
import { getIndicatorData, getIndicators } from "@/lib/api";
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
import { DataKey } from "@/models/dataSetting";

const CardControl = () => {
  const [merge, setMerge] = useState(false)

  const {
    options,
    updateList,
    updateOrigin,
    updateItem,
    updatePeriod,
    updateColor,
    updateChartData,
  } = useDataSettingStore()
  
  const handleUpdateOrigin = useCallback(async (dataKey: DataKey, origin: string) => {
    updateOrigin(dataKey, origin);
    try {
      const { indicators } = await getIndicators(origin);
      updateList(dataKey, indicators);
      updateItem(dataKey, '');
      updatePeriod(dataKey, '');
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  }, [updateOrigin, updateList, updateItem, updatePeriod]);

  const handleUpdateItem = useCallback((dataKey: DataKey, code: string) => {
    updateItem(dataKey, code)
    updatePeriod(dataKey, '')
  }, [updateItem, updatePeriod])
  
  const handleReloadData = useCallback(async (dataKey: DataKey) => {
    try {
      const response = await getIndicatorData({
        origin: options[dataKey].origin,
        code: options[dataKey].item.code,
        period: options[dataKey].period
      });
      console.log(response);
      console.log(updateChartData);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  }, [options, updateChartData]);

  const handleYaxisMerge = useCallback(() => {
    setMerge((prevMerge) => !prevMerge);
  }, []);
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
          onUpdateOrigin={handleUpdateOrigin}
          onUpdateItem={handleUpdateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateColor={updateColor}
          onReloadData={handleReloadData}
        >
        </DataSettingCard>

      </TabsContent>

      <TabsContent value="data-2">
        <DataSettingCard
          dataKey="second"
          title="Data 2"
          description="두 번째 데이터를 선택하세요. 이 데이터는 Y축 또는 Y1축에 표시됩니다."
          selectedOption={options.second}
          onUpdateOrigin={handleUpdateOrigin}
          onUpdateItem={handleUpdateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateColor={updateColor}
          onReloadData={handleReloadData}
        >
          <div className="flex items-center space-x-2">
            <Switch
              id="Combined"
              checked={merge}
              onCheckedChange={handleYaxisMerge}
            />
            <Label htmlFor="Combined">
            {/* {merge ? 'Combined Y-axis' : 'Separated Y-axes'}*/}
            { merge ? 'Y축 합치기' : 'Y축 분리하기'}
            </Label>
          </div>
        </DataSettingCard>
      </TabsContent>
    </Tabs>
  )
}

export default CardControl
