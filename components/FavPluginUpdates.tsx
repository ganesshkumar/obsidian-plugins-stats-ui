import { useEffect, useState } from "react";
import { setupFavorites } from "../utils/favorites";
import InfoBar from "./InfoBar";
import CardAnnotations from "./CardAnnotations";
import moment from "moment";
import { isNotXDaysOld } from "../utils/datetime";
import Image from "next/image";
import { Search, Star, Eye } from "react-feather";

const FavPluginUpdates = (props) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      setupFavorites(setFavorites);
    }, []);
    
    const updatesForFavPlugins = props.newReleases.filter(newRelease => favorites.includes(newRelease.pluginId));
    
    return (
        <>
            {/* Updates for your favorite plugins */}
            { updatesForFavPlugins && (updatesForFavPlugins.length > 0) && 
                <div className='bg-transparent mt-16'>
                <div className='max-w-6xl mx-auto px-2'>
                    <InfoBar title='New Versions of your favorite plugins' />
                    <div>There are {updatesForFavPlugins?.length || 0} new updates from the last 10 days</div>
                    <div className='flex flex-wrap gap-4 pt-5 mx-4'>
                    {updatesForFavPlugins.slice(0, 6).map((newRelease, idx) => {
                        const isFavorite = favorites.includes(newRelease.pluginId);
                        const isTrending = newRelease.zScoreTrending > 10;
                        return (
                        <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer" id={`fav-plugin-update-${idx}`}
                            className='flex-col group rounded-md shrink-0 w-48 px-5 py-2 text-gray-700 transition hover:-translate-y-1 hover:scale-105 border shadow-lg'
                        >
                            <div className='flex flex-none justify-between'>
                            <div className='py-2'>
                                <div className='text-lg font-semibold tracking-wide text-violet-900'>{newRelease.name}</div>
                                <div className='text-sm text-gray-700'>
                                v<span className='text-violet-900 text-base font-semibold'>{newRelease.latestRelease}</span>
                                </div>
                                <div className='text-sm'>released {moment(newRelease.latestReleaseAt).fromNow()}</div>
                                <div className='text-sm'>by {newRelease.author}</div>
                            </div>
                            </div>
                            <CardAnnotations isFavorite={false} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} category='Update' />
                        </a>
                        )
                    })}
                    </div>
                </div>
                </div>
            }

            {favorites && (favorites.length == 0) && <NoFavPlugins />}
            {(!updatesForFavPlugins || updatesForFavPlugins.length === 0) && (favorites && favorites.length > 0) &&
                <div className='bg-transparent mt-16'>
                    <div className='max-w-6xl mx-auto px-2'>
                        <InfoBar title='New Versions of your favorite plugins' />
                        There are no new updates from your favorite plugins in the recent days. Developers must be busy coding up some nice feature for you!
                        <div className="w-full flex justify-center my-2">
                            <Image src='/images/empty.svg' alt={"No new updates for your favorite plugins"} width={256} height={128} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const stepTexts = [
    [<Search size={16} className="text-violet-700" />, 'Find and open your favorite plugin\'s page.'],
    [<Star size={16} className="text-violet-700" />, 'Click the favorite button to mark the plugin as your favorite.'],
    [<Eye size={16} className="text-violet-700" />, 'Any plugin updates for your favorite plugins will appear here.']
]

export const NoFavPlugins = () => {
    const [step, setStep] = useState(0)

    const image = `/images/how-to-favorite-step-${step + 1}.png`;
    const altText = stepTexts[step][1] as string;

    return (
        <div className='bg-transparent mt-16'>
            <div className='max-w-6xl mx-auto px-2'>
                {/* <InfoBar title='New Versions for your favorite plugins' /> */}
                <div className="flex flex-col lg:flex-row flex-between flex-nowrap text-gray-700 gap-y-4">
                    <div className="basis-full lg:basis-1/2 flex items-center pr-12">
                        <ul className="list-none text-lg">
                            <li className="mb-12">
                                <div className="text-3xl font-semibold text-gray-900">Updates from your favorite plugins</div>
                                <div className="texxt-xl mt-2">View the latest updates from all of your favorite plugins in one place.</div>
                            </li>
                            <li className={`flex items-start gap-x-2 rounded my-2 py-1 px-2 cursor-context-menu ${step === 0 && 'bg-gray-200'}`} onClick={() => setStep(0)} onMouseEnter={() => setStep(0)}>
                                <span className="flex items-start pt-1.5">{stepTexts[0][0]}</span> {stepTexts[0][1]}
                            </li>
                            <li className={`flex items-start gap-x-2 rounded my-2 py-1 px-2 cursor-context-menu ${step === 1 && 'bg-gray-200'}`} onClick={() => setStep(1)} onMouseEnter={() => setStep(1)}>
                                <div className="flex items-start pt-1.5">{stepTexts[1][0]}</div> {stepTexts[1][1]}
                            </li>
                            <li className={`flex items-start gap-x-2 rounded my-2 py-1 px-2 cursor-context-menu ${step === 2 && 'bg-gray-200'}`} onClick={() => setStep(2)} onMouseEnter={() => setStep(2)}>
                                <span className="flex items-start pt-1.5">{stepTexts[2][0]}</span> {stepTexts[2][1]}
                            </li>
                        </ul>
                    </div>
                    <div className="basis-full lg:basis-1/2 lg:w-1/2 p-8 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded h-svh shadow-lg">
                        <Image src={image} alt={altText} loading="eager" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} className="rounded border shadow"  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavPluginUpdates;