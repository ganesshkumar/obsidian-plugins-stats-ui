'use client';
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownCircle, Book, Box, CheckCircle, Clock, Code, Download, Edit, Folder, Frown, HelpCircle, PenTool, PieChart, PlusCircle, RefreshCw, Shield, User, Users } from "react-feather";
import { Button, Popover } from "flowbite-react";
import { useEffect, useState } from "react";
import { CategoryIcon } from "../components/Category";

const Demo = (props) => {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 1], ["relative", "fixed"]);

  return (
    <>
      <Intro />
      <MilestonesSection {...props} />
      <StatsSection {...props} />
      <MostDownloadedPluginsSection {...props} />
      <MostPluginsByAuthorSection {...props} />
    </>
  );
}

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };

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
    <div className="h-[180vh] flex flex-col items-center justify-center">
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
                  <CategoryIcon category={Categories[Math.floor(Math.random() * Categories.length)]} />
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

const Nav = (props) => {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 1], ["relative", "sticky"]);
  
  const introText = "2024 was a landmark year for Obsidian plugins! The plugin ecosystem saw explosive growth. Let's celebrate the highlights, fun facts, and incredible creativity that made 2024 unforgettable!"
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    introText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, introText.length, {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <div>
      <MilestonesSection {...props} />
      <StatsSection {...props} />
      <MostDownloadedPluginsSection {...props} />
      <MostPluginsByAuthorSection {...props} />
    </div>
  )
}

const MilestonesSection = (props) => {
  return (
    <Section {...props} sectionId="milestone" nextSectionId="stats" bgClasses="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
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
  return (
    <Section {...props} sectionId="stats" nextSectionId="most-downloaded-plugins">
      <div className="flex flex-col lg:flex-row grow justify-center">
        <div className="w-1/2 lg:ml-8 grid content-center">
          <ul className="flex flex-col gap-y-4">
            <li className="ml-5 text-2xl">
              <div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu">
                <div className="font-bold text-5xl mb-2">{props.authors2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><User size={28} /> {" "} Developers</div>
              </div>
            </li>
            <li className="ml-5 text-2xl">
              <div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu">
                <div className="font-bold text-5xl mb-2">{props.addedPlugins2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><PlusCircle size={28} /> {" "} New Plugins</div>
              </div>
            </li>
            <li className="ml-5 text-2xl">
              <div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu">
                <div className="font-bold text-5xl mb-2">{props.updatedPlugins2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><RefreshCw size={28} /> {" "} Plugin Updates</div>
              </div>
            </li>
            <li className="ml-5 text-2xl">
              <div className="bg-lime-600 rounded-md text-left p-4 shadow-lime-600 cursor-context-menu">
                <div className="font-bold text-5xl mb-2">{props.downloads2024.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1"><Download size={28} /> {" "} Downloads</div>
              </div>
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
    <Section {...props} sectionId="most-downloaded-plugins" nextSectionId="most-plugins-by-author" bgClasses="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
      <ul className="flex flex-col justify-center gap-y-2">
        {Object.keys(props.mostDownloaded2024).map((pludingId, idx) => {
          return (
            <li key={pludingId} className="text-2xl">
              <div className="flex gap-x-4">
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

const MostPluginsByAuthorSection = (props) => {
  return (
    <Section {...props} sectionId="most-plugins-by-author" nextSectionId={undefined} bgClasses="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
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
                  <a href={`https://github.com/${data[1][0].repo.split('/')[0]}`} className="text-2xl text-lime-500 font-bold underline">{data[0]}</a>
                  <span>created</span>
                  <Popover
                    aria-labelledby={`plugin-popover-${index}`}
                    content={
                      <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                        <div className="px-3 py-2">
                          <div className="flex flex-wrap gap-x-2 mt-1">
                            {data[1].map((plugin, index) => {
                              return (
                                <a className="text-sm underline" key={index} href={`https://github.com/${plugin.repo}`}>{plugin.name}</a>
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
    if (document && props.nextSectionId) {
      document.getElementById(props.nextSectionId)?.scrollIntoView({ behavior: "smooth" });
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
        <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          {/* <ButtonGroup> */}
            {/* <Button color="gray"><ArrowUpCircle className="mr-2 h-5 w-5"/> Prev</Button> */}
            <Button color="gray" onClick={handleNextSectionClick} ><ArrowDownCircle className={`mr-2 h-5 w-5 ${!props.nextSectionId ? "collapsed" : ""}`}/> Next</Button>
          {/* </ButtonGroup> */}
        </motion.div>
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
  const data = require('../data/plugin-history-aggregated-2024.json');
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
        }, {} as Record<string, any[]>)
    },
  };
}

export default Demo
