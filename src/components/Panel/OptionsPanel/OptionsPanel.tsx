import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import VisualizationsComboBox from "./VisualizationsComboBox";
import VisualizationsSelect from "./VisualizationsSelect";
import SelectionPanelOption from "@/components/Selection/SelectionPanelOption";
import SelectionTooltipOption from "@/components/Selection/SelectionTooltipOption";
import SelectionGraphStyle from '@/components/Selection/SelectionGraphStyle';
import SelectionLegendOption from "@/components/Selection/SelectionLegendOption";
import SelectionXAxisOption from "@/components/Selection/SelectionXAxisOption";
function OptionsPanel () {
  return (
    <div className="h-full">
      <div className="p-1">
        {/* <VisualizationsComboBox/> */}
        <VisualizationsSelect/>
      </div>
      <div className="h-[calc(100%-60px)]">
        <div className="flex p-2">

          <Accordion className="w-full" type="single" collapsible>

            <AccordionItem value="panel-options">
              <AccordionTrigger>
                <span>Panel options</span>
              </AccordionTrigger>
              <AccordionContent>
                <SelectionPanelOption/>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tooltip">
              <AccordionTrigger>Tooltip</AccordionTrigger>
              <AccordionContent>
                <SelectionTooltipOption/>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legend">
              <AccordionTrigger>Legend</AccordionTrigger>
              <AccordionContent>
                <SelectionLegendOption/>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="axis">
              <AccordionTrigger>X-Axis</AccordionTrigger>
              <AccordionContent>
                <SelectionXAxisOption />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="graph-styles">
              <AccordionTrigger>Graph styles</AccordionTrigger>
              <AccordionContent>
                <SelectionGraphStyle/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default OptionsPanel