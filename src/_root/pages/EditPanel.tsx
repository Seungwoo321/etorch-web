import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import DataPanel from "@/components/Panel/DataPanel/DataPanel"
import OptionsPanel from "@/components/Panel/OptionsPanel/OptionsPanel"
import PreviewPanel from "@/components/Panel/PreviewPanel/PreviewPanel"

function EditPanel () {
  return (
    <div className="py-3 h-full">
      <ResizablePanelGroup
        direction="horizontal"
      >
        <ResizablePanel
          defaultSize={80}
          minSize={50}
        >
          <ResizablePanelGroup
            direction="vertical"
          >
            <ResizablePanel
              order={1}
              defaultSize={60}
              minSize={0}
            >
              <PreviewPanel/>
            </ResizablePanel>
            <ResizableHandle
              className="mt-2 mb-2 p-1"
              withHandle
            />
            <ResizablePanel
              order={2}
              defaultSize={40}
            >
              <DataPanel/>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle
          className="ml-2 mr-2 w-2"
          withHandle
        />
        <ResizablePanel
          order={3}
          defaultSize={20}
        >
          <OptionsPanel/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default EditPanel