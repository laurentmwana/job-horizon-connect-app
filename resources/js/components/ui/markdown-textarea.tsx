"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading,
  Quote,
  Eye,
  Edit3,
  Maximize2,
  Minimize2,
} from "lucide-react"

interface MarkdownTextareaProps {
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
  disabled?: boolean
  maxLength?: number
  contentType?: "markdown" | "html" | "text" // Nouvelle prop
}
const parseMarkdown = (text: string): string => {
  if (!text) return ""

  return (
    text
      // Échapper les caractères HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')

      // Bold et Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Code inline
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-muted p-3 rounded-md overflow-x-auto my-3"><code class="text-sm font-mono">$1</code></pre>',
      )

      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )

      // Images
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-md my-2" />')

      // Blockquotes
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-2">$1</blockquote>',
      )

      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')

      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-2">')
      .replace(/\n/g, "<br>")

      // Wrap in paragraphs
      .replace(/^(.+)/, '<p class="mb-2">$1')
      .replace(/(.+)$/, "$1</p>")
  )
}

// Fonction pour convertir HTML basique en Markdown
const convertHtmlToMarkdown = (html: string): string => {
  if (!html || typeof html !== "string") return ""

  return (
    html
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")

      // Bold et Italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")

      // Links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

      // Images
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")

      // Code
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, "```\n$1\n```")

      // Lists
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<ul[^>]*>(.*?)<\/ul>/gi, "$1\n")
      .replace(/<ol[^>]*>(.*?)<\/ol>/gi, "$1\n")

      // Blockquotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n")

      // Paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")

      // Line breaks
      .replace(/<br\s*\/?>/gi, "\n")

      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, "")

      // Clean up extra whitespace
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

export const MarkdownTextarea = ({
  id,
  name,
  placeholder = "Écrivez votre contenu...",
  defaultValue = "",
  className,
  onChange,
  disabled = false,
  maxLength,
  contentType = 'markdown'
}: MarkdownTextareaProps) => {

  const processInitialContent = (value: string, type: string) => {
    if (!value) return ""

    switch (type) {
      case "html":
        return convertHtmlToMarkdown(value)
      case "text":
        return value 
      case "markdown":
      default:
        return value 
    }
  }

  const [content, setContent] = useState(() => processInitialContent(defaultValue, contentType))
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length > maxLength) return
    setContent(newValue)
    onChange?.(newValue)
  }

  const insertText = useCallback(
    (before: string, after = "", placeholder = "") => {
      if (!textareaRef.current || disabled) return
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end) || placeholder
      const newText =
        content.substring(0, start) + before + selectedText + after + content.substring(end)

      if (maxLength && newText.length > maxLength) return

      setContent(newText)
      onChange?.(newText)

      setTimeout(() => {
        textarea.focus()
        const newStart = start + before.length
        const newEnd = newStart + selectedText.length
        textarea.setSelectionRange(newStart, newEnd)
      }, 0)
    },
    [content, onChange, disabled, maxLength],
  )

  const formatActions = [
    { icon: Bold, title: "Gras", action: () => insertText("**", "**", "gras"), shortcut: "⌘B" },
    { icon: Italic, title: "Italique", action: () => insertText("*", "*", "italique"), shortcut: "⌘I" },
    { icon: Heading, title: "Titre", action: () => insertText("## ", "", "Titre") },
    { icon: List, title: "Liste à puces", action: () => insertText("- ", "", "élément") },
    { icon: ListOrdered, title: "Liste numérotée", action: () => insertText("1. ", "", "élément") },
    { icon: Quote, title: "Citation", action: () => insertText("> ", "", "citation") },
  ]

  const containerClasses = cn(
    "bg-background border rounded-lg overflow-hidden transition-all duration-200",
    isFullscreen && "fixed inset-4 z-50 shadow-2xl",
    className,
  )

  const textareaHeight = isFullscreen ? "calc(100vh - 200px)" : "200px"

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="border-b bg-muted/30 flex items-center justify-between p-2 sm:p-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "write" | "preview")}
          className="flex-1"
        >
          <TabsList className="h-8 bg-transparent p-0 space-x-1">
            <TabsTrigger
              value="write"
              className="h-7 px-2 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              <Edit3 size={14} className="mr-1" /> Écrire
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="h-7 px-2 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              <Eye size={14} className="mr-1" /> Aperçu
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? "Quitter plein écran" : "Plein écran"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </Button>
      </div>

      {/* Toolbar */}
      {activeTab === "write" && (
        <div className="flex items-center gap-0.5 px-2 sm:px-3 pb-2 overflow-x-auto">
          {formatActions.map((action, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              title={action.title}
              onClick={action.action}
              disabled={disabled}
              className="h-7 w-7 p-0 flex-shrink-0 hover:bg-muted"
            >
              <action.icon size={14} />
              <span className="sr-only">{action.title}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Content */}
      <Tabs value={activeTab} className="w-full">
        <TabsContent value="write" className="m-0">
          <Textarea
            ref={textareaRef}
            id={id}
            name={name}
            placeholder={placeholder}
            value={content}
            onChange={handleChange}
            disabled={disabled}
            className="border-0 shadow-none focus-visible:ring-0 resize-none font-mono text-sm"
            style={{ height: textareaHeight }}
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="p-3 sm:p-4 overflow-auto" style={{ height: textareaHeight }}>
            {content ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            ) : (
              <p className="text-muted-foreground text-sm">Rien à prévisualiser</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-2 sm:px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Markdown</span>
        {maxLength && (
          <span className={content.length > maxLength * 0.9 ? "text-destructive" : ""}>
            {content.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
