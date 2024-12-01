import { Card } from 'flowbite-react';

const PluginEcosystemStats = ({ totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount }) => {
  return (
    <section className="max-w-6xl mx-auto text-gray-800 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mx-2">
        <PluginEcosystemStat title='New Plugins' count={newPluginsCount} href='/new' id="stat-card-new" />
        <PluginEcosystemStat title='Recently Updated Plugins' count={newReleasesCount} href='/updates' id="stat-card-updates" />
        <PluginEcosystemStat title='Total Plugins' count={totalPluginsCount} href='/plugins' id="stat-card-all" />
      </div>
    </section>
  )
}

const PluginEcosystemStat = ({ title, count, href, id }) => {
  return (
    <Card href={href} className="basis-96 md:basis-80 lg:basis-64" id={id}>
      <h5 className="text-7xl font-bold tracking-tight text-violet-900 dark:text-white text-center">
        {count}
      </h5>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-400 text-center"> {title} </p>
    </Card>
  )
}

export default PluginEcosystemStats;
