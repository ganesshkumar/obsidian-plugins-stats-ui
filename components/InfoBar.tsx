const InfoBar = ({ title, highlight=true }) => {
  if (highlight) {
    return (
      <span className="relative inline-block text-4xl font-bold cursor-context-menu before:absolute before:left-0 before:-bottom-0 before:h-full before:w-16 before:content-[''] before:border-l-8 before:border-violet-800 bg-violet-50 pl-4 pr-2 py-1 mb-2">
        <h1>{title}</h1>
      </span>
    );
  }
  return (
    <span className="inline-block text-4xl font-bold cursor-context-menu">
      <h1>{title}</h1>
    </span>
  );
}

const Highlight = ({ text }) => {
  const bg = 'bg-violet-300'
  return (
    <span className="relative inline-block text-4xl font-semibold cursor-context-menu">
      <span className={`absolute h-[90%] w-full ${bg} left-[-1px] transform rotate-[2deg] rounded-[20%_25%_20%_24%] -ml-[3px] -mr-[3px]`}></span>
      <h1 className="relative z-10">{text}</h1>
    </span>
  )
};

export default InfoBar;
