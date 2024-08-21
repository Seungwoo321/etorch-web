import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getIndicatorValues, getIndicators } from '@/lib/api'
import { type Indicator } from '@/models/'
import { useDataOptionStore, useYAxisOptionStore } from '@/store/editPanel'
import {
  selectPanelsDataByUnit,
  selectPanelById,
  selectUniqueDataKeys
} from '@/store/editPanel/selector'
import {
  RefreshCcwIcon,
  ChevronRightIcon,
  Trash2,
  CheckCircle
} from 'lucide-react'
import React, { useCallback, useState } from 'react'
interface DataPanelOptionsProps {
  id: number
}

function DataPanelOptions ({ id }: DataPanelOptionsProps): JSX.Element | null {
  const uniqueDataKeys = useDataOptionStore(selectUniqueDataKeys)
  const panel = useDataOptionStore(selectPanelById(id))
  const frequency = useDataOptionStore.use.frequency()
  const setChartData = useDataOptionStore.use.setChartData()
  const setFrequency = useDataOptionStore.use.setFrequency()
  const updatePanelItem = useDataOptionStore.use.updatePanelItem()
  const removePanelItem = useDataOptionStore.use.removePanelItem()
  const createIndicators = useDataOptionStore.use.createIndicators()
  const indicators = useDataOptionStore.use.indicators()
  const yAxisDataKey = useYAxisOptionStore.use.yAxisDataKey()
  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
  const updateYAxisUnit = useYAxisOptionStore.use.updateYAxisUnit()
  const updateYAxisDataKey = useYAxisOptionStore.use.updateYAxisDataKey()
  const panelsDataByUnit = useDataOptionStore(selectPanelsDataByUnit(yAxisUnit))

  const [loadingStatus, setLoadingStatus] = useState<boolean>(false)
  const [indicator, setIndicator] = useState<Indicator | undefined>((panel != null && panel?.dataSource !== '') ? indicators[panel.dataSource].find(indicator => indicator.code === panel.indicatorCode) : undefined)

  const handleCollapsibleChange = useCallback(
    (value: boolean) => {
      if (panel != null) {
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
      if (panel != null) {
        updatePanelItem(id, {
          ...panel,
          dataSource: value,
          indicatorCode: '',
          unit: '',
          frequency: '',
          data: []
        })
        setChartData()
        // updateYAxisDataKey(uniqueDataKeys.filter(key => (key !== 'date' && key !== panel.indicatorCode) || key === yAxisDataKey)[0] ?? '')
        // api call
        if (indicators[value].length === 0) {
          setLoadingStatus(true)
          getIndicators(value).then(data => {
            createIndicators(value, data.indicators)
            setLoadingStatus(false)
          }).catch(console.error)
        }
      }
    },
    [createIndicators, id, indicators, panel, updatePanelItem]
  )

  const handleindicatorCodeChange = useCallback(
    (value: string) => {
      if (panel != null) {
        const indicator = indicators[panel.dataSource].find(indicator => indicator.code === value)
        updatePanelItem(id, {
          ...panel,
          indicatorCode: value,
          unit: indicator?.unit_en ?? '',
          frequency: '',
          data: []
        })
        setIndicator(indicator)
        setChartData()
        // updateYAxisDataKey(uniqueDataKeys.filter(key => (key !== 'date' && key !== panel.indicatorCode) || key === yAxisDataKey)[0] ?? '')
      }
    },
    [id, indicators, panel, updatePanelItem]
  )

  const handleFrequencyChange = useCallback(
    (value: string) => {
      if (panel != null) {
        updatePanelItem(id, {
          ...panel,
          frequency: value,
          data: []
        })
        setChartData()
        // updateYAxisDataKey(uniqueDataKeys.filter(key => (key !== 'date' && key !== panel.indicatorCode) || key === yAxisDataKey)[0] ?? '')
      }
    },
    [id, panel, updatePanelItem]
  )

  const handleFetchData = (): void => {
    if (panel != null) {
      if ((panel.dataSource === '') || (panel.indicatorCode === '') || (panel.frequency === '')) return
      if (panel.frequency !== frequency) {
        setFrequency(panel?.frequency)
      }
      getIndicatorValues({
        origin: panel.dataSource,
        code: panel.indicatorCode,
        frequency: panel.frequency
      }).then((data) => {
        updatePanelItem(id, {
          ...panel,
          data: data.data
        })
        setChartData()
        if (!panelsDataByUnit.length) {
          updateYAxisUnit(panel.unit)
          updateYAxisDataKey(panel.indicatorCode)
        }
      }).catch(console.error)
    }
  }

  if (panel == null) return null

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
            {panel?.dataSource.length > 0 && indicator?.name != null
              ? `${indicator?.name}(${panel.unit}) - ${panel?.dataSource}:${panel.indicatorCode}:${panel.frequency}`
              : null
            }
          </CardTitle>

          <div className="flex">
            <RefreshCcwIcon className={`mr-2 ${(panel.dataSource === '') || (panel.indicatorCode === '') || (panel.frequency === '') ? 'cursor-not-allowed' : 'cursor-pointer'}`} size={14} onClick={handleFetchData} />
            <Trash2 className="cursor-pointer" style={{ margin: 0 }} size={14} onClick={() => {
              removePanelItem(id)
              setChartData()
              // updateYAxisDataKey(uniqueDataKeys.filter(key => key !== 'date' && key !== panel.indicatorCode)[0] ?? '')
            }} />
          </div>

        </div>
        <CollapsibleContent>
          <CardContent className="min-h-[100px]">
          <div className="relative md:flex flex-col">
            <div className="grid gap-6">

              <div className="grid md:grid-cols-[3fr,3fr,3fr,1fr] gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="data-source">
                    데이터 소스
                  </Label>
                  <Select
                    defaultValue={panel.dataSource}
                    value={panel.dataSource}
                    onValueChange={handleDataSourceChange}
                  >
                    <SelectTrigger id="data-source">
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
                  <Label htmlFor="data-code">
                    지표
                  </Label>
                  <Select
                    defaultValue={panel.indicatorCode}
                    value={panel.indicatorCode}
                    onValueChange={handleindicatorCodeChange}
                    disabled={panel.dataSource === ''}
                  >
                    <SelectTrigger id="data-code">
                      <SelectValue/>
                    </SelectTrigger>
                      <SelectContent>
                        {loadingStatus
                          ? (<span className="ml-2">
                              loading...
                            </span>)
                          : indicators[panel.dataSource]?.map(indicator => (
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
                  <Label htmlFor="data-frequency">
                    조회 주기
                  </Label>
                  <Select
                    defaultValue={panel.frequency}
                    value={panel.frequency}
                    onValueChange={handleFrequencyChange}
                    disabled={panel.dataSource === '' || panel.indicatorCode === ''}
                  >
                    <SelectTrigger id="data-frequency">
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A" disabled={!(indicator?.hasYear ?? false)}> 연간 </SelectItem>
                      <SelectItem value="Q" disabled={!(indicator?.hasQuarter ?? false)}> 분기 </SelectItem>
                      <SelectItem value="M" disabled={!(indicator?.hasMonth ?? false)}> 월간 </SelectItem>
                      <SelectItem value="D" disabled={!((indicator?.hasDay) ?? false)}> 일간 </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                    <Button
                      variant={(panel.data.length > 0) && panel.frequency === frequency ? 'default' : 'outline'}
                      onClick={handleFetchData}
                      disabled={(panel.dataSource === '') || (panel.indicatorCode === '') || (panel.frequency === '')}
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
