import React from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import InfoBar from '../components/InfoBar';
import ResponsiveLayout from './_responsive-layout';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import { Search, Star, Tool } from 'react-feather';
import Link from 'next/link';

interface IAboutPageProps extends IHeaderProps {}

const About = (props: IAboutPageProps) => {
  return (
    <div>
      <Header {...props} />
      <Navbar current="info" />

      <div className="bg-white pt-5">
        <ResponsiveLayout>
          <div className="px-4">
            <InfoBar title="About" />

            <section className="prose mt-6 max-w-none">
              <p className="mb-4">
                Hi I am Ganesh Kumar. I spend more time building small tools for my
                own Obsidian setup than I'd care to admit and this site is the
                result of that habit. I wanted a place to quickly find a plugin,
                check if it's actively maintained and see what changed in the
                last few releases without digging through multiple GitHub pages.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-violet-100">
                      <Search size={18} color="#7C3AED" />
                    </div>
                    <div className="font-semibold">Discover</div>
                  </div>
                  <div className="text-sm mt-2 text-gray-700"><Link href="/plugins" className="underline text-violet-600">Find plugins</Link> by name author tag or category. See quick stats like total downloads stars and latest release date. Sort by popularity recency or score and jump straight to the repo or use the obsidian install link for one click testing.</div>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <Star size={18} color="#F59E0B" />
                    </div>
                    <div className="font-semibold">Track</div>
                  </div>
                  <div className="text-sm mt-2 text-gray-700">Save plugins you use and get a compact feed of new versions and changelogs. <Link href="/favorites" className="underline text-amber-600">Import or export your favorites</Link> as a JSON file to move them between devices. Focus on updates for just the plugins you care about.</div>
                </div>
                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-emerald-100">
                      <Tool size={18} color="#10B981" />
                    </div>
                    <div className="font-semibold">Tools</div>
                  </div>
                  <div className="text-sm mt-2 text-gray-700">A <Link href="/tools/dataview-query-wizard" className="underline text-emerald-600">Dataview query helper</Link> that turns plain English into Dataview or DataviewJS snippets so you waste less time on syntax. A <Link href="/scorer" className="underline text-emerald-600">scorer editor</Link> lets you write a small function to rank plugins by the metrics you care about. Both tools are lightweight and practical for power users.</div>
                </div>
              </div>

              <p className="mt-6">
                A few quick notes about the data: plugin metadata and historical
                changes are generated from a cached source (the public community
                list and the plugin repositories). I fetch README content from
                GitHub and sanitize it before showing it here. The site tries to
                be honest about what it shows - counts, dates and links are
                intended as a convenience, not an authoritative record.
              </p>

              {/* <p className="mt-4">
                Privacy: I use minimal analytics to understand how the site is
                used and keep ads off sensitive pages. If you care about
                tracking, please read the privacy and cookie pages linked in the
                footer.
              </p> */}

              <div className="mt-6 border-t pt-6">
                <div className="font-semibold">A little about me</div>
                <div className="text-sm mt-2 text-gray-700">
                  I'm a software developer who builds tools for my own
                  workflow and occasionally shares them. If you've got a bug
                  report, suggestion, or a plugin that should be on this list,
                  drop a note at <a href="mailto:rpganesshkumar@gmail.com">rpganesshkumar@gmail.com</a>. If you want to help
                  improve the site the repo is open on GitHub pull requests
                  welcome.
                </div>
              </div>

              <div className="mt-6">
                <div className="font-semibold">Want to help?</div>
                <div className="text-sm mt-2 text-gray-700">The site is a labour of love. You can help by: reporting data errors suggesting features or sending PRs. Thanks for stopping by.</div>
              </div>
            </section>
          </div>
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const title = 'About - Obsidian Plugins Stats';
  const description = 'Learn about Obsidian Plugins Stats: features, tools, data sources, privacy and how the site helps you discover, compare and track Obsidian plugins.';
  const canonical = 'https://www.obsidianstats.com/about';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getHomePageSchema();

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      suggestions: {
        tools: [],
        posts: [],
        similarPlugins: [],
        hasMoreSimilarPlugins: false,
      },
    },
  };
};

export default About;
