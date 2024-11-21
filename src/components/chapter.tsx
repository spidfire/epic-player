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
  variations: Variation[]
  activeVariation: string
  onSelectVariation: (variationId: string) => void
}

export function Chapter({ title, variations, activeVariation, onSelectVariation }: ChapterProps) {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
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
              startTime={variation.startTime}
              endTime={variation.endTime}
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

