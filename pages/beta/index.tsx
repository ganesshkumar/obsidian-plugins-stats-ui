import React, { useMemo, useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Header, { IHeaderProps } from '../../components/Header';
import { Footer } from '../../components/Footer';
import InfoBar from '../../components/InfoBar';
import { PullRequestEntry, PrismaClient } from '@prisma/client';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Link from 'next/link';
import { BetaEntryCard } from '../../components/BetaEntryCard';
import EthicalAd from '@/components/EthicalAd';

interface IBetaPageProps extends IHeaderProps {
  entries: PullRequestEntry[];
}

/**
 * Beta page shows prospective plugins & themes sourced from open pull requests.
 * Uses card grid (similar spacing/styling to new plugins page cards) for clarity.
 */
const BetaIndex = (props: IBetaPageProps) => {
  const { entries } = props;
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filtered = useMemo(() => {
    if (!query) return entries;
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length > 0);
    return entries.filter(e => {
      const name = (e.name || '').toLowerCase();
      const desc = (e.description || '').toLowerCase();
      const author = (e.author || '').toLowerCase();
      const text = name + ' ' + desc + ' ' + author;
      return tokens.every(t => text.includes(t));
    });
  }, [query, entries]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...props} />
      <Navbar current="beta" />
      <main className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title={`Beta Plugins and Themes ${entries.length ? `(${entries.length})` : ''}`} />
          <div className="my-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
              <div className="font-semibold text-yellow-800 mb-2">Note: Beta plugins & themes are used at your own risk</div>
              <ul className="list-disc pl-5 text-yellow-700 text-sm">
                <li>These are plugins & themes with open PRs waiting to be merged into the community plugin/theme lists.</li>
                <li>Beta entries are not yet officially released or reviewed by Obsidian.</li>
                <li>Usually installed via <Link href="https://github.com/TfTHacker/obsidian42-brat" target="_blank" className="underline">BRAT</Link> (Beta Review and Testing) community plugin.</li>
                <li>Functionality, security, and stability are not guaranteed.</li>
              </ul>
            </div>
          </div>
          <EthicalAd type="text" style="fixed-footer" placementId="beta" className='horizontal' />
          {/* Search & Type Links */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <div className="relative md:w-1/2">
              <svg className="absolute text-slate-400 top-2 left-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
              <input ref={inputRef} type="text" value={query} onChange={handleQueryChange} placeholder="Search beta entries" className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300" />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-x-4 text-sm font-medium">
            <span className="text-gray-500">Show:</span>
            <Link href="/beta" className={`underline-offset-4 underline ${typeof window !== 'undefined' && window.location.pathname === '/beta' ? 'underline font-semibold' : ''}`}>All</Link>
            <Link href="/beta/plugins" className="underline-offset-4 hover:underline">Plugins</Link>
            <Link href="/beta/themes" className="underline-offset-4 hover:underline">Themes</Link>
          </div>
          {!filtered.length && (
            <div className="mt-4 text-gray-600 text-sm">No entries match your search.</div>
          )}
          {!!filtered.length && (
            <div className="mt-2 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((e) => (
                <BetaEntryCard key={e.id} entry={e} highlight={query} />
              ))}
            </div>
          )}
          {!!entries.length && (
            <div className="mt-6 text-xs text-gray-500">
              * These entries are derived from open GitHub PRs proposing new plugins or themes and may change.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  try {
    const entries = await prisma.pullRequestEntry.findMany({
      where: {
        prStatus: 'open',
        type: { in: ['plugin', 'theme'] },
        name: { not: null },
        needManualReview: false,
        prLabels: {
          mode: 'insensitive',
          not: { contains: 'installation not recommended' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const title = 'Upcoming / Beta Obsidian Plugins & Themes (Open PRs)';
    const description = 'Browse plugins and themes from open GitHub pull requests proposing new Obsidian plugins & themes before they are merged.';
    const canonical = 'https://www.obsidianstats.com/beta';
    const image = 'https://www.obsidianstats.com/images/new-og.webp';

    const jsonLdSchema = JsonLdSchema.getBetaIndexPageSchema(
      entries,
      title,
      description,
      canonical,
      image
    );
    return {
  props: { title, description, canonical, image, entries, jsonLdSchema },
      revalidate: 3600,
    };
  } catch (e) {
    console.error('Error fetching beta entries', e);
    return { props: { title: 'Beta', description: '', canonical: '', image: '', entries: [], jsonLdSchema: null }, revalidate: 3600 };
  } finally {
    await prisma.$disconnect();
  }
};

export default BetaIndex;
