import CreateChartForm from "@/components/CreateChartForm"
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getIndicators } from "./remotes";
import { Indicator } from "@/models/indicator";
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

const Dashboard = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  useEffect(() => {
    getIndicators().then(({ indicators }) => {
      // console.log(indicators.map(indicator => indicator.code))
      setIndicators(indicators)
    })
  }, [])

  return (
    <div>
      <CreateChartForm />
      <hr />
      {renderLineChart}
      <hr />
      <h1>
        KOSIS
      </h1>
      {indicators.map(indicator => (
        <div key={indicator.code}>
          {indicator.name}
        </div>
      ))}
    </div>
  )
}

export default Dashboard
