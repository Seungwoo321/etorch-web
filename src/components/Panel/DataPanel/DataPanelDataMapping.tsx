import { useDataOptionStore } from '@/store/editPanel'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  selectPanelsData
} from '@/store/editPanel/selector'
function DataPanelDataMapping () {
  const panelsData = useDataOptionStore(selectPanelsData)
  console.log(panelsData)
  return (
    <Table>
      <TableCaption>A list of data series you selected.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Query key</TableHead>
          <TableHead>Y-Axis</TableHead>
          <TableHead className="w-[100px] text-right">Color</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {panelsData.map(panel => (
          <TableRow key={panel.id}>
            <TableCell className="font-medium">
              {panel.dataSource.toUpperCase()}:{panel.indicatorCode}:{panel.unit}
            </TableCell>
            <TableCell>{JSON.stringify(panel)}</TableCell>
            <TableCell >$250.00</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}
export default DataPanelDataMapping
