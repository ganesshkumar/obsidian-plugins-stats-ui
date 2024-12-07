'use client';
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownCircle, ArrowUpCircle, Book, Box, CheckCircle, Clock, Code, Download, Edit, Folder, Frown, HelpCircle, PenTool, PieChart, PlusCircle, RefreshCw, Shield, User, Users } from "react-feather";
import { Button, Popover } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "../../components/Category";
import Header from "../../components/HeaderPost";

const Demo = (props) => {
  return (
    <>
      <Header 
        title="Obsidian Plugins Wrapped 2024 - Key Milestones, Top Plugins, and Developer Highlights"
        description="Discover Obsidian Plugins journey in 2024! From new plugin releases and updates to standout developers and the most downloaded plugins, explore the milestones and community contributions that shaped the Obsidian ecosystem this year."
        publishedDate="2024-12-07"
        modifiedDate="2024-12-07"
        slug="2024-12-07-wrapped-2024"
      />
      <Intro />
      <MilestonesSection {...props} />
      <StatsSection {...props} />
      <MostDownloadedPluginsSection {...props} />
      <MostUpdatedPluginsSection {...props} />
      <MostPluginsByAuthorSection {...props} />
    </>
  );
}

const Intro = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, .5], [1, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [showParticles, setShowParticles] = useState(false);

  const handleOpenClick = () => {
    if (document) {
      document.getElementById("milestone").scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    setShowParticles(true);
  })

  const Categories = [
    "Task Management", 
    "File Management", 
    "Note Enhancements", 
    "Data Visualization", 
    "3rd Party Integrations", 
    "Productivity Tools", 
    "Coding & Technical Tools", 
    "Creative & Writing Tools", 
    "Privacy & Security", 
    "Customization & UI", 
    "Collaboration & Sharing", 
    "Learning & Knowledge Management", 
    "Miscellaneous", 
    "Uncategorized", 
  ];  

  const particles = Array.from({ length: 50 });
  return (
    <div className="h-[180vh] flex flex-col items-center justify-center" id="start">
      <div className="text-4xl font-bold text-violet-800 ">Obsidian Wrapped 2024</div>
      <div className="h-[80vh] w-full flex flex-col justify-center items-center fixed top-0">
        <motion.div
          style={{ scale }}
          className="h-64 w-64 bg-violet-800 rounded-full relative flex justify-center"
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
        {showParticles &&
          <>
            {particles.map((_, index) => {
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    opacity: Math.random(),
                  }}
                  animate={{
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                      >
                  <CategoryIcon category={Categories[Math.floor(Math.random() * Categories.length)]} size={12} />
                </motion.div>
              );
            })}
          </>
        }
      </div>
      <motion.div
        className="fixed bottom-0 left-0 right-0 flex justify-center pb-4"
        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
        style={{ opacity: buttonOpacity }}>
          <Button className="bg-violet-800 cursor-pointer" onClick={handleOpenClick}>
            <ArrowDownCircle className="mr-2 h-5 w-5"/>
            Open
          </Button>
      </motion.div>
    </div>
  )
}

const MilestonesSection = (props) => {
  return (
    <Section {...props} sectionId="milestone" nextSectionId="stats">
      <div className="flex flex-col lg:flex-row grow justify-center">
        <div className="w-1/2 lg:ml-8 grid content-center">
          <div className="text-4xl py-4 font-bold text-lime-500">Milestones achived in 2024</div>
          <ul className="list-disc flex flex-col gap-y-4">
            <li className="ml-5 text-2xl">Crossed <span className="font-bold text-3xl text-lime-500">{props.totalPlugins.toLocaleString()}</span> published plugins.</li>
            <li className="ml-5 text-2xl">Surpassed <span className="font-bold text-3xl text-lime-500">{props.totalDownloads.toLocaleString()}</span> plugin downloads.</li>
          </ul>            
        </div>
        <div className="w-1/2 ml-20 overflow-visible grid content-center">
          <img src='/images/undraw/undraw_awards_fieb.svg' className="" />
        </div>
      </div>
    </Section>
  )
}

