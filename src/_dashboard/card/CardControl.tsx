import { useEffect, useState } from "react";
import { getIndicators } from "@/lib/api";
import { Indicator } from "@/models/dashboard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useDataSettingStore } from "@/store";
// import { Label } from "../../components/ui/label";
// import { GradientPicker } from "@/components/shared/GradientPicker";
import DataSettingCard from '@/components/card/DataSettingCard'


const getPeriodValue = (item: Indicator) => (item.hasYear && "Y") || (item.hasQuarter && "Q") || (item.hasMonth && "M") || (item.hasDay && "D") || ''

const CardControl = () => {
  // const { updateFirstList, updateSecondList, firstList, secondList } = useDataSettingStore()
  // const [selectFirstOrigin, setSelectFirstOrigin] = useState<string>('')
  // const [selectFirstItem, setSelectFirstItem] = useState<Indicator>({
  //   origin: '',
  //   name: '',
  //   description: '',
  //   unit_ko: '',
  //   unit_en: '',
  //   code: '',
  //   hasMonth: false,
  //   hasQuarter: false,
  //   hasYear: false,
  //   hasDay: false
  // })
  // const [selectPeriod, setSelectPeriod] = useState<string>(getPeriodValue(selectFirstItem))

  // const [selectSecondOrigin, setSelectSecondOrigin] = useState<string>('')
  // const [selectSecondCode, setSelectSecondCode] = useState<string>('')



  // useEffect(() => {
  //   if (!selectSecondOrigin) return
  //   getIndicators(selectSecondOrigin).then(({ indicators }) => {
  //     updateSecondList(indicators)
  //     setSelectSecondCode('')
  //   })
  // }, [selectSecondOrigin, updateSecondList])

  // const onChangeFirstItem = (value: string) => {
  //   const item = firstList.find(item => item.code === value)
  //   if (item) {
  //     setSelectFirstItem(item)
  //     setSelectPeriod(getPeriodValue(item))
  //   }
  // }

  return (
    <Tabs defaultValue="data" className="flex-col sm:flex md:order-2 w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data">Data</TabsTrigger>
        <TabsTrigger value="chart">Chart</TabsTrigger>
      </TabsList>

      <TabsContent value="data" className="space-y-2">
        <DataSettingCard
          
        >

        </DataSettingCard>
        {/* <Card>
          <CardHeader>
            <CardTitle>Data 2 Settings</CardTitle>
            <CardDescription>
              두 번째 데이터를 선택하세요. 이 데이터는 Y축의 좌측 또는 우측에 표시됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card> */}
      </TabsContent>

      <TabsContent value="chart">
        {/* <Card>
          <CardHeader>
            <CardTitle>Data 2</CardTitle>
            <CardDescription>
              그래프를 설정하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>
                GridLine
              </Label>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="xaxis-view"/>
                  <Label htmlFor="xaxis-view">X Axis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="yaxis-view"/>
                  <Label htmlFor="yaxis-view">Y Axis</Label>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label>
                Line Color 1
              </Label>
              <GradientPicker
                className="w-full truncate"
                background={'#fff'}
                setBackground={pickColor}
              />
            </div>

            <div className="space-y-1">
              <Label>
                Line Color 2
              </Label>
              <GradientPicker
                className="w-full truncate"
                background={'#fff'}
                setBackground={pickColor}
              />
            </div>
          </CardContent>
        </Card> */}

      </TabsContent>
    </Tabs>
  )
}

export default CardControl
