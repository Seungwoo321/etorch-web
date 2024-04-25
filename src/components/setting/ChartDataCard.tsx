import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColorPicker } from "@/components/shared/ColorPicker";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { DataKey, ChartDataOption } from "@/models/chartData";
import React from "react";
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from "@/components/ui/input";
type DataSettingCardProps = {
  dataKey: DataKey
  title: string
  description: string
  selectedOption: ChartDataOption
  onUpdateOrigin: (dataKey: DataKey, origin: string) => void
  onUpdateItem: (dataKey: DataKey, code: string) => void
  onUpdatePeriod: (dataKey: DataKey, period: string) => void
  onUpdateLineColor: (dataKey: DataKey, color: string) => void,
  onUpdateReferenceLineType: (dataKey: DataKey, referenceLineType: string) => void,
  onUpdateReferenceLineValue: (dataKey: DataKey, value: number) => void,
  onUpdateReferenceLineColor: (dataKey: DataKey, color: string) => void,
  onReloadData: (dataKey: DataKey) => void,
  children?: ReactNode
}

const DataSettingCard = React.memo(({
  dataKey,
  title,
  description,
  selectedOption,
  onUpdateOrigin,
  onUpdateItem,
  onUpdatePeriod,
  onUpdateLineColor,
  onUpdateReferenceLineType,
  onUpdateReferenceLineValue,
  onUpdateReferenceLineColor,
  onReloadData,
  children
}: DataSettingCardProps) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <Label>데이터 라인 설정</Label>

          <div className="flex space-x-1">
            <Select value={selectedOption.origin} onValueChange={(value) => onUpdateOrigin(dataKey, value)}>
              <SelectTrigger>
                <SelectValue placeholder="제공처"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kosis">KOSIS</SelectItem>
                <SelectItem value="ecos">ECOS</SelectItem>
                <SelectItem value="oecd">OECD</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedOption.period}
              onValueChange={(value) => onUpdatePeriod(dataKey, value)}
              disabled={!selectedOption.item?.code}
            >
              <SelectTrigger>
                <SelectValue placeholder="조회 주기" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Y" disabled={!selectedOption.item.hasYear}> 연간 </SelectItem>
                  <SelectItem value="Q" disabled={!selectedOption.item.hasQuarter}> 분기 </SelectItem>
                  <SelectItem value="M" disabled={!selectedOption.item.hasMonth}> 월간 </SelectItem>
                  <SelectItem value="D" disabled={!selectedOption.item.hasDay}> 일간 </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-1">
            <Select
              value={selectedOption.item?.code} onValueChange={(value) => onUpdateItem(dataKey, value)}
              disabled={!selectedOption.origin}
            >
              <SelectTrigger>
                <SelectValue placeholder="지표"/>
              </SelectTrigger>
              <SelectContent>
                {selectedOption.list?.map(indicator => (
                  <SelectItem
                    key={indicator.code}
                    value={indicator.code}
                  >
                    {indicator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              disabled={!(selectedOption.origin && selectedOption.item.code && selectedOption.period)}
              onClick={() => onReloadData(dataKey)}
            >
              <ReloadIcon className="h-4 w-4"/>
            </Button>
          </div>

          <ColorPicker
            className="w-full truncate"
            background={selectedOption.lineColor}
            setBackground={(value) => onUpdateLineColor(dataKey, value)}
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="reference-line">참조 라인 설정</label>
          <div className="flex space-x-1">
            <Select
              full-width
              value={selectedOption.referenceLineType}
              onValueChange={(value) => onUpdateReferenceLineType(dataKey, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="참조 데이터 종류를 선택하세요"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="N/A">선택안함</SelectItem>
                <SelectItem value="manual">직접입력</SelectItem>
                <SelectItem value="avg">평균</SelectItem>
              </SelectContent>
            </Select>
            {selectedOption.referenceLineType === 'manual' 
              ? <Input
                type="number" 
                onChange={(e) => onUpdateReferenceLineValue(dataKey, Number(e.target.value))}
              ></Input>
              : null
            }
          </div>
          <ColorPicker
            className="w-full truncate"
            background={selectedOption.referenceLineColor || ''}
            setBackground={(value) => onUpdateReferenceLineColor(dataKey, value)}
          />
        </div>
        
        {children}
      </CardContent>
      <CardFooter>

      </CardFooter>

    </Card>
  )
})

export default DataSettingCard
