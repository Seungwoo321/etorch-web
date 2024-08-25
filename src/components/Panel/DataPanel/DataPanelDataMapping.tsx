import {
  useDataOptionStore,
  useYAxisOptionStore,
  useYAxisSecondaryOptionStore
} from '@/store/editPanel'
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
  const yAxisUnit = useYAxisOptionStore.use.yAxisUnit()
  const yAxisSecondaryUnit = useYAxisSecondaryOptionStore.use.yAxisSecondaryUnit()
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
              {panel.dataSource}:{panel.indicatorCode}:{panel.unit}:{panel.frequency}
            </TableCell>
            <TableCell>
              {panel.unit === yAxisUnit ? 'left' : ''}
              {panel.unit === yAxisSecondaryUnit ? 'right' : ''}
            </TableCell>
            <TableCell >{JSON.stringify(panel)}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}
export default DataPanelDataMapping
