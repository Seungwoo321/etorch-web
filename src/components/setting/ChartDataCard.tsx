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

type DataSettingCardProps = {
  dataKey: DataKey
  title: string
  description: string
  selectedOption: ChartDataOption
  onUpdateOrigin: (dataKey: DataKey, origin: string) => void
  onUpdateItem: (dataKey: DataKey, code: string) => void
  onUpdatePeriod: (dataKey: DataKey, period: string) => void
  onUpdateColor: (dataKey: DataKey, color: string) => void,
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
  onUpdateColor,
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
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>데이터 제공처</Label>
          <Select value={selectedOption.origin} onValueChange={(value) => onUpdateOrigin(dataKey, value)}>
            <SelectTrigger>
              <SelectValue placeholder="데이터 제공처를 선택하세요"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kosis">KOSIS</SelectItem>
              <SelectItem value="ecos">ECOS</SelectItem>
              <SelectItem value="oecd">OECD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>지표</Label>
          <Select
            value={selectedOption.item?.code} onValueChange={(value) => onUpdateItem(dataKey, value)}
            disabled={!selectedOption.origin}
          >
            <SelectTrigger>
              <SelectValue placeholder="지표를 선택하세요"/>
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
        </div>

        <div className="space-y-1">
          <Label>데이터 조회 주기</Label>
          <Select
            value={selectedOption.period}
            onValueChange={(value) => onUpdatePeriod(dataKey, value)}
            disabled={!selectedOption.item?.code}
          >
            <SelectTrigger>
              <SelectValue placeholder="데이터 조회 주기를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Y" disabled={!selectedOption.item.hasYear}> 연간 </SelectItem>
                <SelectItem value="Q" disabled={!selectedOption.item.hasQuarter}> 분기 </SelectItem>
                <SelectItem value="M" disabled={!selectedOption.item.hasMonth}> 월간 </SelectItem>
                <SelectItem value="D" disabled={!selectedOption.item.hasDay}> 일간 </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>
            선 색상
          </Label>
          <ColorPicker
            className="w-full truncate"
            background={selectedOption.color}
            setBackground={(value) => onUpdateColor(dataKey, value)}
          />
        </div>
        {children}
      </CardContent>
      <CardFooter>
        <Button
          disabled={!(selectedOption.origin && selectedOption.item.code && selectedOption.period)}
          onClick={() => onReloadData(dataKey)}
        >
          데이터 적용하기
        </Button>
      </CardFooter>

    </Card>
  )
})

export default DataSettingCard
