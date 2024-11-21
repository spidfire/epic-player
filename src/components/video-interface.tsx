"use client"

import React, { useState, useEffect } from 'react'
import { VideoPlayer } from './video-player'
import { ChapterData, Sidebar } from './sidebar'
import chaptersData from './chaptersData.json'

// Sample data structure with thumbnail sources, author, and time information


export function VideoInterface() {
  const [activeChapter, setActiveChapter] = useState(chaptersData[0].id)
  const [activeVariation, setActiveVariation] = useState(chaptersData[0].variations[0].id)
  const [videoSrc, setVideoSrc] = useState(`/placeholder.svg?height=720&width=1280`)

  const handleSelectVariation = (chapterId: string, variationId: string) => {
    setActiveChapter(chapterId)
    setActiveVariation(variationId)
    const chapter = chaptersData.find((a) => a.id === chapterId)
    const variant = chapter?.variations.find((a) => a.id === variationId)
    if (variant && variant.youtube) {
      setVideoSrc(variant.youtube)
    }
  }

  
  const [sortedChapters, updateChapters] = useState<ChapterData[]>([]);
  useEffect(() => {
    if (window) { 
      const sessionStorage = window.sessionStorage
      let seedData = sessionStorage.getItem("seed");
      if(!seedData){
        const seedgen = () => (Math.random()*2**32)>>>0;
        seedData =  JSON.stringify([
          seedgen(),
          seedgen(),
          seedgen(),
          seedgen()
        ])
        sessionStorage.setItem("seed", seedData)
      }
      const seed = JSON.parse(seedData)
      const getRand = sfc32(seed[0], seed[1], seed[2], seed[3]);
      
      const sortOnId = (a: {id: string}, b: {id: string}) => {
        if(a.id < b.id){
          return -1;
        }else if(a.id > b.id){
          return 1;
        }else{
          return 0;
        }
      }
      for (let i = 0; i < chaptersData.length; i++) {
        chaptersData[i].variations = chaptersData[i].variations.sort(sortOnId).map(value => ({ ...value, sort: getRand() }))
      }
      const sorted = chaptersData as unknown as ChapterData[];
      updateChapters(sorted)
    }
}, []);
  

  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <VideoPlayer src={videoSrc} />
      </div>
      <div className="w-96 border-l bg-black text-white">
        <Sidebar
          chapters={sortedChapters}
          activeChapter={activeChapter}
          activeVariation={activeVariation}
          onSelectVariation={handleSelectVariation}
        />
      </div>
    </div>
  )
}


function sfc32(a: number, b: number, c: number, d: number) {
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;
    const t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}



