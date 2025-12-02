import React from 'react';
import { getStaticProps as getNewProps } from './new';
import { getStaticProps as getUpdatesProps } from './updates';
import { getStaticProps as getTrendingProps } from './trending';
import { getStaticProps as getMostDownloadedProps } from './most-downloaded';
import { getStaticProps as getFavoritesProps } from './favorites';
import { getStaticProps as getTimelineProps } from './timeline';
import { getStaticProps as getShareProps } from './share';
//import { getStaticProps as getMigrateProps } from "./migrate";
import {
  getStaticPaths as getPostPaths,
  getStaticProps as getPostProps,
} from './posts/[slug]';
import {
  getStaticPaths as getPluginPaths,
  getStaticProps as getPluginProps,
} from './plugins/[slug]';

const InfoPage = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default InfoPage;

export const getStaticProps = async () => {
  const {
    title: newTitle,
    description: newDescription,
    canonical: newCanonical,
  } = (await getNewProps()).props;
  const {
    title: updatesTitle,
    description: updatesDescription,
    canonical: updatesCanonical,
  } = (await getUpdatesProps()).props;
  const {
    title: trendingTitle,
    description: trendingDescription,
    canonical: trendingCanonical,
  } = (await getTrendingProps()).props;
  const {
    title: mostDownloadedTitle,
    description: mostDownloadedDescription,
    canonical: mostDownloadedCanonical,
  } = (await getMostDownloadedProps()).props;
  const {
    title: favoritesTitle,
    description: favoritesDescription,
    canonical: favoritesCanonical,
  } = (await getFavoritesProps()).props;
  const {
    title: timelineTitle,
    description: timelineDescription,
    canonical: timelineCanonical,
  } = (await getTimelineProps()).props;
  const {
    title: shareTitle,
    description: shareDescription,
    canonical: shareCanonical,
  } = (await getShareProps()).props;
  //const {title: migrateTitle, description: migrateDescription, canonical: migrateCanonical } = (await getMigrateProps()).props;
  const postsPaths = (await getPostPaths(undefined)).paths;
  const posts = await Promise.all(
    postsPaths.map((path) => getPostProps(path as any))
  );
  const postsData = posts.map((post: any) => {
    const { title, description, canonical } = post.props;
    return { title, description, canonical };
  });

  // [TODO] Add plugins/index
  const pluginsPaths = (await getPluginPaths()).paths;
  const plugins = await Promise.all(
    pluginsPaths.map((path) => getPluginProps(path as any))
  );
  const pluginsData = plugins.map((plugin: any) => {
    const { title, description, canonical } = plugin.props;
    return { title, description, canonical };
  });

  const props = {
    new: {
      title: newTitle,
      description: newDescription,
      canonical: newCanonical,
    },
    updates: {
      title: updatesTitle,
      description: updatesDescription,
      canonical: updatesCanonical,
    },
    trending: {
      title: trendingTitle,
      description: trendingDescription,
      canonical: trendingCanonical,
    },
    mostDownloaded: {
      title: mostDownloadedTitle,
      description: mostDownloadedDescription,
      canonical: mostDownloadedCanonical,
    },
    favorites: {
      title: favoritesTitle,
      description: favoritesDescription,
      canonical: favoritesCanonical,
    },
    timeline: {
      title: timelineTitle,
      description: timelineDescription,
      canonical: timelineCanonical,
    },
    share: {
      title: shareTitle,
      description: shareDescription,
      canonical: shareCanonical,
    },
    migrate: {
      title:
        'Migrate your favorites plugins list across devices - Export & Import Guide',
      description:
        'Learn how to export and import your favorite plugins list across different devices. Follow our step-by-step guide to easily migrate your favorites from localStorage.',
      canonical: 'https://www.obsidianstats.com/migrate',
    },
    posts: postsData,
    plugins: pluginsData,
  };

  return { props };
};
