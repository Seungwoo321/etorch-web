import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIndicatorValues, getIndicators } from "@/lib/api";
import { Indicator } from "@/models/";
import { useDataPanelStore, DataPanelStore } from "@/store/dataPanelStore";
import {
  RefreshCcwIcon,
  ChevronRightIcon,
  Trash2,
  CheckCircle
} from "lucide-react"
import React, { useCallback, useState } from "react";
type DataPanelOptionsProps = {
  id: number;
};

const selectPanelById = (id: number) => (state: DataPanelStore) => state.panels.find(panel => panel.id === id)
const selectUpdatePanelItem = (state: DataPanelStore) => state.updatePanelItem
const selectRemovePanelItem = (state: DataPanelStore) => state.removePanelItem

const selectCreateIndicators = (state: DataPanelStore) => state.createIndicators
const selectIndicators = (state: DataPanelStore) =>  state.indicators

function DataPanelOptions({ id }: DataPanelOptionsProps) {
  const panel = useDataPanelStore(selectPanelById(id))
  const updatePanelItem = useDataPanelStore(selectUpdatePanelItem)
  const removePanelItem = useDataPanelStore(selectRemovePanelItem)
  const createIndicators = useDataPanelStore(selectCreateIndicators)
  const indicatorList = useDataPanelStore(selectIndicators)
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false)
  const [indicator, setIndicator] = useState<Indicator | null>(panel?.dataSource ? indicatorList[panel.dataSource].find(indicator => indicator.code === panel.indicatorCode) ?? null : null)


  const handleCollapsibleChange = useCallback(
    (value: boolean) => {
      if (panel) {
        updatePanelItem(id, {
          ...panel,
          isOpen: value
        })
      }
    },
    [id, panel, updatePanelItem]
  )
  
  const handleDataSourceChange = useCallback(
    (value: string) => {
      if (panel) {
        updatePanelItem(id, {
          ...panel,
          dataSource: value,
          indicatorCode: '',
          frequency: '',
          data: []
        })
        // api call
        if (!indicatorList[value].length) {
          setLoadingStatus(true)
          getIndicators(value).then(data => {
            createIndicators(value, data.indicators)   
            setLoadingStatus(false)
          })
        }
      }
    },
    [createIndicators, id, indicatorList, panel, updatePanelItem]
  )
  
  const handleindicatorCodeChange = useCallback(
    (value: string) => {
      if (panel) {
        const indicator = indicatorList[panel.dataSource].find(indicator => indicator.code === value)
        updatePanelItem(id, {
          ...panel,
          indicatorCode: value,
          unit: indicator?.unit_en,
          frequency: '',
          data: []
        })
        setIndicator(indicator ?? null)
      }
    },
    [id, indicatorList, panel, updatePanelItem]
  )
  
  const handleFrequencyChange = useCallback(
    (value: string) => {
      if (panel) {
        updatePanelItem(id, {
          ...panel,
          frequency: value,
          data: []
        })
      }
    },
    [id, panel, updatePanelItem]
  )

  const handleFetchData = () => {
    if (panel) {
      getIndicatorValues({
        origin: panel?.dataSource,
        code: panel?.indicatorCode,
        frequency: panel?.frequency
      }).then(data => {
        updatePanelItem(id, {
          ...panel,
          data: data.data
        })
      })
    }
  }

  if (!panel) return null
  
  return (
    <Collapsible
      open={panel.isOpen}
      onOpenChange={handleCollapsibleChange}
    >
      <Card className="h-full m-2">
        <div className="flex justify-between items-center p-4">
          <CollapsibleTrigger
            asChild
          >
            <div className="flex [&[data-state=open]>svg]:rotate-90">
              <ChevronRightIcon className="cursor-pointer transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          <CardTitle className="flex items-center">
            {indicator?.name ? `${indicator?.name} / ${indicator.unit_ko} : ${panel?.dataSource} + ${panel?.indicatorCode} + ${panel?.frequency}` : ''}
          </CardTitle>
          <div className="flex">
            <RefreshCcwIcon className="cursor-pointer mr-2" size={14} onClick={handleFetchData} />
            <Trash2 className="cursor-pointer" style={{ margin: 0 }} size={14} onClick={() => removePanelItem(id)} />
          </div>

        </div>
        <CollapsibleContent>
          <CardContent className="min-h-[100px]">
          <div className="relative md:flex flex-col">
            <div className="grid gap-6">

              <div className="grid md:grid-cols-[3fr,3fr,3fr,1fr] gap-4">
                <div className="grid gap-3">
                  <Label>
                    데이터 소스
                  </Label>
                  <Select
                    defaultValue={panel.dataSource}
                    value={panel.dataSource}
                    onValueChange={handleDataSourceChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kosis">KOSIS</SelectItem>
                      <SelectItem value="ecos">ECOS</SelectItem>
                      <SelectItem value="oecd">OECD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label>
                    지표
                  </Label>
                  <Select
                    defaultValue={panel.indicatorCode}
                    value={panel.indicatorCode}
                    onValueChange={handleindicatorCodeChange}
                    disabled={!panel.dataSource}
                  >
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                      <SelectContent>
                        {loadingStatus
                          ? (<span className="ml-2">
                              loading...
                            </span>)
                          : indicatorList[panel.dataSource]?.map(indicator => (
                          <SelectItem
                            key={indicator.code}
                            value={indicator.code}
                          >
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label>
                    조회 주기
                  </Label>
                  <Select
                    defaultValue={panel.frequency}
                    value={panel.frequency}
                    onValueChange={handleFrequencyChange}
                    disabled={!panel.indicatorCode}
                  >
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A" disabled={!indicator?.hasYear}> 연간 </SelectItem>
                      <SelectItem value="Q" disabled={!indicator?.hasQuarter}> 분기 </SelectItem>
                      <SelectItem value="M" disabled={!indicator?.hasMonth}> 월간 </SelectItem>
                      <SelectItem value="D" disabled={!indicator?.hasDay}> 일간 </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                    <Button
                      variant={panel.data.length ? "default" : "outline"}
                      onClick={handleFetchData}
                      disabled={!panel.dataSource || !panel.indicatorCode || !panel.frequency}
                    >
                    <CheckCircle />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

const MemoizedDataPanelOptions = React.memo(DataPanelOptions)
export default MemoizedDataPanelOptions