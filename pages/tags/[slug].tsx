import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AppNavbar from '../../components/Navbar';

import { setupFavorites } from '../../utils/favorites';
import Footer from '../../components/Footer';
import NewPluginsList from '../../components/NewPluginsList';
import { Navbar } from 'flowbite-react';
import { sanitizeTag } from '../../utils/plugins';
import { PluginsCache } from '../../cache/plugins-cache';

const Tag = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
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
            <NewPluginsList
              plugins={props.plugins}
              favorites={favorites}
              setFavorites={setFavorites}
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
    .map((plugin) => plugin.aiTags?.split(',') || [])
    .flat()
    .map((tag) => sanitizeTag(tag));
  tags = Array.from(new Set(tags));

  return {
    paths: tags.map((tag) => ({ params: { slug: tag } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();

  const pluginsWithTag = plugins.filter((plugin) =>
    plugin.aiTags
      ? plugin.aiTags
          ?.split(',')
          .map((tag) => sanitizeTag(tag))
          .includes(params.slug)
      : false
  );

  return {
    props: {
      tag: params.slug,
      plugins: pluginsWithTag,
    },
  };
};

export default Tag;
