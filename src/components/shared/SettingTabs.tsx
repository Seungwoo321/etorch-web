import { useCallback } from "react";
import { getIndicators } from "@/lib/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useChartDataStore } from "@/store";
import LineChartSetupCard from '@/components/cards/LineChartSetupCard'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataKey } from "@/models/chartData";

const SettingTabs = () => {
  const {
    first,
    second,
    mergedYAxis,
    options,
    updateMergedYAxis,
    updateIndicatorList,
    updateOrigin,
    updateCode,
    updatePeriod,
    updateStroke,
    updateReferenceLineType,
    updateReferenceLineValue,
    updateReferenceLineColor,
    updateReloadData,
  } = useChartDataStore()
  const handleUpdateOrigin = useCallback(async (dataKey: DataKey, origin: string) => {
    updateOrigin(dataKey, origin);
    try {
      const { indicators } = await getIndicators(origin);
      updateIndicatorList(dataKey, indicators);
    } catch (error) {
      console.log(error);
    }
  }, [updateOrigin, updateIndicatorList]);

  const handleUpdateCode = useCallback((dataKey: DataKey, code: string) => {
    updateCode(dataKey, code)
  }, [updateCode])
  
  const handleUpdateReferenceLineValue = useCallback((dataKey: DataKey, value: number) => {
    updateReferenceLineValue(dataKey, value)
  }, [updateReferenceLineValue])

  const handleReloadData = useCallback(async (dataKey: DataKey) => {
    updateReloadData(dataKey, true)
  }, [updateReloadData]);

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
        <LineChartSetupCard
          dataKey="first"
          title="Data 1"
          description="첫 번째 데이터를 선택하세요. 이 데이터는 항상 Y축에 표시됩니다."
          indicatorList={first.indicatorList}
          selectedItem={first.selectedItem}
          selectedOption={options.first}
          onUpdateOrigin={handleUpdateOrigin}
          onUpdateCode={handleUpdateCode}
          onUpdatePeriod={updatePeriod}
          onUpdateStroke={updateStroke}
          onUpdateReferenceLineType={updateReferenceLineType}
          onUpdateReferenceLineValue={handleUpdateReferenceLineValue}
          onUpdateReferenceLineColor={updateReferenceLineColor}
          onReloadData={handleReloadData}
        >          
        </LineChartSetupCard>

      </TabsContent>

      <TabsContent value="data-2">
        <LineChartSetupCard
          dataKey="second"
          title="Data 2"
          description="두 번째 데이터를 선택하세요. 이 데이터는 Y축 또는 Y1축에 표시됩니다."
          indicatorList={second.indicatorList}
          selectedItem={second.selectedItem}
          selectedOption={options.second}
          onUpdateOrigin={handleUpdateOrigin.bind('first')}
          onUpdateCode={handleUpdateCode}
          onUpdatePeriod={updatePeriod}
          onUpdateStroke={updateStroke}
          onUpdateReferenceLineType={updateReferenceLineType}
          onUpdateReferenceLineValue={handleUpdateReferenceLineValue}
          onUpdateReferenceLineColor={updateReferenceLineColor}
          onReloadData={handleReloadData}
        >
          <div className="flex items-center space-x-2">
            <Switch
              id="Combined"
              checked={first.selectedItem.unit_en !== second.selectedItem.unit_en ? false : mergedYAxis}
              disabled={first.selectedItem.unit_en !== second.selectedItem.unit_en}
              onCheckedChange={handleYaxisMerge}
              />
            <Label htmlFor="Combined">
            {/* {mergedYAxis ? 'Combined Y-axis' : 'Separated Y-axes'}*/}
            { mergedYAxis ? 'Y축 합치기' : 'Y축 분리하기'}
            </Label>
          </div>
        </LineChartSetupCard>
      </TabsContent>
    </Tabs>
  )
}

export default SettingTabs
