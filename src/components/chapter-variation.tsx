import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface ChapterVariationProps {
  title: string
  thumbnailSrc: string
  author: string
  onSelect: () => void
  isActive: boolean
}

export function ChapterVariation({ title, thumbnailSrc, author, onSelect, isActive }: ChapterVariationProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          className={`relative m-1 flex-shrink-0 w-32 h-24 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform ${
            isActive ? 'ring-2 ring-blue-500' : 'hover:scale-105'
          }`}
          onClick={onSelect}
        >
          <img
            src={thumbnailSrc}
            alt={title}
            width={128}
            height={96}
            className="transition-opacity duration-200 ease-in-out group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
            <span className="text-white text-xs font-medium truncate">{title}</span>
          </div>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm">Author: {author}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

