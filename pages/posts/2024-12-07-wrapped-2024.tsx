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
      <MostDownloadedPluginsFromNewPluginsSection {...props} />
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
    <div className="h-[180vh] flex flex-col items-center justify-center bg-violet-800" id="start">
      <div className="text-4xl font-bold text-violet-800 ">Obsidian Wrapped 2024</div>
      <div className="h-[80vh] w-full flex flex-col justify-center items-center fixed top-0">
        <motion.div
          style={{ scale }}
          className="h-64 w-64 bg-white rounded-full relative flex justify-center"
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
          <Button className="cursor-pointer" onClick={handleOpenClick} color="gray">
            <ArrowDownCircle className="mr-2 h-5 w-5"/>
            Open
          </Button>
      </motion.div>
    </div>
  )
}

const MilestonesSection = (props) => {
  return (
    <Section {...props} sectionId="milestone" nextSectionId="stats" titleClasses="text-slate-100" bgClasses="bg-gradient-to-b from-emerald-600 to-emerald-700">
      <div className="flex flex-col lg:flex-row grow justify-center">
        <div className="w-1/2 lg:ml-8 grid content-center">
          <div className="text-4xl py-4 font-bold text-slate-100">Milestones achived in 2024</div>
          <ul className="list-disc flex flex-col gap-y-4">
            <li className="ml-5 text-2xl text-slate-300">Crossed <span className="font-bold text-3xl text-slate-100">{props.milestone.totalPlugins.toLocaleString()}</span> published plugins.</li>
            <li className="ml-5 text-2xl text-slate-300">Surpassed <span className="font-bold text-3xl text-slate-100">{props.milestone.totalDownloads.toLocaleString()}</span> plugin downloads.</li>
          </ul>            
        </div>
        <div className="w-1/2 ml-20 overflow-visible grid content-center">
          <img src='/images/undraw/undraw_celebration_re_kc9k.svg' className="" />
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
    <Section {...props} sectionId="stats" nextSectionId="most-downloaded-new-plugins" bgClasses="bg-gradient-to-b from-red-900 to-red-700" titleClasses="text-amber-400">
      <div className="flex flex-col lg:flex-row grow justify-center">
        <div className="w-1/2 lg:ml-8 grid content-center">
          <div className="text-4xl py-4 font-bold text-amber-400">In 2024</div>
          <ul className="flex flex-col gap-y-4">
            <li className="text-2xl">
              <motion.div className="bg-amber-400 rounded-md text-left p-4 shadow-amber-400 cursor-context-menu"
                ref={ref1}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView1 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView1 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2 text-gray-800">{props.stats.newPluginsDevCount.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1  text-gray-800"><User size={28} /> {" "} Developers contributed</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-amber-400 rounded-md text-left p-4 shadow-amber-400 cursor-context-menu"
                ref={ref2}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView2 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView2 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2 text-gray-800">{props.stats.newPluginsCount.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1 text-gray-800"><PlusCircle size={28} /> {" "} New Plugins</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-amber-400 rounded-md text-left p-4 shadow-amber-400 cursor-context-menu"
                ref={ref3}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView3 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView3 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2 text-gray-800">{props.stats.updatedPluginsCount.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1 text-gray-800"><RefreshCw size={28} /> {" "} Plugin Updates</div>
              </motion.div>
            </li>
            <li className="text-2xl">
              <motion.div className="bg-amber-400 rounded-md text-left p-4 shadow-amber-400 cursor-context-menu"
                ref={ref4}
                whileHover={{scale: 1.1}}
                style={{
                  transform: isInView4 ? 'translateX(0px)' : 'translateX(-200px)',
                  opacity: isInView4 ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="font-bold text-5xl mb-2 text-gray-800">{props.stats.downloadCount.toLocaleString()}</div>
                <div className="text-2xl flex gap-x-1 text-gray-800"><Download size={28} /> {" "} Plugin Downloads</div>
              </motion.div>
            </li>
          </ul>            
        </div>
        <div className="w-1/2 ml-20 overflow-visible grid content-center">
          <img src='/images/undraw/undraw_community_re_cyrm.svg' className="" />
        </div>
      </div>
    </Section>
  )
}

const MostDownloadedPluginsFromNewPluginsSection = (props) => {
  return (
    <Section {...props} sectionId="most-downloaded-new-plugins" nextSectionId="most-downloaded-plugins" bgClasses="bg-gradient-to-b from-blue-900 to-blue-700" titleClasses="text-amber-400">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
        <ul className="flex flex-col justify-center gap-y-2">
          <li>
            <div className="text-4xl py-4 font-bold text-amber-400">Top New Plugins Released in 2024</div>
          </li>
          {Object.keys(props.mostDownloadedFromNewPlugins).map((pludingId, idx) => {
            return (
              <li key={pludingId} className="text-2xl">
                <div className="flex items-center gap-x-4">
                  <span className="w-8 pr-2">{idx + 1}.</span>
                  <span><a href={`/plugins/${pludingId}`} className="cursor-pointer underline grow mr-8">{props.mostDownloadedFromNewPlugins[pludingId].name}</a></span>
                  <span className="w-32 flex flex-col ml-auto items-center">
                    <span className="text-amber-400">{props.mostDownloadedFromNewPlugins[pludingId].delta.toLocaleString()}</span>
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


const MostDownloadedPluginsSection = (props) => {
  return (
    <Section {...props} sectionId="most-downloaded-plugins" nextSectionId="most-updated-plugins" bgClasses="bg-gradient-to-b from-orange-700 via-amber-700 to-yellow-700" titleClasses="text-amber-400">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
        <ul className="flex flex-col justify-center gap-y-2">
          <li>
            <div className="text-4xl py-4 font-bold text-amber-400">Most downloaded plugins in 2024</div>
          </li>
          {Object.keys(props.mostDownloaded).map((pludingId, idx) => {
            return (
              <li key={pludingId} className="text-2xl">
                <div className="flex items-center gap-x-4">
                  <span className="w-8 pr-2">{idx + 1}.</span>
                  <span><a href={`/plugins/${pludingId}`} className="cursor-pointer underline grow mr-8">{props.mostDownloaded[pludingId].name}</a></span>
                  <span className="w-32 flex flex-col ml-auto items-center">
                    <span className="text-amber-400">{props.mostDownloaded[pludingId].delta.toLocaleString()}</span>
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
    <Section {...props} sectionId="most-updated-plugins" nextSectionId="most-plugins-by-author" bgClasses="bg-gradient-to-b from-amber-300 to-amber-400" titleClasses="text-gray-700">
      <div className="flex flex-col lg:flex-row grow justify-center h-full">
        <ul className="flex flex-col justify-center gap-y-2">
          <li>
            <div className="text-4xl py-4 font-bold text-gray-700">Plugins received most updates in 2024</div>
          </li>
          {Object.keys(props.mostUpdated).map((pludingId, idx) => {
            return (
              <li key={pludingId} className="text-2xl text-gray-700">
                <div className="flex items-center gap-x-4">
                  <span className="w-8 pr-2">{idx + 1}.</span>
                  <span><a href={`/plugins/${pludingId}`} className="cursor-pointer underline grow mr-8">{props.mostUpdated[pludingId].name}</a></span>
                  <span className="w-32 flex flex-col ml-auto items-center">
                    <span className="text-cyan-600">{props.mostUpdated[pludingId].totalUpdated.toLocaleString()}</span>
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
    <Section {...props} sectionId="most-plugins-by-author" nextSectionId={undefined} bgClasses="bg-gradient-to-b from-violet-800 to-violet-600" titleClasses="text-amber-400"> 
      <div className="h-full flex flex-col justify-center items-center">
      <div className="text-center text-4xl my-4 font-bold text-amber-400 mb-12">Developers who created most plugins</div>
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
                  <motion.a href={`https://github.com/${data[1][0].repo.split('/')[0]}`} className="text-2xl text-amber-400 font-bold underline" whileHover={{scale: 1.1}}>{data[0]}</motion.a>
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
      className={`z-30 text-white top-0 ${props.bgClasses ?? "bg-white" }`}
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
          <div id={props.sectionId} className={`text-center text-2xl lg:text-5xl font-bold pt-4 ${props.titleClasses ?? ''}`}>
            <div className="lg:hidden">
              <div className="text-center text-2xl lg:text-5xl font-bold">Obsidian Plugins</div>
              <div className="text-center text-2xl lg:text-5xl font-bold">2024 Wrapped</div>
            </div>
            <div className="hidden lg:block">Obsidian Plugins - 2024 Wrapped</div>
          </div>
        </div>
        {props.children}
        {props.nextSectionId ?
          <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button color="dark" onClick={handleNextSectionClick} ><ArrowDownCircle className={`mr-2 h-5 w-5 ${ !props.nextSectionId ? "collapsed" : ""}`}/> Next</Button>
          </motion.div> : 
          <motion.div className="flex justify-center pb-4" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Button color="dark" onClick={handleNextSectionClick} ><ArrowUpCircle className={`mr-2 h-5 w-5 ${ !props.nextSectionId ? "collapsed" : ""}`}/>Go back to top</Button>
          </motion.div>
        }
      </div>
    </motion.div>
  );
}


export const getStaticProps = async () => {
  const data = require('../../data/wrapped-2024.json');

  return {
    props: { ...data },
  };
}

export default Demo
