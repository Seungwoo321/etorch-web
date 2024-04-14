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
import { GradientPicker } from "@/components/shared/GradientPicker";
import { Label } from "../ui/label";
import { DataSettingOption, DataKey } from "@/store/dataSettingtStore";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type DataSettingCardProps = {
  dataKey: DataKey
  title: string
  description: string
  selectedOption: DataSettingOption
  onUpdateOrigin: (dataKey: DataKey, origin: string) => void
  onUpdateItem: (dataKey: DataKey, code: string) => void
  onUpdatePeriod: (dataKey: DataKey, period: string) => void
  onUpdateColor: (dataKey: DataKey, color: string) => void,
  children?: ReactNode
}

const DataSettingCard = ({
  dataKey,
  title,
  description,
  selectedOption,
  onUpdateOrigin,
  onUpdateItem,
  onUpdatePeriod,
  onUpdateColor,
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
          <Label>데이터 선택</Label>
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
          <Label>기간 선택</Label>
          <Select
            value={selectedOption.period}
            onValueChange={(value) => onUpdatePeriod(dataKey, value)}
            disabled={!selectedOption.item?.code}
          >
            <SelectTrigger>
              <SelectValue placeholder="기간을 선택하세요" />
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
            라인 색상
          </Label>
          <GradientPicker
            className="w-full truncate"
            background={selectedOption.color}
            setBackground={(value) => onUpdateColor(dataKey, value)}
          />
        </div>
        {children}
      </CardContent>
      <CardFooter>
        <Button>데이터 적용하기</Button>
      </CardFooter>

    </Card>
  )
}

export default DataSettingCard
