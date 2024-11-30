'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Page from "../components/Page"
import Footer from "../components/Footer";
import { Download, PlusCircle, RefreshCw, User } from "react-feather";
import { Accordion, Button, Popover } from "flowbite-react";

const Demo = (props) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 20]);
  const position = useTransform(scrollYProgress, [0, 1], ["relative", "fixed"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <div className="h-[180vh]">
        <div className="h-[80vh] w-full flex flex-col justify-center items-center fixed top-0">
          <motion.div
            style={{ scale }}
            className="h-64 w-64 bg-violet-800 rounded-full relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
          }}>
          </motion.div>
          <motion.div className="absolute top-0 w-full flex justify-center items-center h-full" style={{ opacity, scale: imageScale }}>
              <Image src="/logo-512.png" width={128} height={128} alt="Obsidian Plugins Stats Logo" className="rounded-2xl" />
          </motion.div>
        </div>
      </div>
      <Nav {...props} />
    </>
  );
}

const Nav = (props) => {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 1], ["relative", "sticky"]);
  return (
    <div>
      <motion.div
        style={{ position }}
        className="z-30 text-white top-0 max-w-6xl mx-auto p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 50 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="text-center text-5xl font-bold text-lime-500">Obsidian Plugins - 2024 Wrapped</div>
        <div className="pt-24 text-xl"><b>2024</b> was a landmark year for Obsidian plugins! The plugin ecosystem saw explosive growth. From AI-powered tools to game-changing integrations, developers pushed the boundaries of what's possible. Let's celebrate the highlights, fun facts, and incredible creativity that made 2024 unforgettable!</div>
        <div className="pt-24 flex flex-col lg:flex-row">
          <div className="w-1/2 flex flex-col lg:ml-8 justify-center">
            <div className="text-4xl my-4 font-bold text-lime-500">Milestones achived in 2024</div>
            <ul className="list-disc flex flex-col gap-y-4">
              <li className="ml-5">Crossed <span className="font-bold text-2xl text-lime-500">{props.milestones.totalPlugins.toLocaleString()}</span> published plugins and </li>
              <li className="ml-5">Surpassed <span className="font-bold text-2xl text-lime-500">{props.milestones.totalDownloads.toLocaleString()}</span> plugin downloads.</li>
            </ul>            
          </div>
          <div className="w-1/2 ml-20 overflow-visible">
            <img src='/images/undraw/undraw_awards_fieb.svg' className="" />
          </div>
        </div>
        <div className="pt-24">
          <div className="text-center text-4xl my-4 font-bold text-lime-500 mb-12">Just in 2024</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
            <div className="bg-lime-600 rounded-md text-center py-12 shadow-lime-600 cursor-context-menu">
              <div className="font-bold text-6xl mb-2">{props.pluginAuthors}</div>
              <div className="text-lg flex gap-x-1 justify-center items-center">
                <User size={18} />Developers</div>
            </div>
            <div className="bg-lime-600 rounded-md text-center py-12 shadow-lime-600 cursor-context-menu">
              <div className="font-bold text-6xl mb-2">{props.pluginsAdded}</div>
              <div className="text-lg flex gap-x-1 justify-center items-center">
                <PlusCircle size={18} />New Plugins
              </div>
            </div>
            <div className="bg-lime-600 rounded-md text-center py-12 shadow-lime-600 cursor-context-menu">
              <div className="font-bold text-6xl mb-2">{props.pluginAuthors}</div>
              <div className="text-lg flex gap-x-1 justify-center items-center">
                <RefreshCw size={18} />Plugin Updates
              </div>
            </div>
            <div className="bg-lime-600 rounded-md text-center py-12 shadow-lime-600 cursor-context-menu">
              <div className="font-bold text-6xl mb-2">{props.pluginAuthors}</div>
              <div className="text-lg flex gap-x-1 justify-center items-center">
                <Download size={18} />Downloads
              </div>
            </div>
          </div>
        </div>
        <div className="pt-24">
          <div className="text-center text-4xl my-4 font-bold text-lime-500 mb-12">Developers who created most plugins</div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex justify-center items-center lg:w-1/2">
              <img src="/images/undraw/undraw_programmer_re_owql.svg" width={384} height={384} alt="Obsidian Plugins Stats Logo" className="rounded-2xl" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              {props.pluginsAddedByAuthor
                .sort((a, b) => b.count - a.count)
                .filter(author => author.count >= 5)
                .map((author, index) => {
                return (
                  <div key={index} className="flex py-2 mt-2">
                    <div className="text-xl flex gap-x-2 items-baseline text-left">
                      <a href={`https://github.com/${author.plugins[0].repo.split('/')[0]}`} className="text-2xl text-lime-500 font-bold underline">{author.author}</a>
                      <span>created</span>
                      <Popover
                        aria-labelledby={`plugin-popover-${index}`}
                        content={
                          <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                            <div className="px-3 py-2">
                              <div className="flex flex-wrap gap-x-2 mt-1">
                                {author.plugins.map((plugin, index) => {
                                  return (
                                    <a className="text-sm underline" key={index} href={`https://github.com/${plugin.repo}`}>{plugin.name}</a>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div className="bg-transparent px-0 mx-0 underline decoration-dotted cursor-pointer">{author.count} plugins.</div>
                      </Popover>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </div>
  )
}

export const getStaticProps = async () => {
  // read data from data/wrapped-2024.json
  const data = require('../data/wrap2024.json');
  return {
    props: {
      ...data
    },
  };
}

export default Demo
