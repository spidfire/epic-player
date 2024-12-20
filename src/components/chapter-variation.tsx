import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface ChapterVariationProps {
  title: string
  thumbnailSrc: string
  author: string
  channelId: string
  date: string
  onSelect: () => void
  isActive: boolean
  isNew: boolean
}

export function ChapterVariation({ title, thumbnailSrc,channelId, author,date,isNew, onSelect, isActive }: ChapterVariationProps) {
  
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
            <span className="text-white text-xs font-medium truncate">{decodeHtmlEntities(title)}</span>
          </div>
          
          {isNew && <div className="absolute inset-0 bg-blue-500 bg-opacity-50" >Recent</div>}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm">Author: <a className='text-blue-700 underline' target='_blank' href={"https://www.youtube.com/channel/" +channelId}>{author}</a></p>
            <p className="text-sm">UploadDate: {date}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function decodeHtmlEntities(str: string): string {
  // Define a mapping for common named entities.
  const entities = {
      'quot': '"',
      'apos': "'",
      'amp': '&',
      'lt': '<',
      'gt': '>',
      'nbsp': ' ',
      // Add more named entities if needed
  };

  return str
      // Decode numeric entities: &#NNN;
      .replace(/&#(\d+);/g, (match, dec) => {
          return String.fromCharCode(dec);
      })
      // Decode hex entities: &#xHH;
      .replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
          return String.fromCharCode(parseInt(hex, 16));
      })
      // Decode named entities: &entityName;
      .replace(/&([a-zA-Z]+);/g, (match, entity) => {
          return entities[entity] || match;
      });
}
