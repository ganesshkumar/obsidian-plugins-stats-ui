import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Datepicker,
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  TimelineTime,
  TimelineBody,
  Button,
} from 'flowbite-react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import moment from 'moment';
import EthicalAd from '../components/EthicalAd';

export function animateScrollTo(targetY, duration = 3000) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;
  let requestId;
  let isCanceled = false;

  function step(timestamp) {
    if (isCanceled) {
      // If canceled, we don't continue
      return;
    }
    if (!startTime) {
      startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentY = startY + distance * progress;
    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestId = window.requestAnimationFrame(step);
    }
  }

  // Start the animation
  requestId = window.requestAnimationFrame(step);

  // Return a function that can cancel the animation
  const stop = () => {
    isCanceled = true;
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
  };

  return stop;
}

const TimelinePage = (props) => {
  const [stopScrolling, setStopScrolling] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [animateFromDate, setAnimateFromDate] = useState(undefined);
  const timelineRef = useRef(null);

  const handleJump = () => {
    if (selectedDate) {
      const availableDates = Object.keys(props.data);
      let dateStr = moment(selectedDate).format('YYYY-MM-DD');
      if (!availableDates.includes(dateStr)) {
        const closestDate =
          availableDates
            .map((date) => {
              const days = moment(date).diff(moment(selectedDate), 'days');
              return {
                date,
                days,
                hasPlugins:
                  (props.data[date].added?.length ?? 0) > 0 ||
                  (props.data[date].removed?.length ?? 0) > 0 ||
                  (props.data[date].changed?.length ?? 0) > 0,
              };
            })
            .filter(({ days, hasPlugins }) => days >= 0 && hasPlugins)
            .sort((a, b) => a.days - b.days)[0]?.date || availableDates[0];
        dateStr = closestDate;
      }
      timelineRef.current.scrollToDate(dateStr);
    }
  };

  const handleAnimateHistory = () => {
    if (stopScrolling) {
      stopScrolling();
      setStopScrolling(null);
    }

    const dateStr = Object.keys(props.data).sort((a, b) =>
      a.localeCompare(b)
    )[0];
    timelineRef.current.jumpToDate(dateStr);
    const targetY = timelineRef.current.getPositionForDate(
      Object.keys(props.data).sort((a, b) => b.localeCompare(a))[0]
    );
    if (targetY != null) {
      const stopFn = animateScrollTo(
        targetY,
        Object.keys(props.data).length * 2000
      );
      setStopScrolling(() => stopFn);
    }
  };

  const handleAnimateHistoryFromDate = () => {
    if (stopScrolling) {
      stopScrolling();
      setStopScrolling(null);
    }

    const availableDates = Object.keys(props.data);
    let dateStr = moment(animateFromDate).format('YYYY-MM-DD');
    if (!availableDates.includes(dateStr)) {
      const closestDate =
        availableDates
          .map((date) => {
            const days = moment(date).diff(moment(animateFromDate), 'days');
            return {
              date,
              days,
              hasPlugins:
                (props.data[date].added?.length ?? 0) > 0 ||
                (props.data[date].removed?.length ?? 0) > 0 ||
                (props.data[date].changed?.length ?? 0) > 0,
            };
          })
          .filter(({ days, hasPlugins }) => days >= 0 && hasPlugins)
          .sort((a, b) => a.days - b.days)[0]?.date || availableDates[0];
      dateStr = closestDate;
    }
    timelineRef.current.jumpToDate(dateStr);

    const lastDate = Object.keys(props.data).sort((a, b) =>
      b.localeCompare(a)
    )[0];
    const targetY = timelineRef.current.getPositionForDate(lastDate);
    if (targetY != null) {
      const stopFn = animateScrollTo(
        targetY,
        Object.keys(props.data).filter(
          (k) => moment(k) >= moment(dateStr) && moment(k) <= moment(lastDate)
        ).length * 2000
      );
      setStopScrolling(() => stopFn);
    }
  };

  const handleStopAnimation = () => {
    if (stopScrolling) {
      stopScrolling();
      setStopScrolling(null);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header {...props} />
        <Navbar current="timeline" />
        <div className="bg-white pt-5 grow">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full relative">
            {/* Sticky Header */}
            <div className="sticky top-1 bg-white p-4 z-10 border border-gray-200 shadow-sm mb-4 rounded-md">
              <h1 className="text-2xl mb-2 font-bold">Plugin Timeline</h1>
              <div className="flex flex-col lg:flex-row justify-between gap-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-2">
                  <Datepicker
                    minDate={moment('2020-10-28').toDate()}
                    maxDate={moment().toDate()}
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                  <Button color="dark" onClick={handleJump}>
                    {' '}
                    Jump{' '}
                  </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <Datepicker
                    minDate={moment('2020-10-28').toDate()}
                    maxDate={moment().toDate()}
                    value={animateFromDate}
                    onChange={(date) => setAnimateFromDate(date)}
                  />
                  {!stopScrolling ? (
                    <>
                      <Button
                        color="dark"
                        onClick={handleAnimateHistoryFromDate}
                      >
                        {' '}
                        Animate From Date
                      </Button>
                      <Button color="dark" onClick={handleAnimateHistory}>
                        {' '}
                        Animate From Beginning
                      </Button>
                    </>
                  ) : (
                    <Button color="dark" onClick={handleStopAnimation}>
                      {' '}
                      Stop Animate{' '}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <EthicalAd
              type="text"
              style="fixed-footer"
              placementId="timeline-text"
            />
            {/* Timeline */}
            <ChangesTimeline ref={timelineRef} data={props.data} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const ChangesTimeline = forwardRef((props: any, ref) => {
  const { data } = props;
  const sortedDates = Object.keys(data).sort((a, b) => b.localeCompare(a));

  const timelineRefs = useRef({});

  useImperativeHandle(ref, () => ({
    scrollToDate(dateStr) {
      const element = timelineRefs.current[dateStr];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    jumpToDate(dateStr) {
      const element = timelineRefs.current[dateStr];
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    },
    getPositionForDate(dateStr) {
      const element = timelineRefs.current[dateStr];
      if (element) {
        const rect = element.getBoundingClientRect();
        // top relative to the page:
        const absoluteY = rect.top + window.scrollY;
        // If you want to account for sticky header, subtract some offset:
        const offset = 80; // px
        return absoluteY - offset;
      }
      return null;
    },
  }));

  return (
    <Timeline className="mx-4">
      {sortedDates.map((dateStr) => {
        let { added = [], removed = [], changed = [] } = data[dateStr];
        if (
          added.length === 0 &&
          removed.length === 0 &&
          changed.length === 0
        ) {
          return null;
        }
        // remove duplicates
        const removeDuplicates = (plugins) => {
          const uniqueObjects = new Map();
          plugins.forEach((plugin) => uniqueObjects.set(plugin.id, plugin));
          return Array.from(uniqueObjects.values());
        };

        added = removeDuplicates(added);
        removed = removeDuplicates(removed);
        changed = removeDuplicates(changed);

        return (
          <TimelineItem
            key={dateStr}
            ref={(el) => {
              timelineRefs.current[dateStr] = el;
            }}
            className="scroll-mt-32"
          >
            <TimelinePoint />
            <TimelineContent>
              <TimelineTime className="text-gray-800 font-semibold text-lg">
                {moment(dateStr).format('DD MMM YYYY')}
              </TimelineTime>
              {/* <TimelineTitle>
                Plugin Changes on {dateStr}
              </TimelineTitle> */}
              <TimelineBody>
                {added.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm">
                      Added Plugins: {added.length}
                    </span>
                    <p className="flex gap-2 flex-wrap">
                      {added.map((plugin) => (
                        <a
                          key={`added-${dateStr}-${plugin.id}`}
                          href={`/plugins/${plugin.id}`}
                          className="px-1 text-gray-700 border-purple-600 bg-purple-100 rounded text-sm"
                        >
                          {plugin.name}
                        </a>
                      ))}
                    </p>
                  </div>
                )}
                {removed.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm">
                      Removed Plugins: {removed.length}{' '}
                    </span>
                    <p className="flex gap-2 flex-wrap">
                      {removed.map((plugin) => (
                        <a
                          key={`removed-${dateStr}-${plugin.id}`}
                          href={`/plugins/${plugin.id}`}
                          className="px-1 text-gray-700 border-red-600 bg-red-100 rounded text-sm"
                        >
                          {plugin.name}
                        </a>
                      ))}
                    </p>
                  </div>
                )}
                {changed.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm">
                      Updated Plugins: {changed.length}{' '}
                    </span>
                    <p className="flex gap-2 flex-wrap">
                      {changed.map((plugin) => (
                        <a
                          key={`changed-${dateStr}-${plugin.id}`}
                          href={`/plugins/${plugin.id}`}
                          className="px-1 text-gray-700 border-yellow-600 bg-yellow-100 rounded text-sm"
                        >
                          {plugin.name}
                        </a>
                      ))}
                    </p>
                  </div>
                )}
              </TimelineBody>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
});

export const getStaticProps = async () => {
  const data = require('../public/data/plugins-history.json');

  const title =
    'Obsidian Plugin Timeline - Track Additions, Removals & Updates';
  const description =
    'Explore a day-by-day record of plugin additions, removals, and updates in one JSON dataset. Ideal for tracking version changes, building timelines, and more.';
  const canonical = 'https://www.obsidianstats.com/timeline';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = null;

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      data,
    },
  };
};

export default TimelinePage;
