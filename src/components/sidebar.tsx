import React, { useEffect, useState } from 'react'
import { Chapter } from './chapter'
import { ScrollArea } from "@/components/ui/scroll-area"

export interface ChapterData {
  id: string
  title: string
  saga: string
  variations: {
    id: string
    title: string
    thumbnailSrc: string
    author: string
    channelId: string
    publishTime: string
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
  let saga = "";

  const [sortVariations, setSortVariations] = useState("");
  const [search, setSearch] = useState("");
  const [chapterData, setChapterData] = useState<ChapterData[]>([]);
  
  useEffect(() => {
      
    setChapterData(chapters.map((chapter) => {
      let variations = !search ? chapter.variations :  chapter.variations.filter((variation) => (`${variation.title} ${variation.author} ${variation.description}`).toLowerCase().includes(search.toLowerCase()))

      if(sortVariations === 'new'){
        variations = variations.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
      } else  if(sortVariations === 'old'){
        variations = variations.sort((a, b) => new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime());
      } else {
        variations = chapter.variations.sort((a,b) => a.sort - b.sort);
      }

      return {
        ...chapter,
        variations: variations
      }
    }));
  }, [search, chapters, sortVariations]);

  const items =  [];
  for(const chapter of chapterData){  
    const chapterid = chapter.id;
    if(chapter.saga !== saga){
      items.push(<h2 key={chapter.saga} className="text-2xl font-bold w-96 mb-0 mt-6">{chapter.saga}</h2>)
      saga = chapter.saga;
    }

  

   
    items.push(<Chapter
      key={chapter.id}
      title={chapter.title}
      variations={chapter.variations}
      isHighlighted={activeChapter === chapter.id}
      activeVariation={chapter.id === activeChapter ? activeVariation : ''}
      onSelectVariation={(variationId) => onSelectVariation(chapterid, variationId)}
    />)
  }

  return (
    <ScrollArea className="h-full">
      <input type="text" className="w-full text-black p-2 mb-1" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      
      <label className="text-white">Sort variations:
        <select className="text-black p-2 mb-1" onChange={(e) => setSortVariations(e.target.value)} value={sortVariations}>
          <option value="">Random</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
          <option value="az">A-Z</option>
        </select>

      </label>
      <div className="w-96 "> {/* Added right padding to accommodate scrollbar */}
        <h2 className="text-2xl font-bold ">Epic: the Musical</h2>
        <a className='underline mb-6' target='_blank'  href='https://github.com/spidfire/epic-player'>Github & submit songs</a>
        {items}
      </div>
    </ScrollArea>
  )
}

