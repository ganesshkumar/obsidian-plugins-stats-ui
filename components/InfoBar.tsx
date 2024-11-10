const InfoBar = ({ title }) => {
  return (
    <h2 className="group relative z-20 scroll-mt-20 text-3xl font-bold text-gray-800 dark:text-white" id="default-table">
      <a aria-hidden="true" tabIndex={-1} target="_blank" rel="noreferrer" href="#default-table">
        {title}
      </a>

      <a href="#"
        aria-label=""
        className="ml-2 text-violet-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary-500">
        #
      </a>
    </h2>
  );
}

export default InfoBar;
