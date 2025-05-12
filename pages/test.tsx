export default function PluginPromoBanner() {
  return (
    <div>
      <div className="relative bg-[#9C27FF] text-white flex flex-col items-center justify-center px-6 w-[1200px] h-[600px] overflow-hidden">
        {/* Background circle shape on right */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-r from-white to-violet-900 opacity-30 rounded-full translate-x-1/3 translate-y-1/3" />

        {/* Top site name */}
        <div className="font-mono tracking-widest mb-4 text-center">
          OBSIDIANSTATS.COM
        </div>

        {/* Main title */}
        <h1 className="!leading-[1.3] text-3xl md:text-7xl font-bold text-center font-mono">
          46 Plugins that Help <br /> You Publish Your <br /> Obsidian Notes
        </h1>

        {/* Call to action button */}
        <button className="mt-6 bg-amber-400 text-black font-bold px-6 py-2 rounded-full shadow-md transition">
          Read Now
        </button>

        {/* Pattern of Xs in bottom left */}
        <div className="absolute bottom-6 left-6 grid grid-cols-7 gap-y-2 gap-x-8 text-white/60 text-lg font-bold">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i}>×</span>
          ))}
        </div>
      </div>
    </div>
  );
}
