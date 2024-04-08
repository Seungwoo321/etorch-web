import { useEffect, useState } from "react";
import { getIndicators } from "@/pages/remotes";
import { Indicator } from "@/models/indicator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
  SelectContent,
  SelectGroup,
  // SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIndicatorStore } from "@/store";
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

const ChartControl = () => {
  const { updateFirstList, updateSecondList, firstList, secondList } = useIndicatorStore()
  const [selectFirstOrigin, setSelectFirstOrigin] = useState<string>('')
  const [selectFirstItem, setSelectFirstItem] = useState<Indicator>({
    origin: '',
    name: '',
    description: '',
    unit_ko: '',
    unit_en: '',
    code: '',
    hasMonth: false,
    hasQuarter: false,
    hasYear: false,
    hasDay: false
  })


  const [selectSecondOrigin, setSelectSecondOrigin] = useState<string>('')
  const [selectSecondCode, setSelectSecondCode] = useState<string>('')

  useEffect(() => {
    if (!selectFirstOrigin) return
    getIndicators(selectFirstOrigin).then(({ indicators }) => {
      updateFirstList(indicators)
      setSelectFirstItem({
        origin: '',
        name: '',
        description: '',
        unit_ko: '',
        unit_en: '',
        code: '',
        hasMonth: false,
        hasQuarter: false,
        hasYear: false,
        hasDay: false
      })
    })
  }, [selectFirstOrigin, updateFirstList])

  useEffect(() => {
    if (!selectSecondOrigin) return
    getIndicators(selectSecondOrigin).then(({ indicators }) => {
      updateSecondList(indicators)
      setSelectSecondCode('')
    })
  }, [selectSecondOrigin, updateSecondList])

  const onChangeFirstItem = (value: string) => {
    const item = firstList.find(item => item.code === value)
    if (item) {
      setSelectFirstItem(item)
    }
  }

  return (
    <Tabs defaultValue="data-1" className="flex-col sm:flex md:order-2 w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data-1">Data 1</TabsTrigger>
        <TabsTrigger value="data-2">Data 2</TabsTrigger>
      </TabsList>

      <TabsContent value="data-1">
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>
              첫 번째 지표를 선택하세요. 이 데이터는 y축에 표시 됩니다.
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
                value={(selectFirstItem.hasYear && "Y") || (selectFirstItem.hasQuarter && "Q") || (selectFirstItem.hasMonth && "M") || (selectFirstItem.hasDay && "D") || ''}
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
        </Card>

      </TabsContent>

      <TabsContent value="data-2">
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>
              두번째 지표를 선택하세요. 이 데이터는 y축 또는 y1축에 표시 됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="space-y-1">
              <Label>데이터 제공처</Label>
              <Select value={selectSecondOrigin} onValueChange={setSelectSecondOrigin}>
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
              <Select value={selectSecondCode} onValueChange={setSelectSecondCode} disabled={!selectSecondOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="지표를 선택하세요"/>
                </SelectTrigger>
                <SelectContent>
                  {selectSecondOrigin ? renderSelectGroupIndicatorList(secondList) : null}
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>

      </TabsContent>
    </Tabs>
  )
}

export default ChartControl
