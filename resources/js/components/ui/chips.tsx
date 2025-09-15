"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo, useCallback } from "react"
import { Search, X, AlertCircle, Check, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface ChipItem {
  id: string
  label: string
  value: string
  disabled?: boolean
}

export interface ChipsSelectorProps {
  items: ChipItem[]
  mode: "single" | "multiple"
  selectedValues?: string | string[]
  onSelectionChange: (values: string | string[]) => void
  placeholder?: string
  isPending?: boolean
  disabled?: boolean
  maxSelection?: number
  size?: "sm" | "md" | "lg"
  searchable?: boolean
  clearable?: boolean
  error?: string
  className?: string
}

export interface ChipProps {
  item: ChipItem
  isSelected: boolean
  onToggle: () => void
  size: "sm" | "md" | "lg"
  disabled?: boolean
  mode: "single" | "multiple"
}

export function Chip({ item, isSelected, onToggle, size, disabled, mode }: ChipProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs min-h-[24px]",
    md: "px-3 py-1.5 text-sm min-h-[32px]",
    lg: "px-4 py-2 text-base min-h-[40px]",
  }

  const iconSizes = {
    sm: "h-3 w-3 flex-shrink-0",
    md: "h-4 w-4 flex-shrink-0",
    lg: "h-5 w-5 flex-shrink-0",
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled || item.disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "w-full justify-start text-left",
        sizeClasses[size],
        isSelected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground/50",
        (disabled || item.disabled) && "opacity-50 cursor-not-allowed",
        "select-none",
      )}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? "Désélectionner" : "Sélectionner"} ${item.label}`}
      title={item.label} // Tooltip pour les textes longs
    >
      {mode === "multiple" && (
        <div
          className={cn(
            "rounded-sm border flex items-center justify-center",
            iconSizes[size],
            isSelected ? "bg-primary-foreground text-primary border-primary-foreground" : "border-current",
          )}
        >
          {isSelected && <Check className="h-2.5 w-2.5" />}
        </div>
      )}
      {mode === "single" && <Circle className={cn(iconSizes[size], isSelected ? "fill-current" : "")} />}
      <span className="font-medium truncate flex-1 min-w-0">{item.label}</span>
    </button>
  )
}

export function ChipsSelector({
  items,
  mode,
  selectedValues = mode === "multiple" ? [] : "",
  onSelectionChange,
  placeholder = "Sélectionner des options...",
  isPending = false,
  disabled = false,
  maxSelection,
  size = "md",
  searchable = false,
  clearable = true,
  error,
  className,
}: ChipsSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Normaliser les valeurs sélectionnées
  const normalizedSelected = useMemo(() => {
    if (mode === "single") {
      return typeof selectedValues === "string" ? [selectedValues].filter(Boolean) : []
    }
    return Array.isArray(selectedValues) ? selectedValues : []
  }, [selectedValues, mode])

  // Filtrer les éléments selon la recherche
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.value.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [items, searchQuery])

  // Gérer la sélection
  const handleToggle = useCallback(
    (item: ChipItem) => {
      if (disabled || item.disabled) return

      if (mode === "single") {
        const newValue = normalizedSelected.includes(item.value) ? "" : item.value
        onSelectionChange(newValue)
      } else {
        const currentSelection = normalizedSelected
        const isSelected = currentSelection.includes(item.value)
        let newSelection: string[]

        if (isSelected) {
          newSelection = currentSelection.filter((val) => val !== item.value)
        } else {
          if (maxSelection && currentSelection.length >= maxSelection) {
            return // Ne pas ajouter si la limite est atteinte
          }
          newSelection = [...currentSelection, item.value]
        }

        onSelectionChange(newSelection)
      }
    },
    [mode, normalizedSelected, onSelectionChange, disabled, maxSelection],
  )

  // Effacer toutes les sélections
  const handleClearAll = useCallback(() => {
    onSelectionChange(mode === "single" ? "" : [])
  }, [mode, onSelectionChange])

  // Vérifier si la limite est atteinte
  const isMaxReached = maxSelection && normalizedSelected.length >= maxSelection

  if (isPending) {
    return (
      <div className={cn("space-y-4", className)}>
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." disabled className="pl-10" />
          </div>
        )}
        <ChipsSkeleton size={size} />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Barre de recherche */}
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            disabled={disabled}
          />
        </div>
      )}

      {/* Informations et actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {mode === "multiple" && (
            <>
              <span>
                {normalizedSelected.length} sélectionné{normalizedSelected.length > 1 ? "s" : ""}
                {maxSelection && ` sur ${maxSelection}`}
              </span>
              {isMaxReached && (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Limite atteinte
                </span>
              )}
            </>
          )}
        </div>

        {clearable && normalizedSelected.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={disabled}
            className="h-auto p-1 text-muted-foreground hover:text-foreground text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Tout effacer
          </Button>
        )}
      </div>

      {/* Grille des chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? "Aucun résultat trouvé" : placeholder}
          </div>
        ) : (
          filteredItems.map((item, k) => (
            <Chip
              key={item.id || k}
              item={item}
              isSelected={normalizedSelected.includes(item.value)}
              onToggle={() => handleToggle(item)}
              size={size}
              mode={mode}
              disabled={
                disabled ||
                (mode === "multiple" &&
                  !normalizedSelected.includes(item.value) &&
                  typeof isMaxReached === "boolean" &&
                  isMaxReached)
              }
            />
          ))
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}

interface ChipsSkeletonProps {
  count?: number
  size?: "sm" | "md" | "lg"
}

function ChipsSkeleton({ count = 6, size = "md" }: ChipsSkeletonProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn("bg-muted rounded-full", sizeClasses[size])}
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  )
}
