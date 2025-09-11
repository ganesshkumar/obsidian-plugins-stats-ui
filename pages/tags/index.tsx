import React, { useState } from 'react';
import Header, { IHeaderProps } from '../../components/Header';
import Navbar from '../../components/Navbar';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import { sanitizeTag, tagDenyList } from '../../utils/plugins';
import { PluginsCache } from '../../cache/plugins-cache';
import InfoBar from '../../components/InfoBar';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import EthicalAd from '../../components/EthicalAd';
import { Search } from 'lucide-react';
import { TextInput } from 'flowbite-react';

interface ITagsPageProps extends IHeaderProps {
  tags: string[];
  pluginCountByTags: Record<string, number>;
}

const Tags = (props: ITagsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTags = props.tags.filter((tag) => {
    const sanitizedSearchTerm = searchTerm.toLowerCase();
    const sanitizedTag = tag.toLowerCase();
    return (
      sanitizedTag.startsWith(sanitizedSearchTerm) ||
      sanitizedTag.includes(`-${sanitizedSearchTerm}`)
    );
  });

  const highlightMatch = (tag: string) => {
    const sanitizedSearchTerm = searchTerm.toLowerCase();
    const sanitizedTag = tag.toLowerCase();
    const startIndex = sanitizedTag.indexOf(sanitizedSearchTerm);

    if (startIndex === -1) return tag;

    const endIndex = startIndex + sanitizedSearchTerm.length;
    return (
      <>
        {tag.slice(0, startIndex)}
        <span className="bg-yellow-200">{tag.slice(startIndex, endIndex)}</span>
        {tag.slice(endIndex)}
      </>
    );
  };

  return (
    <div>
      <Header {...props} />
      <Navbar current="tags" />
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title={`Tags ${props.tags && `(${props.tags.length})`}`} />
          <EthicalAd type="text" style="fixed-footer" placementId="tags-text" />
          <div className="mt-5 px-5">
            <TextInput
              id="search"
              type="text"
              placeholder="Search tags..."
              color="purple"
              shadow
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap bg-white px-5 py-5">
            {filteredTags.sort().map((tag) => {
              return (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="group mx-1 my-1 flex transition hover:scale-110 cursor-pointer"
                  id={`tag-${tag}`}
                  prefetch={false}
                >
                  <div className="border border-dotted border-r-0 rounded-l-md border-violet-700 bg-violet-100 group-hover:bg-violet-900 px-1 pb-1 mr-1/2 group-hover:text-gray-100">
                    {highlightMatch(tag)}
                  </div>
                  <div className="border border-dotted rounded-r-2xl border-violet-700 px-1 group-hover:bg-violet-100 pb-1 mr-1/2 transition">
                    {props.pluginCountByTags[tag]}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();

  const tagsData: Record<string, number> = {};
  plugins.forEach((plugin) => {
    const tags = plugin.osTags?.split(',') || [];
    tags.forEach((tag) => {
      if (!tag) {
        return;
      }

      const sanitizedTag = sanitizeTag(tag);

      if (tagDenyList.includes(sanitizedTag)) {
        return;
      }

      if (tagsData[sanitizedTag] === undefined) {
        tagsData[sanitizedTag] = 0;
      }
      tagsData[sanitizedTag]++;
    });
  });

  const title = 'Tags of Obsidian Plugins';
  const description = `Explore the tags of Obsidian plugins. Find the best plugins for your needs. ${Object.keys(tagsData).join(', ')}`;
  const canonical = 'https://obsidianstats.com/tags';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getTagsPageSchema(
    Object.keys(tagsData),
    title,
    description,
    canonical,
    image
  );

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      tags: Object.keys(tagsData),
      pluginCountByTags: tagsData,
    },
  };
};

export default Tags;
