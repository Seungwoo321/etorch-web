import { useCallback } from "react";
import { getIndicatorData, getIndicators } from "@/lib/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useChartDataStore } from "@/store";
import ChartSettingCard from '@/components/cards/ChartSettingCard'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataKey } from "@/models/chartData";

const SettingTabs = () => {
  const {
    mergedYAxis,
    options,
    updateMergedYAxis,
    updateList,
    updateOrigin,
    updateItem,
    updatePeriod,
    updateLineColor,
    updateReferenceLineType,
    updateReferenceLineValue,
    updateReferenceLineColor,
    updateChartData,
  } = useChartDataStore()
  const handleUpdateOrigin = useCallback(async (dataKey: DataKey, origin: string) => {
    updateOrigin(dataKey, origin);
    try {
      const { indicators } = await getIndicators(origin);
      updateList(dataKey, indicators);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  }, [updateOrigin, updateList]);

  const handleUpdateItem = useCallback((dataKey: DataKey, code: string) => {
    updateItem(dataKey, code)
  }, [updateItem])
  
  const handleUpdateReferenceLineValue = useCallback((dataKey: DataKey, value: number) => {
    updateReferenceLineValue(dataKey, value)
  }, [updateReferenceLineValue])

  const handleReloadData = useCallback(async (dataKey: DataKey) => {
    try {
      const response = await getIndicatorData({
        origin: options[dataKey].origin,
        code: options[dataKey].item.code,
        period: options[dataKey].period
      });
      updateChartData(dataKey, response.data)
    } catch (error) {
      console.log(error);
    }
  }, [options, updateChartData]);

  const handleYaxisMerge = useCallback(() => {
    updateMergedYAxis(!mergedYAxis);
  }, [mergedYAxis, updateMergedYAxis]);
  return (
    <Tabs defaultValue="data-1" className="flex-col sm:flex md:order-2 w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data-1">Data 1</TabsTrigger>
        <TabsTrigger value="data-2">Data 2</TabsTrigger>
      </TabsList>

      <TabsContent value="data-1" className="space-y-2">
        <ChartSettingCard
          dataKey="first"
          title="Data 1"
          description="첫 번째 데이터를 선택하세요. 이 데이터는 항상 Y축에 표시됩니다."
          selectedOption={options.first}
          onUpdateOrigin={handleUpdateOrigin}
          onUpdateItem={handleUpdateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateLineColor={updateLineColor}
          onUpdateReferenceLineType={updateReferenceLineType}
          onUpdateReferenceLineValue={handleUpdateReferenceLineValue}
          onUpdateReferenceLineColor={updateReferenceLineColor}
          onReloadData={handleReloadData}
        >          
        </ChartSettingCard>

      </TabsContent>

      <TabsContent value="data-2">
        <ChartSettingCard
          dataKey="second"
          title="Data 2"
          description="두 번째 데이터를 선택하세요. 이 데이터는 Y축 또는 Y1축에 표시됩니다."
          selectedOption={options.second}
          onUpdateOrigin={handleUpdateOrigin}
          onUpdateItem={handleUpdateItem}
          onUpdatePeriod={updatePeriod}
          onUpdateLineColor={updateLineColor}
          onUpdateReferenceLineType={updateReferenceLineType}
          onUpdateReferenceLineValue={handleUpdateReferenceLineValue}
          onUpdateReferenceLineColor={updateReferenceLineColor}
          onReloadData={handleReloadData}
        >
          <div className="flex items-center space-x-2">
            <Switch
              id="Combined"
              checked={options.first.item.unit_en !== options.second.item.unit_en ? false : mergedYAxis}
              disabled={options.first.item.unit_en !== options.second.item.unit_en}
              onCheckedChange={handleYaxisMerge}
              />
            <Label htmlFor="Combined">
            {/* {mergedYAxis ? 'Combined Y-axis' : 'Separated Y-axes'}*/}
            { mergedYAxis ? 'Y축 합치기' : 'Y축 분리하기'}
            </Label>
          </div>
        </ChartSettingCard>
      </TabsContent>
    </Tabs>
  )
}

export default SettingTabs
