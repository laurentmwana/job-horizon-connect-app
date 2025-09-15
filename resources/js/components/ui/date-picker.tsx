"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/date-time"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function isValidDate(date: Date | undefined) {
  if (!date) return false
  return !isNaN(date.getTime())
}

// formateur en Y-m-d
function formatYMD(date: Date | undefined): string {
  if (!date) return ""
  return date.toISOString().split("T")[0] // ✅ Y-m-d
}

type DatePickerProps = {
  title: string
  value?: string
  onChange?: (ymd: string, formatted: string) => void,
  disabled?: boolean
}

export function DatePicker({ title, value: initialValue, onChange, disabled = false }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    initialValue ? new Date(initialValue) : new Date()
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  const handleChange = (newDate: Date | undefined) => {
    if (!newDate) return
    setDate(newDate)

    const ymd = formatYMD(newDate)          // 🔥 format Y-m-d
    const formatted = formatDate(newDate)  // 🔥 format lisible
    setValue(formatted)

    onChange?.(ymd, formatted)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {title}
      </Label>

      <div className="relative flex gap-2">
        <Input
        disabled={disabled}
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputDate = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(inputDate)) {
              handleChange(inputDate)
              setMonth(inputDate)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
        disabled={disabled}
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                handleChange(newDate)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
