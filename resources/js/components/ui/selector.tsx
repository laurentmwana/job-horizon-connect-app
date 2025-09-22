"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Search, X } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

// Types
export interface SelectorItem {
  id: string
  label: string
  value: string
  disabled?: boolean
  color?: string
}

export interface SelectorProps {
  items: SelectorItem[]
  mode: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  isPending?: boolean
  disabled?: boolean
  maxSelection?: number
  size?: "sm" | "md" | "lg"
  showSearch?: boolean
  showClearAll?: boolean
  className?: string
  name?: string
  label?: string
}

export function Selector({
  items,
  mode,
  value,
  defaultValue,
  onChange,
  placeholder = "Sélectionner des options...",
  searchPlaceholder = "Rechercher...",
  isPending = false,
  disabled = false,
  maxSelection,
  size = "md",
  showSearch = true,
  showClearAll = true,
  className,
  name,
  label,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return mode === "single" ? "" : []
  })

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const selectedArray = Array.isArray(currentValue) ? currentValue : [currentValue].filter(Boolean)

  const filteredItems = searchTerm
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : items

  const selectedItems = items.filter((item) => selectedArray.includes(item.value))

  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isOpen, showSearch])

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange],
  )

  const handleItemSelect = useCallback(
    (item: SelectorItem) => {
      if (disabled || item.disabled || isPending) return

      const isSelected = selectedArray.includes(item.value)

      if (mode === "single") {
        const newValue = isSelected ? "" : item.value
        handleValueChange(newValue)
        setIsOpen(false)
        setSearchTerm("")
      } else {
        const newSelection = isSelected ? selectedArray.filter((v) => v !== item.value) : [...selectedArray, item.value]

        if (maxSelection && newSelection.length > maxSelection && !isSelected) {
          return
        }

        handleValueChange(newSelection)
      }
    },
    [disabled, isPending, mode, selectedArray, handleValueChange, maxSelection],
  )

  const handleRemoveChip = useCallback(
    (itemValue: string, event: React.MouseEvent) => {
      event.stopPropagation()
      if (disabled || isPending) return

      if (mode === "single") {
        handleValueChange("")
      } else {
        handleValueChange(selectedArray.filter((v) => v !== itemValue))
      }
    },
    [disabled, isPending, mode, selectedArray, handleValueChange],
  )

  const handleClearAll = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      if (disabled || isPending) return
      handleValueChange(mode === "single" ? "" : [])
    },
    [disabled, isPending, mode, handleValueChange],
  )

  const sizeClasses = {
    sm: { trigger: "min-h-9 text-sm px-3 py-2", chip: "text-xs px-2.5 py-1 h-6" },
    md: { trigger: "min-h-11 text-sm px-4 py-2.5", chip: "text-xs px-3 py-1.5 h-7" },
    lg: { trigger: "min-h-12 text-base px-5 py-3", chip: "text-sm px-4 py-2 h-8" },
  }

  const classes = sizeClasses[size]
  const hasSelection = selectedArray.length > 0
  const isMaxReached = maxSelection && selectedArray.length >= maxSelection

  if (isPending) {
    return <Skeleton className={cn("w-full rounded-lg", classes.trigger, className)} />
  }

  return (
    <div className={cn("relative w-full", className)}>
      <select
        name={name}
        value={mode === "multiple" ? selectedArray : selectedArray[0] || ""}
        onChange={() => {}}
        multiple={mode === "multiple"}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        {mode === "single" ? (
          <option value={selectedArray[0] || ""}>{selectedArray[0] || ""}</option>
        ) : (
          selectedArray.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))
        )}
      </select>

      {label && (
        <label className="block text-sm font-semibold text-foreground mb-3">
          {label}
          {maxSelection && mode === "multiple" && (
            <span className="text-muted-foreground ml-2 font-normal">(max {maxSelection})</span>
          )}
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "w-full justify-between font-normal hover:bg-accent/50 transition-all duration-200",
              classes.trigger,
              {
                "opacity-50 cursor-not-allowed": disabled,
                "border": isOpen,
                "bg-accent/5": hasSelection,
              },
            )}
            disabled={disabled}
          >
            <div className="flex-1 flex items-center gap-2 flex-wrap min-w-0">
              {hasSelection ? (
                <div className="flex flex-wrap gap-1.5 w-full">
                  {selectedItems.map((item) => (
                    <div
                    onClick={(e) => handleRemoveChip(item.value, e)}
                      key={item.id}
                      className={cn("flex items-center gap-1.5 font-medium p-1 border rounded-md bg-accent", classes.chip)}
                    >
                      <span className="truncate max-w-[120px] sm:max-w-[200px]">{item.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground truncate">{placeholder}</span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {showClearAll && hasSelection && (
                <X
                  className="h-4 w-4 hover:bg-destructive/10 hover:text-destructive rounded cursor-pointer"
                  onClick={handleClearAll}
                />
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          {showSearch && (
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  ref={searchInputRef}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            </div>
          )}

          {mode === "multiple" && (
            <div className="px-4 py-2 text-sm text-muted-foreground border-b bg-muted/30 flex justify-between">
              <span>
                {selectedArray.length} sélectionné{selectedArray.length > 1 ? "s" : ""}
              </span>
              {isMaxReached && (
                <Badge variant="outline" className="text-xs">
                  Limite atteinte
                </Badge>
              )}
            </div>
          )}

          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-sm">Aucun résultat trouvé</div>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const isSelected = selectedArray.includes(item.value)
                  const itemDisabled = disabled || item.disabled || (Boolean(isMaxReached) && !isSelected)

                  return (
                    <div
                      key={item.id}
                      onClick={() => !itemDisabled && handleItemSelect(item)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150",
                        {
                          "hover:bg-accent/50": !itemDisabled && !isSelected,
                          "bg-primary/10 text-primary border border-primary/20": isSelected,
                          "opacity-50 cursor-not-allowed": itemDisabled,
                        },
                      )}
                      style={
                        isSelected && item.color
                          ? {
                              backgroundColor: item.color + "15",
                              borderColor: item.color + "40",
                              color: item.color,
                            }
                          : undefined
                      }
                    >
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-4 h-4 rounded bg-current flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 border-2 border-muted-foreground/40 rounded" />
                        )}
                      </div>
                      <span className="flex-1 font-medium">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
