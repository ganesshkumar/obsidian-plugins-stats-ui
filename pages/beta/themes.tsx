import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Navbar from '../../components/Navbar';
import Header, { IHeaderProps } from '../../components/Header';
import { Footer } from '../../components/Footer';
import InfoBar from '../../components/InfoBar';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Link from 'next/link';
import { BetaEntryCard } from '../../components/BetaEntryCard';
import EthicalAd from '@/components/EthicalAd';
import { IBetaEntry } from '@/components/BetaEntryCard';
import { Card } from '@/components/ui/card';
import {
  GET_BETA_ENTRIES_QUERY,
  type IBetaEntriesQueryResult,
} from '@/lib/graphql/queries';

interface IProps extends IHeaderProps {}

const BetaThemes = (props: IProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error } = useQuery<IBetaEntriesQueryResult>(
    GET_BETA_ENTRIES_QUERY,
    {
      variables: { type: 'theme' },
      ssr: false,
    }
  );
  const entries = data?.betaEntries ?? [];
  const isLoading = loading;
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const tokens = useMemo(
    () =>
      query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((t) => t),
    [query]
  );
  const filtered = useMemo(() => {
    if (!query) return entries;
    return entries.filter((e) => {
      const txt = `${e.name?.toLowerCase() || ''} ${e.description?.toLowerCase() || ''} ${e.author?.toLowerCase() || ''}`;
      return tokens.every((t) => txt.includes(t));
    });
  }, [entries, query, tokens]);

  useEffect(() => {
    if (error) {
      console.error('Failed to load beta themes', error);
    }
  }, [error]);

  const renderSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 18 }).map((_, idx) => (
        <Card
          key={`beta-theme-skel-${idx}`}
          className="animate-pulse px-4 py-5 h-full"
        >
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...props} />
      <Navbar current="beta" />
      <main className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title={`Beta Themes (${entries.length})`} />
          <div className="my-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
              <div className="font-semibold text-yellow-800 mb-2">
                Note: Beta themes are used at your own risk
              </div>
              <ul className="list-disc pl-5 text-yellow-700 text-sm">
                <li>
                  These are themes with open PRs waiting to be merged into the
                  community themes list.
                </li>
                <li>
                  Beta entries are not yet officially released or reviewed by
                  Obsidian.
                </li>
                <li>
                  Usually installed via{' '}
                  <Link
                    href="https://github.com/TfTHacker/obsidian42-brat"
                    target="_blank"
                    className="underline"
                  >
                    BRAT
                  </Link>{' '}
                  (Beta Review and Testing) community plugin.
                </li>
                <li>
                  Functionality, security, and stability are not guaranteed.
                </li>
              </ul>
            </div>
          </div>
          <EthicalAd
            type="text"
            style="fixed-footer"
            placementId="beta-themes"
            className="horizontal"
          />
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <div className="relative md:w-1/2">
              <svg
                className="absolute text-slate-400 top-2 left-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                placeholder="Search beta themes"
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-x-4 text-sm font-medium">
            <span className="text-gray-500">Show:</span>
            <Link href="/beta" className="underline-offset-4 hover:underline">
              All
            </Link>
            <Link
              href="/beta/plugins"
              className="underline-offset-4 hover:underline"
            >
              Plugins
            </Link>
            <span className="underline font-semibold underline-offset-4">
              Themes
            </span>
          </div>
          {!filtered.length && (
            <div className="text-sm text-gray-600">
              No beta themes match your search.
            </div>
          )}
          {isLoading && renderSkeleton()}
          {!isLoading && !!filtered.length && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((e) => (
                <BetaEntryCard key={e.id} entry={e} highlight={query} />
              ))}
            </div>
          )}
          {!!entries.length && (
            <div className="mt-6 text-xs text-gray-500">
              * Derived from open GitHub PRs and may change.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const title = 'Beta Obsidian Themes (Open PRs)';
  const description =
    'Browse prospective beta Obsidian themes sourced from open GitHub PRs.';
  const canonical = 'https://www.obsidianstats.com/beta/themes';
  const image = 'https://www.obsidianstats.com/images/new-og.webp';
  const jsonLdSchema = JsonLdSchema.getBetaThemesPageSchema(
    [],
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
    },
    revalidate: 7200,
  };
};

export default BetaThemes;
