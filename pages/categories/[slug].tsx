import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import AppNavbar from '../../components/Navbar';

import { setupFavorites } from '../../utils/favorites';
import Footer from '../../components/Footer';
import { Navbar } from 'flowbite-react';
import InfoBar from '../../components/InfoBar';
import { PluginsCache } from '../../cache/plugins-cache';
import { PluginsMultiView } from '../../components/PluginsMultiView';

const Category = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <AppNavbar current={`category:${props.category}`}>
          <Navbar.Link
            href={`/categories/${props.category}`}
            active={true}
            className="text-lg"
          >
            {`category:${props.category}`}
          </Navbar.Link>
        </AppNavbar>
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title={props.category} />
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
  let categories = plugins
    .map((plugin) => plugin.aiCategories)
    .filter((category) => !!category);

  return {
    paths: categories.map((category) => ({ params: { slug: category } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();
  const pluginsWithCategory = plugins.filter(
    (plugin) => plugin.aiCategories === params.slug
  );

  return {
    props: {
      category: params.slug,
      plugins: pluginsWithCategory,
    },
  };
};

export default Category;
