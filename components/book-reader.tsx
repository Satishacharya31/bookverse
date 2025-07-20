'use client';

import React, { useState, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

interface BookReaderProps {
  title: string;
  progress: number;
}

const Page = forwardRef<HTMLDivElement, { pageNumber: number; children: React.ReactNode }>(({ pageNumber, children }, ref) => {
  return (
    <div className="bg-white p-8 flex flex-col" ref={ref}>
      <div className="flex-1">{children}</div>
      <div className="text-sm text-gray-500 text-center pt-4">{pageNumber}</div>
    </div>
  );
});
Page.displayName = 'Page';

export function BookReader({ title, progress }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoRead, setIsAutoRead] = useState(false);
  const [readingProgress, setReadingProgress] = useState(progress);
  const [showControls, setShowControls] = useState(false);

  const book = useRef<any>();
  const totalPages = 247;

  const handlePrevPage = () => {
    if (book.current) {
      book.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (book.current) {
      book.current.pageFlip().flipNext();
    }
  };

  const onPage = (e: { data: number }) => {
    setCurrentPage(e.data);
    setReadingProgress((e.data / totalPages) * 100);
  };

  return (
    <div 
      className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-2xl relative"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Book Display Area */}
      <div className="relative p-0 flex items-center justify-center mx-auto">
        <HTMLFlipBook
          width={500}
          height={500}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          ref={book}
          className="h-full w-full"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize={true} 
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {[...Array(totalPages)].map((_, i) => (
            <Page key={i} pageNumber={i + 1}>
              <h3 className="font-bold text-lg mb-4">Chapter {Math.floor(i / 10) + 1}</h3>
              <div className="space-y-3 text-sm">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
          <p>Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
          <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.</p>
              </div>
            </Page>
          ))}
        </HTMLFlipBook>

        {/* Navigation Buttons */}
        <div className={`absolute w-full inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevPage}
            className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPage}
            className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Reading Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white">
            <span>Reading Progress</span>
            <span>{Math.round(readingProgress)}%</span>
          </div>
          <Progress value={readingProgress} className="h-2" />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoRead(!isAutoRead)}
              className="mx-2"
            >
              {isAutoRead ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
