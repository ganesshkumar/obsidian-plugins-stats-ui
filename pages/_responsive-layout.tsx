import { useState, useEffect } from 'react';

export interface IResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const ResponsiveLayout: React.FC<IResponsiveLayoutProps> = ({
  children,
  sidebar,
}) => {
  const [isLessThanLarge, setIsLessThanLarge] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLessThanLarge(window.innerWidth < 1024); // Tailwind's `md` breakpoint is 768px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!sidebar) {
    return <div className="max-w-4xl mx-auto px-2">{children}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 2xl:flex 2xl:justify-center 2xl:gap-x-24 gap-4 p-4 md:p-6 xl:p-8 min-h-screen">
      {/* Left Spacer */}
      <div
        className={`hidden xl:block xl:col-span-1 2xl:col-span-1 2xl:hidden'}`}
      />

      {/* Main Content */}
      <main
        className={`col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-8 xl:col-span-7 2xl:max-w-4xl 2xl:grow`}
      >
        {children}
        {isLessThanLarge && sidebar}
      </main>

      {/* Sidebar */}
      {!isLessThanLarge && (
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 2xl:col-span-3 2xl:max-w-sm 2xl:min-w-[320px]">
          {sidebar}
        </aside>
      )}

      {/* Right Spacer */}
      <div
        className={`hidden xl:block xl:col-span-1 2xl:col-span-1 2xl:hiddens`}
      />
    </div>
  );
};

export default ResponsiveLayout;
