import React from 'react';
import Link from 'next/link'

const itemClasses = (current: string, target: string) => target === current ? 'text-violet-500': ''
const containerClasses = (current: string) => current === 'home' ? 'bg-violet-400' : 'bg-violet-50'

const Header = ({current}) => {
  return (
    <div className={`py-2 ${containerClasses(current)}`}>
      <div className='container w-0 lg:w-1/2 mx-auto flex flex-col items-center align-center'>
        <div className='font-bold text-3xl my-2'>
          <Link href="/"><a>Obsidian Plugin Stats</a></Link>
        </div>
        <div className='flex space-x-4 font-medium'>
          <Link href="/new">
            <a className={itemClasses(current, 'new')}>new</a>
          </Link>
          <div>|</div>
          <Link href="/updates">
            <a className={itemClasses(current, 'updates')}>updates</a>
          </Link>
          <div>|</div>
          <Link href="/trending">
            <a className={itemClasses(current, 'trending')}>trending</a>
          </Link>
          <div>|</div>
          <Link href="/most-downloaded">
            <a className={itemClasses(current, 'most-downloaded')}>most downloaded</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;
