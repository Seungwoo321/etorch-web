import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// import { useForm } from "react-hook-form"

// import { z } from "zod"
import {
  Card,
  CardContent,
  // CardDescription,
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
  {name: '2020. 01', uv: 1400, pv: 10, amt: 1200},
  {name: '2020. 02', uv: 1100, pv: 20, amt: 1200},
  {name: '2020. 03', uv: 1200, pv: 50, amt: 1200},
  {name: '2020. 04', uv: 2300, pv: 100, amt: 1200}
];


const renderLineChart = (
  
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#eb4034" yAxisId="1" />
      <Line type="monotone" dataKey="pv" stroke="#002fff" yAxisId="2" />
      <Line type="monotone" dataKey="amt" stroke="#000" yAxisId="1" />
      <CartesianGrid stroke="#ddd" strokeDasharray="0" />
      <XAxis dataKey="name" stroke='#777474' />
      <YAxis stroke='#777474' yAxisId="1" domain={[100, 2000]} />
      <YAxis stroke="#777474" orientation="right" allowDataOverflow domain={[0, 100]} type="number" yAxisId="2" />
      <Tooltip />
    </LineChart>
);

const CardPreview = () => {
  

  return (
    <div className="md:order-1">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            Preview
          </CardTitle>
          {/* <CardDescription>
            대시보드를 구성할 지표를 선택하세요. 최대 2개 선택할 수 있습니다.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderLineChart}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardPreview
1