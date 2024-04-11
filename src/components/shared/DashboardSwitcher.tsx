import { useState, ComponentPropsWithoutRef } from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const dashboardGroups = [
  {
    label: '기본그룹',
    panels: [
      {
        label: '대시보드 1', // '경제지표와 주가 평가',
        value: 'economic_stock_evaluation'
      },
      {
        label: '대시보드 2', //'경제지표와 주가 상관관계',
        value: 'economic_stock_association'
      },
      {
        label: '대시보드 3', // '경제지표 분석',
        value: 'economic_indicators_analysis'
      }
    ]
  }
]

type Dashboard = (typeof dashboardGroups)[number]["panels"][number]

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface DashboardSwitcherProps extends PopoverTriggerProps {}

const DashboardSwitcher = ({ className }: DashboardSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const [showNewDashboardDialog, setShowNewDashboardDialog] = useState(false)
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard>(dashboardGroups[0].panels[0])

  return (
    <Dialog open={showNewDashboardDialog} onOpenChange={setShowNewDashboardDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a dashboard"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedDashboard.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search dashboard..." />
              <CommandEmpty>No dashboard found.</CommandEmpty>
              {dashboardGroups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.panels.map((dashboard) => (
                    <CommandItem
                      key={dashboard.value}
                      onSelect={() => {
                        setSelectedDashboard(dashboard)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      {dashboard.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedDashboard.value === dashboard.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewDashboardDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create dashboard
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create dashboard</DialogTitle>
          <DialogDescription>
            Add a new dashboard to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Dashboard name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewDashboardDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DashboardSwitcher
