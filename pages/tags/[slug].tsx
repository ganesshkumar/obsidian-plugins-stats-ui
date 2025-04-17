import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/Navbar';

import { setupFavorites } from '../../utils/favorites';
import { Footer } from '../../components/Footer';
import { Navbar } from 'flowbite-react';
import { sanitizeTag, tagDenyList } from '../../utils/plugins';
import { PluginsCache } from '../../cache/plugins-cache';
import { PluginsMultiView } from '../../components/PluginsMultiView';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';

interface ITagProps extends IHeaderProps {
  tag: string;
  plugins: any[];
}

const Tag = (props: ITagProps) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header {...props} />
      <div>
        <AppNavbar current={`tag:${props.tag}`}>
          <Navbar.Link
            href={`/tags/${props.tag}`}
            active={true}
            className="text-lg"
          >
            {`tag:${props.tag}`}
          </Navbar.Link>
        </AppNavbar>
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <div className="text-3xl py-5 pl-5 text-bold text-violet-900">
            #{props.tag}
          </div>
          <div className="flex-col">
            <PluginsMultiView
              plugins={props.plugins}
              favorites={favorites}
              setFavorites={setFavorites}
              showDescription={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const plugins = await PluginsCache.get();

  let tags = plugins
    .map((plugin) => plugin.osTags?.split(',') || [])
    .flat()
    .map((tag) => sanitizeTag(tag))
    .filter((tag) => !tagDenyList.includes(tag));
  tags = Array.from(new Set(tags));

  return {
    paths: tags.map((tag) => ({ params: { slug: tag } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();

  const pluginsWithTag = plugins.filter((plugin) =>
    plugin.osTags
      ? plugin.osTags
          ?.split(',')
          .map((tag) => sanitizeTag(tag))
          .filter((sanitizedTag) => !tagDenyList.includes(sanitizedTag))
          .includes(params.slug)
      : false
  );
    
  const title = `All ${params.slug} Obsidian Plugins.`;
  const description = `Find all ${params.slug} Obsidian plugins. ${pluginsWithTag.sort((a, b)=> b.score - a.score).map((plugin) => plugin.name).join(', ')}`;
  const canonical = "https://www.obsidianstats.com/tags/" + params.slug;
  const image = "/images/obsidian-stats-ogImage.png";
  const jsonLdSchema = JsonLdSchema.getTagPageSchema(pluginsWithTag, title, description, canonical, image, params.slug);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      tag: params.slug,
      plugins: pluginsWithTag,
    },
  };
};

export default Tag;
