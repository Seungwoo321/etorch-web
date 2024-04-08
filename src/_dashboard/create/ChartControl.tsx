import { useEffect, useState } from "react";
import { getIndicators } from "@/pages/remotes";
import { Indicator, Origin } from "@/models/indicator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Button
} from '@/components/ui/button'
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
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIndicatorStore } from "@/store";
import { Label } from "../../components/ui/label";
import { Separator } from "@/components/ui/separator";

const ChartControl = () => {
  const { updateFirstList, updateSecondList, firstList, secondList } = useIndicatorStore()
  const [selectFirstOrigin, setSelectFirstOrigin] = useState<string>('')
  const [selectFirstCode, setSelectFirstCode] = useState<string>('')
  const [selectSecondOrigin, setSelectSecondOrigin] = useState<string>('')
  const [selectSecondCode, setSelectSecondCode] = useState<string>('')

  useEffect(() => {
    if (!selectFirstOrigin) return
    getIndicators(selectFirstOrigin).then(({ indicators }) => {
      updateFirstList(indicators)
      setSelectFirstCode('')
    })
  }, [selectFirstOrigin, updateFirstList])

  useEffect(() => {
    if (!selectFirstOrigin) return
    console.log(selectFirstOrigin)
  }, [selectFirstOrigin])

  useEffect(() => {
    if (!selectSecondOrigin) return
    getIndicators(selectSecondOrigin).then(({ indicators }) => {
      updateSecondList(indicators)
      setSelectSecondCode('')
    })
  }, [selectSecondOrigin, updateSecondList])

  useEffect(() => {
    if (!selectSecondOrigin) return
    console.log(selectSecondOrigin)
  }, [selectSecondOrigin])
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
  return (
    <Tabs defaultValue="data" className="flex-col sm:flex md:order-2 w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data">Data</TabsTrigger>
        <TabsTrigger value="Chart">Chart</TabsTrigger>
      </TabsList>

      <TabsContent value="data">
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>
              지표를 선택하세요. 최대 2개까지 선택할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>데이터 제공처1</Label>
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
              <Label>데이터 선택1</Label>
              <Select value={selectFirstCode} onValueChange={setSelectFirstCode} disabled={!selectFirstOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="지표를 선택하세요"/>
                </SelectTrigger>
                <SelectContent>
                  {selectFirstOrigin ? renderSelectGroupIndicatorList(firstList) : null}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-1">
              <Label>데이터 제공처2</Label>
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
              <Label>데이터 선택2</Label>
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
      {/* <Label>기간 선택</Label> */}
    </Tabs>
  )
}

export default ChartControl
