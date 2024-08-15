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
import { useDataOptionStore } from "@/store/editPanel";
import {
  selectPanelById,
  selectFrequency,
  selectIndicators,
  selectSetFrequency,
  selectUpdatePanelItem,
  selectRemovePanelItem,
  selectCreateIndicators,
  selectSetChartData
} from "@/store/editPanel/selector"
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

function DataPanelOptions({ id }: DataPanelOptionsProps) {
  const panel = useDataOptionStore(selectPanelById(id))
  const frequency = useDataOptionStore(selectFrequency)
  const setChartData = useDataOptionStore(selectSetChartData)
  const setFrequency = useDataOptionStore(selectSetFrequency)
  const updatePanelItem = useDataOptionStore(selectUpdatePanelItem)
  const removePanelItem = useDataOptionStore(selectRemovePanelItem)
  const createIndicators = useDataOptionStore(selectCreateIndicators)
  const indicatorList = useDataOptionStore(selectIndicators)
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
      setFrequency(panel?.frequency)
      getIndicatorValues({
        origin: panel?.dataSource,
        code: panel?.indicatorCode,
        frequency: panel?.frequency
      }).then(data => {
        updatePanelItem(id, {
          ...panel,
          data: data.data
        })
        setChartData()        
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
          <CardTitle className="flex items-center">
            <CollapsibleTrigger
              asChild
            >
              <div className="flex [&[data-state=open]>svg]:rotate-90">
                <ChevronRightIcon className="cursor-pointer transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            {panel?.dataSource && indicator?.name ? 
              `${indicator?.name} - ${panel?.dataSource.toUpperCase()}:${panel.indicatorCode}:${panel.frequency}:${panel.unit}`
              : null 
            }
          </CardTitle>

          <div className="flex">
            <RefreshCcwIcon className="cursor-pointer mr-2" size={14} onClick={handleFetchData} />
            <Trash2 className="cursor-pointer" style={{ margin: 0 }} size={14} onClick={() => {
              removePanelItem(id)
              setChartData()
            }} />
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
                      variant={panel.data.length && panel.frequency === frequency ? "default" : "outline"}
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