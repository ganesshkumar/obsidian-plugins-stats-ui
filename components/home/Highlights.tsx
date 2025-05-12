import { Card, Carousel } from 'flowbite-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Highlight } from '../../lib/abstractions';
import { useRouter } from 'next/router';
import { useAnalytics } from '../../lib/analytics/analytics';

const withCarousel = (children: ReactNode) => {
  return (
    <Carousel
      pauseOnHover
      slideInterval={10000}
      slide={false}
      data-testid="carousel"
    >
      {children}
    </Carousel>
  );
};

interface IHightlightsProps {
  highlights: Highlight[];
}

export const Highlights = ({ highlights }: IHightlightsProps) => {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleHighlightClick = (link: string) => {
    trackEvent('Highlight Click');
    router.push(link);
  };

  const cards = highlights.map((item, index) => (
    <Card key={index} className={`px-8 ${item.bgClasses}`}>
      <div className="text-center text-4xl font-bold mb-4">{item.title}</div>
      <div className="grid md:grid-cols-6 gap-4">
        {item.image && (
          <div className="md:col-span-1 justify-center hidden md:flex relative">
            <Image
              src={item.image}
              alt={
                item.image
                  .split('/')
                  [item.image.split('/').length - 1].split('.')[0]
              }
              fill={true}
              style={{
                objectFit: 'contain',
                maxHeight: '100%',
                borderRadius: '10px',
              }}
            />
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
      <div className="flex justify-center">
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
    </Card>
  ));

  return (
    <div className="bg-transparent mt-8">
      <div className="max-w-6xl mx-auto h-[600px] md:h-[350px] lg:h-[300px]">
        {cards.length === 1 ? cards[0] : withCarousel(cards)}
      </div>
    </div>
  );
};
