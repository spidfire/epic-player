import React from 'react'
import { ChapterVariation } from './chapter-variation'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Variation {
  id: string
  title: string
  thumbnailSrc: string
  author: string
  channelId: string
  publishTime: string
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
            .map((variation) => (
            <ChapterVariation
              key={variation.id}
              title={variation.title}
              date={formatDate(variation.publishTime)}
              isNew={isNew(variation.publishTime)}
              thumbnailSrc={variation.thumbnailSrc}
              author={variation.author}
              channelId={variation.channelId}
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

function isNew(date: string): boolean{
  const d = new Date(date);
  const now = new Date();
  return now.getTime() - d.getTime() < (30* 24 * 60 * 60 * 1000);
}

function formatDate(date: string): string{
  const d = new Date(date);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();

}