const StatsSection = (props) => {
  const ref1 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true });
  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: true });
  const ref4 = useRef(null);
  const isInView4 = useInView(ref4, { once: true });
  return (
    <Section {...props} sectionId="stats" nextSectionId="most-downloaded-plugins">
      <div className="flex flex-col lg:flex-row grow justify-center">
        <div className="w-1/2 lg:ml-8 grid content-center">
          <div className="text-4xl py-4 font-bold text-lime-500">In 2024</div>
          <ul className="flex flex-col gap-y-4">
            <li className="text-2xl">
              <motion.div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu"
                ref={ref1}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView1 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView1 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2">{props.authors2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><User size={28} /> {" "} Developers contributed</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu"
                ref={ref2}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView2 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView2 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2">{props.addedPlugins2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><PlusCircle size={28} /> {" "} New Plugins</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu"
                ref={ref3}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView3 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView3 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2">{props.updatedPlugins2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><RefreshCw size={28} /> {" "} Plugin Updates</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu"
                ref={ref4}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView4 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView4 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2">{props.downloads2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><Download size={28} /> {" "} Plugin Downloads</div>
              </motion.div>
            </li>
          </ul>            
        </div>
        <div className="w-1/2 ml-20 overflow-visible grid content-center">
          <img src='/images/undraw/undraw_awards_fieb.svg' className="" />
        </div>
      </div>
    </Section>
  )
}

