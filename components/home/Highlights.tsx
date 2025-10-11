import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { Highlight } from '../../lib/abstractions';
import { useAnalytics } from '../../lib/analytics/analytics';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IHightlightsProps {
  highlights: Highlight[];
}

const SLIDE_INTERVAL = 10000;

export const Highlights = ({ highlights }: IHightlightsProps) => {
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  const handleHighlightClick = (link: string) => {
    trackEvent('Highlight Click');
    router.push(link);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (paused || !api) return;
    timerRef.current = setTimeout(() => {
      api?.scrollNext();
    }, SLIDE_INTERVAL);
  }, [api, paused]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => scheduleNext();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    scheduleNext();
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
      clearTimer();
    };
  }, [api, scheduleNext]);

  const onMouseEnter = () => {
    setPaused(true);
    clearTimer();
  };
  const onMouseLeave = () => {
    setPaused(false);
    scheduleNext();
  };

  const renderCard = (item: Highlight, index?: number) => (
    <Card key={index} className={`px-8 ${item.bgClasses ?? ''}`}>
      <CardContent className="p-0 py-6">
        <div className="text-center text-4xl font-bold mb-4">{item.title}</div>
        <div className="grid md:grid-cols-6 gap-4">
          {item.image && (
            <div className="md:col-span-1 justify-center hidden md:flex relative">
              {item.image.startsWith('https') ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain max-h-full rounded-lg"
                />
              ) : (
                <Image
                  src={item.image}
                  alt={
                    item.image
                      .split('/')
                      [item.image.split('/').length - 1].split('.')[0]
                  }
                  fill
                  style={{
                    objectFit: 'contain',
                    maxHeight: '100%',
                    borderRadius: '10px',
                  }}
                />
              )}
            </div>
          )}
          <div
            className={`${item.image ? 'md:col-span-5' : 'md:col-span-6'} flex justify-center`}
          >
            <div className={`${item.image ? '' : 'max-w-3xl text-center'}`}>
              {item.description}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="grid content-center"
          >
            <button
              className="text-center bg-gray-800 rounded text-white px-4 py-2"
              onClick={() => handleHighlightClick(item.link)}
            >
              {item.ctaText}
            </button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );

  // If only one highlight, keep simple layout (no carousel wrapper)
  if (highlights.length === 1) {
    return (
      <div className="bg-transparent mt-8">
        <div className="max-w-6xl mx-auto h-[600px] md:h-[350px] lg:h-[300px]">
          {renderCard(highlights[0])}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent mt-8">
      <div
        className="relative max-w-6xl mx-auto h-[600px] md:h-[350px] lg:h-[300px]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Carousel
          setApi={setApi}
          className="h-full"
          data-testid="carousel"
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full">
            {highlights.map((item, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="h-full flex items-stretch">
                  {renderCard(item, index)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Mobile (sm & below) styled overlay controls */}
          <CarouselPrevious className="inline-flex lg:hidden items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur border shadow hover:bg-background w-9 h-9" />
          <CarouselNext className="inline-flex lg:hidden items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur border shadow hover:bg-background w-9 h-9" />
          {/* Desktop / Tablet: original simple buttons (only show > md) */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};
