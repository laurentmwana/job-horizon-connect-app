"use client"

import type React from "react"

import { useState, useEffect, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, EyeOff, Check, X, Info } from "lucide-react"

interface ValidationRule {
  label: string
  validator: (value: string) => boolean
}

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
  rules?: ValidationRule[]
  label?: string
  onChange?: (value: string) => void
  onValid?: (isValid: boolean) => void
  showToggle?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ rules = [], label, onChange, onValid, showToggle = true, value: controlledValue, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const validationResults = rules.map((rule) => rule.validator(String(value)))
    const allValid = rules.length > 0 ? validationResults.every(Boolean) : true

    useEffect(() => {
      if (onValid) {
        onValid(allValid)
      }
    }, [allValid, onValid])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (onChange) {
        onChange(newValue)
      } else {
        setInternalValue(newValue)
      }
    }

    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-foreground">{label} *</label>}

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              ref={ref}
              type={showToggle ? (showPassword ? "text" : "password") : "text"}
              value={value}
              onChange={handleChange}
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              {...props}
            />

            {showToggle && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  <EyeOff size={14} className="text-muted-foreground" />
                ) : (
                  <Eye size={14} className="text-muted-foreground" />
                )}
              </Button>
            )}
          </div>

          {rules.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  aria-label="Afficher les règles de validation"
                >
                  <Info size={14} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Exigences de validation</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 pt-4">
                  {rules.map((rule, index) => {
                    const isValid = rule.validator(String(value))
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 text-sm transition-colors ${
                          isValid ? "text-green-700" : "text-muted-foreground"
                        }`}
                      >
                        {isValid ? (
                          <Check className="h-4 w-4 text-green-600 bg-green-100 rounded-full p-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span>{rule.label}</span>
                      </div>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
