import React from 'react'

interface VideoPlayerProps {
  src: string
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const isYouTubeUrl = src.includes('youtube.com') || src.includes('youtu.be')

  if (isYouTubeUrl) {
    const videoId = extractYouTubeId(src)
    return (
      <div className="w-full h-full bg-black">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-black text-white">
      <div className="w-full h-full flex items-center justify-center" >
        <div className='inline'>
          <h1 className='text-xl mb-4'>Welcome to the EPIC: The Musical video player</h1>
          <p className='text-lg mb-4'>Select a video on the right -&gt;&gt;</p>
          <p>
            Songs by <a className='underline' href="https://www.epicthemusical.com/">Jorge Rivera-Herrans</a><br/>
            With videos from the community<br/>
            <a className='underline' target='_blank' href='https://github.com/spidfire/epic-player'>Github code</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

