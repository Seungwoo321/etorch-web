import {
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import {
  usePanelOptionStore,
} from '@/store/editPanel'
import {
  selectTitle,
  selectDescription,
} from '@/store/editPanel/selector'

function PreviewPanelHeader () {
  const title = usePanelOptionStore(selectTitle)
  const description = usePanelOptionStore(selectDescription)

  return (
    title !== '' &&
    <CardHeader className="flex">
      <CardTitle>
        {title}
      </CardTitle>
      {description !== '' && (
        <CardDescription>
          {description}
        </CardDescription>
      )}
    </CardHeader>
  )
}

export default PreviewPanelHeader