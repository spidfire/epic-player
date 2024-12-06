import React from 'react'
import { ChapterVariation } from './chapter-variation'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Variation {
  id: string
  title: string
  thumbnailSrc: string
  author: string
  startTime: string
  endTime: string
  sort: number
}

interface ChapterProps {
  title: string
  isHighlighted: boolean
  variations: Variation[]
  activeVariation: string
  onSelectVariation: (variationId: string) => void
}

export function Chapter({ title, variations, activeVariation,isHighlighted, onSelectVariation }: ChapterProps) {
  return (
    <div className={`${isHighlighted && 'bg-slate-800'}`}>
      {isHighlighted ? 
    
      <h3 className="text-lg w-96 font-semibold mt-2 text-blue-500">{title}</h3>
      : 
      <h3 className="text-lg w-96 font-semibold mt-2">{title}</h3>
    
    }
      <ScrollArea className="w-96 ">
        <div className="flex space-x-4 pb-1">
          {variations
            .sort((a, b) => a.sort - b.sort)
            .map((variation) => (
            <ChapterVariation
              key={variation.id}
              title={variation.title}
              thumbnailSrc={variation.thumbnailSrc}
              author={variation.author}
              isActive={variation.id === activeVariation}
              onSelect={() => onSelectVariation(variation.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

