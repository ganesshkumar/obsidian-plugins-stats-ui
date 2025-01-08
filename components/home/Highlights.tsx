import { Card, Carousel } from 'flowbite-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Highlight } from '../../lib/abstractions';
import { Home } from 'react-feather';

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
  const cards = highlights.map((item, index) => (
    <Card key={index} className={`px-8 ${item.bgClasses}`}>
      <div className="text-center text-4xl font-bold mb-4">{item.title}</div>
      <div className="grid md:grid-cols-6 gap-4">
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
        <div className="md:col-span-5 grid content-center">
          {item.description}
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="grid content-center"
        >
          <Link
            className="text-center bg-gray-800 rounded text-white px-4 py-2"
            href={item.link}
          >
            {item.ctaText}
          </Link>
        </motion.div>
      </div>
    </Card>
  ));

  return (
    <div className="bg-transparent mt-16">
      <div className="max-w-6xl mx-auto h-[600px] md:h-[350px] lg:h-[300px]">
        <div key="main-highlight" className='text-center text-gray-700 justify-center items-baseline animate-bounce'>
          <div className="border border-yellow-500 px-2 rounded-3xl bg-yellow-100 inline-flex gap-x-1 ring-offset-2 ring-1 ring-yellow-200">
            <span>New Home:</span>
            {/* <span className='flex items-baseline'><Home size={14} className='text-gray-900'/>:</span> */}
            <span className='text-violet-700'>
              <a href="https://www.obsidianstats.com">www.obsidianstats.com</a>
            </span>
          </div>
        </div>
        {cards.length === 1 ? cards[0] : withCarousel(cards)}
      </div>
    </div>
  );
};
