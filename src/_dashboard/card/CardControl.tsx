import { useState, useCallback } from "react";
import { getIndicatorData, getIndicators } from "@/lib/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useChartDataStore } from "@/store";
import ChartDataCard from '@/components/setting/ChartDataCard'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataKey } from "@/models/chartData";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CardControl = () => {
  const [referenceLine, setReferenceLine] = useState<string>('')
  

  const {
    mergedYAxis,
    options,
    updateMergedYAxis,
    updateList,
    updateOrigin,
    updateItem,
    updatePeriod,
    updateColor,
    updateReferenceValue,
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
  
  const onUpdateReferenceValue = useCallback((dataKey: DataKey, e: React.ChangeEvent<HTMLInputElement>) => {
    updateReferenceValue(dataKey, Number(e.target.value))
  }, [updateReferenceValue])

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
        <ChartDataCard
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
          <div className="space-y-1">
            <label htmlFor="reference-line">참조 선</label>
            <div className="flex space-x-1">
              <Select
                full-width
                value={referenceLine}
                onValueChange={setReferenceLine}
              >
                <SelectTrigger>
                  <SelectValue placeholder="참조 데이터 형식을 선택하세요"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">직접입력</SelectItem>
                  <SelectItem value="avg">평균</SelectItem>
                  <SelectItem value="ma">이동평균</SelectItem>
                </SelectContent>
              </Select>
              {referenceLine === 'manual' 
                ? <Input type="number" onChange={(e) => onUpdateReferenceValue('first', e)}></Input>
                : null
              }
            </div>
          </div>

      
          
        </ChartDataCard>

      </TabsContent>

      <TabsContent value="data-2">
        <ChartDataCard
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
              checked={options.first.item.unit_en !== options.second.item.unit_en ? false : mergedYAxis}
              disabled={options.first.item.unit_en !== options.second.item.unit_en}
              onCheckedChange={handleYaxisMerge}
              />
            <Label htmlFor="Combined">
            {/* {mergedYAxis ? 'Combined Y-axis' : 'Separated Y-axes'}*/}
            { mergedYAxis ? 'Y축 합치기' : 'Y축 분리하기'}
            </Label>
          </div>

          <div className="space-y-1">
            <label htmlFor="reference-line">참조 선</label>
            <div className="flex space-x-1">
              <Select
                full-width
                value={referenceLine}
                onValueChange={setReferenceLine}
              >
                <SelectTrigger>
                  <SelectValue placeholder="참조 데이터 형식을 선택하세요"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">직접입력</SelectItem>
                  <SelectItem value="avg">평균</SelectItem>
                  <SelectItem value="ma">이동평균</SelectItem>
                </SelectContent>
              </Select>
              {referenceLine === 'manual' 
                ? <Input type="number" onChange={(e) => onUpdateReferenceValue('second', e)}></Input>
                : null
              }
            </div>
          </div>
        </ChartDataCard>
      </TabsContent>
    </Tabs>
  )
}

export default CardControl
