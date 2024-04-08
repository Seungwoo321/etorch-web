import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

const ChartPreview = () => {
  return (
    <div className="md:order-1">
      <Card>
        <CardHeader>
          <CardTitle>
            Preview
          </CardTitle>
          {/* <CardDescription>
            대시보드를 구성할 지표를 선택하세요. 최대 2개 선택할 수 있습니다.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          {renderLineChart}
        </CardContent>
      </Card>
    </div>
  )
}

export default ChartPreview
1