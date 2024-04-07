import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getIndicatorsFromKosis } from "@/pages/remotes";
import { Indicator } from "@/models/indicator";
// import { useForm } from "react-hook-form"

// import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label";

// const FormSchema = z.object({
//   email: z
//     .string({
//       required_error: "Please select an email to display.",
//     })
//     .email(),
// })

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 100, pv: 2400, amt: 2400},
  {name: 'Page C', uv: 200, pv: 2400, amt: 100},
  {name: 'Page D', uv: 300, pv: 2400, amt: 1200}
];


const renderLineChart = (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#000" />
    <Line type="monotone" dataKey="pv" stroke="#000" />
    <Line type="monotone" dataKey="amt" stroke="#000" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    {/* <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" /> */}
    <Tooltip />
  </LineChart>
);

const CreateChartForm = () => {
  const [indicatorsFromKosis, setIndicatorsFromKosis] = useState<Indicator[]>([])
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | never>()
  useEffect(() => {
    getIndicatorsFromKosis().then(({ indicators }) => {
      console.log(indicators)
      setIndicatorsFromKosis(indicators)
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Configuration
        </CardTitle>
        <CardDescription>
          대시보드를 구성할 지표를 선택하세요. 최대 2개 선택할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="grid gap-2">
            <Label>데이터 선택</Label>
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger className="w-[350px]">
                <SelectValue placeholder="지표를 선택하세요"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectItem value="none">
                    선택안함
                  </SelectItem> */}
                  <SelectLabel>KOSIS</SelectLabel>
                    {indicatorsFromKosis?.map(indicator => (
                      <SelectItem
                        key={indicator.code}
                        value={indicator.code}
                      >
                        {indicator.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
              11111111111 {selectedIndicator?.name}
            <Select>
              <SelectTrigger className="w-[350px]">
                <SelectValue placeholder="기간을 선택하세요"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A" disabled={!selectedIndicator?.has_year}> 연간 </SelectItem>
                <SelectItem value="Q" disabled={!selectedIndicator?.has_quarter}> 분기 </SelectItem>
                <SelectItem value="M" disabled={!selectedIndicator?.has_month}> 월간 </SelectItem>
                <SelectItem value="D" disabled={!selectedIndicator?.has_day}> 일간 </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>차트 구성</Label>
            ColorPicker
          </div>
        </div>
        {/* <Label>지표2</Label>
        <Select>
          <SelectTrigger
            className="w-[350px]"
          >
            <SelectValue
              placeholder="지표를 선택하세요"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">
                선택안함
              </SelectItem>
              <SelectLabel>KOSIS</SelectLabel>
                {indicatorsFromKosis?.map(indicator => (
                  <SelectItem
                    key={indicator.code}
                    value={indicator.code}
                  >
                    - {indicator.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </CardContent>
      <CardContent>
        {renderLineChart}
      </CardContent>
    </Card>
  )
}

export default CreateChartForm
1