'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useState } from 'react'

export function PickerExample() {
  const [background, setBackground] = useState('#B4D455')

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <ColorPicker background={background} setBackground={setBackground} />
    </div>
  )
}

export function ColorPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#000000',
    '#09203f',
    '#434343',
    '#ffffff',
    '#e2e2e2',
    '#e7f0fd',
    '#d5d4d0',
    '#eeeeec',
    '#accbee',
    '#020f75',
    '#537895',
    '#0072ff',
    '#0000cd',
    '#4801FF',
    '#0c1db8',
    '#0000f0',
    '#00c6ff',
    '#4facfe',
    '#00f2fe',
    '#70e2ff',
    '#AC32E4',
    '#7918F2',
    '#8a2be2',
    '#7046aa',
    '#ff75c3',
    '#f953c6',
    '#b91d73',
    '#ee0979',
    '#FF0080',
    '#F00000',
    '#DC281E',
    '#ff6a00',
    '#0ba360',
    '#228b22',
    '#3cba92',
    '#24FE41',
    '#FDFC47',
    '#ccff00',
    '#ffe83f',
    '#9fff5b',
    '#40E0D0',
    '#FF8C00',
    '#fda34b',
    '#ff7882',
    '#fcc5e4',
    '#c8699e',
    '#ffa647',
    '#cd93ff',
  ]


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-wrap gap-1 mt-0">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => setBackground(s)}
            />
          ))}
        </div>
        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
