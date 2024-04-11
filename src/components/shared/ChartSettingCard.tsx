import { Indicator } from "@/models/indicator";
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
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Label } from "../../components/ui/label";

const renderSelectGroupIndicatorList = (list: Indicator[]) => (
  <SelectGroup>
    {/* <SelectLabel>{label.toLocaleUpperCase()}</SelectLabel> */}
    {list?.map(indicator => (
      <SelectItem
        key={indicator.code}
        value={indicator.code}
      >
        {indicator.name}
      </SelectItem>
    ))}
  </SelectGroup>
)

const ChartSettingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data 1 Settings</CardTitle>
        <CardDescription>
          첫 번째 데이터를 선택하세요. 이 데이터는 Y축에 표시됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>데이터 제공처</Label>
          <Select value={selectFirstOrigin} onValueChange={setSelectFirstOrigin}>
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
            value={selectFirstItem?.code} onValueChange={onChangeFirstItem}
            disabled={!selectFirstOrigin}
          >
            <SelectTrigger>
              <SelectValue placeholder="지표를 선택하세요"/>
            </SelectTrigger>
            <SelectContent>
              {selectFirstOrigin ? renderSelectGroupIndicatorList(firstList) : null}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>기간 선택</Label>
          <Select
            value={selectPeriod}
            onValueChange={setSelectPeriod}
            disabled={!selectFirstItem?.code}
          >
            <SelectTrigger>
              <SelectValue placeholder="기간을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Y" disabled={!selectFirstItem.hasYear}> 연간 </SelectItem>
                <SelectItem value="Q" disabled={!selectFirstItem.hasQuarter}> 분기별 </SelectItem>
                <SelectItem value="M" disabled={!selectFirstItem.hasMonth}> 월간 </SelectItem>
                <SelectItem value="D" disabled={!selectFirstItem.hasDay}> 일간 </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
          <div className="flex items-center space-x-2">
            <Switch id="add-data" />
            <Label htmlFor="add-data">두 번째 데이터 추가하기</Label>
          </div>
      </CardFooter>

    </Card>
  )
}

export default ChartSettingCard
