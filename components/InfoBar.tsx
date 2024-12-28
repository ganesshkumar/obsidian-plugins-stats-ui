interface IInfoBarProps {
  title: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Content = ({ title }) => (
  <>
    <a
      aria-hidden="true"
      tabIndex={-1}
      target="_blank"
      rel="noreferrer"
      href="#default-table"
      className="text-gray-800"
    >
      {title}
    </a>

    <a
      href="#"
      aria-label=""
      className="ml-2 text-violet-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary-500"
    >
      #
    </a>
  </>
);

const className = "group relative z-20 scroll-mt-20 text-3xl font-bold text-gray-800 dark:text-white capitalize my-4";
const id = "default-table";

const InfoBar = ({ title, as = "h1" }: IInfoBarProps) => {
  switch (as) {
    case "h6":
      return <h6 id={id} className={className}><Content title={title} /></h6>;
    case "h5":
      return <h5 id={id} className={className}><Content title={title} /></h5>;
    case "h4":
      return <h4 id={id} className={className}><Content title={title} /></h4>;
    case "h3":
      return <h3 id={id} className={className}><Content title={title} /></h3>;
    case "h2":
      return <h2 id={id} className={className}><Content title={title} /></h2>;
    case "h1":
    default:
      return <h1 id={id} className={className}><Content title={title} /></h1>;
  }
};

export default InfoBar;