const MostDownloadedPluginsSection = (props) => {
  return (
    <Section {...props} sectionId="most-downloaded-plugins" nextSectionId="most-updated-plugins">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
        <ul className="flex flex-col justify-center gap-y-2">
          <li>
            <div className="text-4xl py-4 font-bold text-lime-500">Most downloaded plugins in 2024</div>
          </li>
          {Object.keys(props.mostDownloaded2024).map((pludingId, idx) => {
            return (
              <li key={pludingId} className="text-2xl">
                <div className="flex items-center gap-x-4">
                  <span className="w-8 pr-2">{idx + 1}.</span>
                  <span><a href={`/plugins/${pludingId}`} className="cursor-pointer underline grow mr-8">{props.mostDownloaded2024[pludingId][0]}</a></span>
                  <span className="w-32 flex flex-col ml-auto items-center">
                    <span>{props.mostDownloaded2024[pludingId][1].toLocaleString()}</span>
                    <span className="text-sm">Downloads</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

const MostUpdatedPluginsSection = (props) => {
  return (
    <Section {...props} sectionId="most-updated-plugins" nextSectionId="most-plugins-by-author">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
        <ul className="flex flex-col justify-center gap-y-2">
          <li>
            <div className="text-4xl py-4 font-bold text-lime-500">Plugins received most updates in 2024</div>
          </li>
          {props.mostUpdatedPlugins.map((plugin, idx) => {
            return (
              <li key={plugin[0]} className="text-2xl">
                <div className="flex items-center gap-x-4">
                  <span className="w-8 pr-2">{idx + 1}.</span>
                  <span><a href={`/plugins/${plugin[0]}`} className="cursor-pointer underline grow mr-8">{plugin[0]}</a></span>
                  <span className="w-32 flex flex-col ml-auto items-center">
                    <span>{plugin[1].toLocaleString()}</span>
                    <span className="text-sm">Updates</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

const MostPluginsByAuthorSection = (props) => {
  return (
    <Section {...props} sectionId="most-plugins-by-author" nextSectionId={undefined}>
      <div className="h-full flex flex-col justify-center items-center">
      <div className="text-center text-4xl my-4 font-bold text-lime-500 mb-12">Developers who created most plugins</div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex justify-center items-center lg:w-1/2">
          <img src="/images/undraw/undraw_programmer_re_owql.svg" width={384} height={384} alt="Obsidian Plugins Stats Logo" className="rounded-2xl" />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center">
          {Object.entries(props.mostPluginsByAuthor)
            .map((data: [string, any[]], index: number) => {
            return (
              <div key={index} className="flex py-2 mt-2">
                <div className="text-xl flex gap-x-2 items-baseline text-left">
                  <motion.a href={`https://github.com/${data[1][0].repo.split('/')[0]}`} className="text-2xl text-lime-500 font-bold underline" whileHover={{scale: 1.1}}>{data[0]}</motion.a>
                  <span>created</span>
                  <Popover
                    aria-labelledby={`plugin-popover-${index}`}
                    content={
                      <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                        <div className="px-3 py-2">
                          <div className="flex flex-wrap gap-x-2 mt-1">
                            {data[1].map((plugin, index) => {
                              return (
                                <a className="text-sm underline" key={index} href={`/plugins/${plugin.id}`}>{plugin.name}</a>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className="bg-transparent px-0 mx-0 underline decoration-dotted cursor-pointer">{data[1].length} plugins.</div>
                  </Popover>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </Section>
  )
}

const Section = (props) => {
  const handleNextSectionClick = () => {
    if (document) {
      if (props.nextSectionId) {
        document.getElementById(props.nextSectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        document.getElementById("milestone")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <motion.div
      className={`z-30 text-white top-0 ${props.bgClasses ?? "bg-violet-800" }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 50 }}
      transition={{
        duration: 0.8,
        delay: 1.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col h-screen">
        <div>
          <div id={props.sectionId} className="text-center text-2xl lg:text-5xl font-bold text-lime-500 pt-4">
            <div className="lg:hidden">
              <div className="text-center text-2xl lg:text-5xl font-bold text-lime-500">Obsidian Plugins</div>
              <div className="text-center text-2xl lg:text-5xl font-bold text-lime-500">2024 Wrapped</div>
            </div>
            <div className="hidden lg:block">Obsidian Plugins - 2024 Wrapped</div>
          </div>
        </div>
        {props.children}
        {props.nextSectionId ?
          <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button color="gray" onClick={handleNextSectionClick} ><ArrowDownCircle className={`mr-2 h-5 w-5 ${ !props.nextSectionId ? "collapsed" : ""}`}/> Next</Button>
          </motion.div> : 
          <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button color="gray" onClick={handleNextSectionClick} ><ArrowUpCircle className={`mr-2 h-5 w-5 ${ !props.nextSectionId ? "collapsed" : ""}`}/>Go back to top</Button>
          </motion.div>
        }
      </div>
    </motion.div>
  );
}

export const sentenceVariants = {
  hidden: {},
  // change staggerChildren variable to speed up or slow down typing.
  visible: { opacity: 1, transition: { staggerChildren: 0.01 } }
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } }
};

export const Typewriter = ({ text, ...rest }) => (
  <motion.p
    key={text}
    variants={sentenceVariants}
    viewport={{ once: true }}
    initial="hidden"
    whileInView="visible"
    {...rest}
  >
    {text.split("").map((char, i) => (
      <motion.span key={`${char}-${i}`} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.p>
);


export const getStaticProps = async () => {
  // read data from data/wrapped-2024.json
  const data = require('../../data/plugin-history-aggregated-2024.json');

  const pluginUpdateCount: Record<string, number> = data.updated
  .reduce((acc, v) => {
    const [pluginId, version] = v.split(':')
    if (pluginId in acc) {
      acc[pluginId] += 1
    } else {
      acc[pluginId] = 1
    }
    return acc;
  }, {} as Record<string, number>);
 const mostUpdatedPlugins = Object.entries(pluginUpdateCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return {
    props: {
      totalPlugins: data.milestone.totalPlugins,
      totalDownloads: data.milestone.totalDownloads,
      downloads2024: Object.values(data.mostDownloadedInPeriod).map((v: any) => v.delta).reduce((acc: number, v) => acc + v, 0),
      authors2024: Object.keys(data.authorPluginCount).length,
      addedPlugins2024: data.added.length || 0,
      updatedPlugins2024: data.updated.length || 0,
      mostDownloaded2024: Object.entries(data.mostDownloadedInPeriod)
        .sort((a: [string, {total: number, delta: number}], b: [string, {total: number, delta: number}]) => {
          return b[1].delta - a[1].delta;
        })
        .map((e: [string, {total: number, delta: number}]) => [e[0], e[1].delta])
        .slice(0, 10)
        .reduce((acc, v: [string, number]) => {
          const plugin = Object.values(data.plugins).find((p: any) => p.id === v[0]) as any;
          const name = plugin?.name || v[0];
          acc[v[0]] = [name, v[1]]
          return acc
        }, {} as Record<string, [string, number]>),
      mostPluginsByAuthor: Object.entries(data.authorPluginCount)
        .filter((e: [string, number]) => e[1] >= 5)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .map((e: [string, number]) => {
          const plugins = Object.values(data.plugins).filter((p: any) => p.author === e[0])
          return [e[0], plugins]
        })
        .reduce((acc, v: [string, any[]]) => {
          acc[v[0]] = v[1]
          return acc
        }, {} as Record<string, any[]>),
        mostUpdatedPlugins,
    },
  };
}

export default Demo
