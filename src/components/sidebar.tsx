import React, { useEffect, useState } from 'react'
import { Chapter } from './chapter'
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChapterData {
  id: string
  title: string
  saga: string
  variations: {
    id: string
    title: string
    thumbnailSrc: string
    author: string
    startTime: string
    description: string
    endTime: string
    sort: number
  }[]
}

interface SidebarProps {
  chapters: ChapterData[]
  activeChapter: string
  activeVariation: string
  onSelectVariation: (chapterId: string, variationId: string) => void
}

export function Sidebar({ chapters, activeChapter, activeVariation, onSelectVariation }: SidebarProps) {
  var saga = "";

  let [search, setSearch] = useState("");
  let [chapterData, setChapterData] = useState<ChapterData[]>([]);
  
  useEffect(() => {
      
    if(!search){

      setChapterData(chapters);
      return;
    }

    setChapterData(chapters.map((chapter) => {

      return {
        ...chapter,
        variations: chapter.variations.filter((variation) => (`${variation.title} ${variation.author} ${variation.description}`).toLowerCase().includes(search.toLowerCase()))
      }
    }));
  }, [search, chapters]);

  var items =  [];
  for(var chapter of chapterData){  
    let chapterid = chapter.id;
    if(chapter.saga !== saga){
      items.push(<h2 key={chapter.saga} className="text-2xl font-bold  mb-0 mt-6">{chapter.saga}</h2>)
      saga = chapter.saga;
    }

  

   
    items.push(<Chapter
      key={chapter.id}
      title={chapter.title}
      variations={chapter.variations}
      activeVariation={chapter.id === activeChapter ? activeVariation : ''}
      onSelectVariation={(variationId) => onSelectVariation(chapterid, variationId)}
    />)
  }

  return (
    <ScrollArea className="h-full">
      <input type="text" className="w-full p-2 mb-4" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="p-4 pr-8"> {/* Added right padding to accommodate scrollbar */}
        <h2 className="text-2xl font-bold mb-6">Epic: the Musical</h2>
        {items}
      </div>
    </ScrollArea>
  )
}

