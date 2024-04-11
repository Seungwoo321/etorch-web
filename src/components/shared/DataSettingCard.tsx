import { Indicator } from "@/models/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
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
// import { Switch } from "@/components/ui/switch";
import { Label } from "../../components/ui/label";
import useDataSettingStore from "@/store/dataSettingtStore";
import { useEffect } from "react";
import { getIndicators } from "@/pages/remotes";

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
  const {
    firstList,
    firstOrigin,
    firstItem,
    updateFirstList,
    updateFirstOrigin,
    updateFirstItem,
    // secondOrigin,
    // updateSecondOrigin
  } = useDataSettingStore()

  useEffect(() => {
    if (!firstOrigin) return
    getIndicators(firstOrigin).then(({ indicators }) => {
      updateFirstList(indicators)
      updateFirstItem('')
      // setSelectPeriod('')
    })
  }, [firstOrigin, updateFirstItem, updateFirstList])

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
          <Select value={firstOrigin} onValueChange={updateFirstOrigin}>
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
            value={firstItem?.code} onValueChange={updateFirstItem}
            disabled={!firstOrigin}
          >
            <SelectTrigger>
              <SelectValue placeholder="지표를 선택하세요"/>
            </SelectTrigger>
            <SelectContent>
              {firstOrigin ? renderSelectGroupIndicatorList(firstList) : null}
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
      {/* <CardFooter>

      </CardFooter> */}

    </Card>
  )
}

export default ChartSettingCard
