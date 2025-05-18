import React from 'react';
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

interface ITagsPageProps extends IHeaderProps {
  tags: string[];
  pluginCountByTags: Record<string, number>;
}

const Tags = (props: ITagsPageProps) => {
  return (
    <div>
      <Header {...props} />
      <Navbar current="tags" />
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title={`Tags ${props.tags && `(${props.tags.length})`}`} />
          <EthicalAd type="text" style="fixed-footer" placementId="tags-text" />
          <div className="flex flex-wrap bg-white px-5 py-5">
            {props.tags &&
              props.tags.sort().map((tag) => {
                return (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="group mx-1 my-1 flex transition hover:scale-110 cursor-pointer"
                    id={`tag-${tag}`}
                    prefetch={false}
                  >
                    <div className="border border-dotted border-r-0 rounded-l-md border-violet-700 bg-violet-100 group-hover:bg-violet-900 px-1 pb-1 mr-1/2 group-hover:text-gray-100">
                      {tag}
                    </div>
                    <div className="border border-dotted rounded-r-2xl border-violet-700 px-1 group-hover:bg-violet-100 px-1 pb-1 mr-1/2 transition">
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
