import LineChartCard from "@/components/cards/LineChartCard"
import type { Dashboard } from "@/models/dashboard";
import { useDashboardStore } from "@/store"
import { useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
function Dashboard() {

  const {
    currentDashboard
  } = useDashboardStore()
  const initialLayout = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      i: '0',
      minW: 4,
      minH: 6,
      isDraggable: true,
      isResizable: true
    },
    {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      i: '1',
      minW: 4,
      minH: 6,
      isDraggable: true,
      isResizable: true
    },
    {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      i: '2',
      minW: 4,
      minH: 6,
      isDraggable: true,
      isResizable: true
    }
  ]
  const [currentBreakPoint, setCurrentBreakPoint] = useState<string | undefined>('lg')
  const [compactType, setCompactType] = useState<"vertical" | "horizontal" | null | undefined>('vertical')
  const [layouts, setLayouts] = useState<Layouts>({
    lg: initialLayout,
    md: initialLayout
  })
  const [layout, setLayout] = useState<Layout[]>(initialLayout)
  const ResponsiveGridLayout = WidthProvider(Responsive);
  return (
    <ResponsiveGridLayout
      preventCollision={false}
      allowOverlap={false}
      compactType={compactType}
      verticalCompact={true}
      layouts={layouts}
      useCSSTransforms={false}
      measureBeforeMount={false}
      isBounded={false}
      rowHeight={40}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
      onLayoutChange={(layout, layouts) => {
        setLayout.bind(layout)
        setLayouts.bind(layouts)
        console.log(layouts)
      }}
    >
      {currentDashboard?.data?.map((item, index) => (
        (<div
          className="overflow-hidden"

          key={index}

        >
          <LineChartCard
            mode="view"
            
            firstLine={{
              ...item.line[0],
              reload: item.line.length > 0
            }}
            secondLine={{
              ...item.line[1],
              reload: item.line.length > 1
            }}
          >
          </LineChartCard>
        </div>)
          // <LineChartCard
          //   mode="view"
          //   key={index}
          //   firstLine={{
          //     ...item.line[0],
          //     reload: item.line.length > 0
          //   }}
          //   secondLine={{
          //     ...item.line[1],
          //     reload: item.line.length > 1
          //   }}
          // >
          // </LineChartCard>
      ))}
    </ResponsiveGridLayout>
  )
}

export default Dashboard
