import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import moment from 'moment';
import { PluginsCache } from '../../cache/plugins-cache';
import { PluginsShareView } from '../share';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import { Author, Post as PostData } from '../../lib/abstractions';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import EthicalAd from '../../components/EthicalAd';
import Comments from '../../components/Comments';
import ResponsiveLayout from '../_responsive-layout';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import { remarkPluginHandler } from '../../domain/remark/plugin-hander';
import { remarkThemeHandler } from '../../domain/remark/theme-handler';
import { remarkPluginImageHandler } from '../../domain/remark/plugin-image-handler';
import { Suggestions } from '../../domain/suggestions/models';
import { generateSuggestions } from '../../domain/suggestions';
import { Sidebar } from '../../components/Sidebar';
import rehypeToc from 'rehype-toc';
import { SiteData } from '../../data/siteData';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IPostPageProps extends IHeaderProps {
  postData: PostData;
  plugins: any[];
  suggestions: Suggestions;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();
  const postData = getPostData(params?.slug as string);

  const processedContent = await unified()
    .use(remarkParse)
    //.use(remarkPostAd)
    .use(remarkPluginHandler)
    .use(remarkThemeHandler)
    .use(remarkPluginImageHandler)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeToc, {
      headings: ['h1', 'h2'],
      cssClasses: {
        listItem: 'list-disc marker:text-red-700',
        link: 'no-underline',
      },
      customizeTOC: (toc) => {
        if (
          toc.children.length > 0 &&
          (toc.children[0] as HTMLOListElement).children.length > 0
        ) {
          toc.children.unshift({
            type: 'element',
            // @ts-expect-error: tagName is valid for hast Element nodes
            tagName: 'div',
            properties: {
              className: ['toc-title', 'flex', 'items-center', 'gap-2'],
            },
            children: [{ type: 'text', value: 'On this page' }],
          });
        }
        return toc;
      },
      customizeTOCItem: (node) => {
        const stripEmoji = (value) =>
          value.replace(
            /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Symbol}\p{Punctuation}]+\s*/gu,
            ''
          );

        const cleanTextNodes = (child) => {
          if (child.type === 'text') {
            child.value = stripEmoji(child.value);
          } else if (child.children) {
            child.children.forEach(cleanTextNodes);
          }
        };

        if (node.children) {
          node.children.forEach(cleanTextNodes);
        }

        return node;
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(postData.content);
  const contentHtml = processedContent.toString();

  const filteredPlugins =
    postData.plugins
      ?.map((pluginId) => plugins.find((p) => p.pluginId === pluginId))
      .filter((plugin) => !!plugin) ?? [];

  const title = postData.title;
  const description = postData.description;
  const canonical = `https://www.obsidianstats.com/posts/${postData.id}`;
  const image = postData.ogImage ?? '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getPostPageSchema(
    postData,
    title,
    description,
    canonical,
    image
  );
  const suggestions = await generateSuggestions({
    type: 'post',
    slug: postData.id,
  });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      postData: {
        ...postData,
        contentHtml,
      },
      plugins: filteredPlugins,
      suggestions,
    },
    revalidate: 604800, // 7 days
  };
};

const Post = (props: IPostPageProps) => {
  const { postData, plugins, suggestions } = props;
  const [comparePlugins, setComparePlugins] = useState(false);

  const isLessThanLarge = useIsLessThanLarge();

  const authors = SiteData.authors as Record<string, Author>;
  const defaultAuthor = authors.ganesshkumar;
  const authorSlug = postData.author || defaultAuthor.slug;
  const author = authors[authorSlug] || defaultAuthor;
  const publishedLabel = moment(postData.publishedDate).format('DD-MMM-YYYY');
  const updatedLabel = moment(postData.modifiedDate).format('DD-MMM-YYYY');
  const hasUpdates = postData.publishedDate !== postData.modifiedDate;

  const sidebar = (
    <Sidebar
      pageInfo={{ type: 'post', slug: postData.id }}
      suggestions={suggestions}
    />
  );

  const title = (
    <h1 className="mt-2 mb-0 text-3xl font-heading leading-10">
      {postData.title}
    </h1>
  );

  const authorInfo = (
    <div className="mt-3 mb-6 space-y-2">
      <div className="hidden md:flex md:items-start md:gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={author.avatar || undefined} alt={author.name} />
          <AvatarFallback
            className="bg-gray-100 text-gray-700"
            style={{
              backgroundColor: `hsl(${hashStringToHue(author.name)}, 70%, 90%)`,
              color: `hsl(${hashStringToHue(author.name)}, 70%, 30%)`,
            }}
          >
            {author.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-gray-800">
            <span>By</span>
            <Link
              href={`/authors/${author.slug}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {author.name}
            </Link>
            <span aria-hidden="true">•</span>
            <span>Published {publishedLabel}</span>
            {hasUpdates && (
              <>
                <span aria-hidden="true">•</span>
                <span>Updated {updatedLabel}</span>
              </>
            )}
          </div>
          <div className="text-sm text-gray-600 line-clamp-2">{author.bio}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 md:hidden">
        <span>By</span>
        <Link
          href={`/authors/${author.slug}`}
          className="font-semibold text-gray-900 hover:underline"
        >
          {author.name}
        </Link>
        <span aria-hidden="true">•</span>
        <span>Published {publishedLabel}</span>
        {hasUpdates && (
          <>
            <span aria-hidden="true">•</span>
            <span>Updated {updatedLabel}</span>
          </>
        )}
      </div>
    </div>
  );

  const introduction = (
    <>
      {title}
      {authorInfo}
      {postData.tags && (
        <>
          <ul className="flex gap-x-2 list-none ml-0 pl-0">
            {postData.tags
              .filter((t) => t !== 'obsidian-plugins')
              .map((tag) => (
                <li key={tag} className="pl-0">
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                </li>
              ))}
          </ul>
        </>
      )}
      {postData.bannerImage && (
        <Image
          src={postData.bannerImage}
          alt={postData.title}
          width={2240}          // use the image’s real width if you know it
          height={1260}         // use the image’s real height
          sizes="(min-width: 1024px) 960px, 100vw"
          className="w-full h-auto rounded-lg mb-4"
          priority
        />
      )}
    </>
  );

  return (
    <div>
      <Header {...props} />
      <Navbar current="posts" />
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <article className="prose max-w-none! prose-img:mx-auto prose-img:max-h-[512px] prose-img:my-0 prose-h2:text-red-700 prose-h3:text-red-700">
            {introduction}
            <div className="mt-4 flex justify-center">
              {isLessThanLarge && (
                <EthicalAd
                  type="text"
                  style="fixed-footer"
                  placementId="post-fixed-footer"
                />
              )}
            </div>
            {plugins && plugins.length ? (
              <>
                <Button
                  color="dark"
                  onClick={() => setComparePlugins(!comparePlugins)}
                >
                  {comparePlugins ? 'Hide' : 'Compare'} plugins in the post
                </Button>
                {comparePlugins && (
                  <div className="overflow-x-auto">
                    <PluginsShareView
                      pluginIds={plugins.map((p) => p.pluginId)}
                      plugins={plugins}
                      favorites={[]}
                      setFavorites={() => {}}
                    />
                  </div>
                )}
              </>
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            <Comments />
          </article>
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

function hashStringToHue(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 360);
}

export default Post;


