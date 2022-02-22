import React from 'react';
import Link from 'next/link'

export const itemClasses = (current: string, target: string) => target === current ? 'text-violet-500': ''
const containerClasses = (current: string) => current === 'home' ? 'bg-violet-50' : 'bg-violet-50'

const Content = (props) => {
  const {current, children} = props;
  return (
    <>
      <li className={itemClasses(current, 'new')}>
        <Link href="/new">
          <a>new</a>
        </Link>
      </li>
      <li className={itemClasses(current, 'updates')}>
        <Link href="/updates">
          <a>updates</a>
        </Link>
      </li>
      <li className={itemClasses(current, 'most-downloaded')}>
        <Link href="/most-downloaded">
          <a>most-downloaded</a>
        </Link>
      </li>
      <li className={itemClasses(current, 'trending')}>
        <Link href="/trending">
          <a>trending</a>
        </Link>
      </li>
      <li className={itemClasses(current, 'tags')}>
        <Link href="/tags">
          <a>tags</a>
        </Link>
      </li>
      <li className={itemClasses(current, 'plugins')}>
        <Link href="/plugins">
          <a>all</a>
        </Link>
      </li>
      {children && children.map((child, idx) => <li key={child.idx}>{child}</li>)}
    </>
  )
}

const NavBar = (props) => {
  const {current, children} = props;
  
  return (
    <div className={`lg:py-2 ${containerClasses(current)}`}>
      <div className='container w-full lg:w-1/2 mx-auto flex flex-col items-center align-center'>
        <div className='font-bold text-3xl mt-2'>
          <Link href="/"><a>Obsidian Plugin Stats</a></Link>
        </div>
        <div className="navbar bg-violet-50 rounded-box">
          <div className="navbar-start">
            <div className="dropdown md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </label>
              <ul className="p-2 menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <Content>
                  {children}
                </Content>
              </ul>
            </div>
          </div>
          <div className='navbar-center'>
            <ul className="hidden md:flex p-2 menu menu-horizontal bg-violet-50 rounded-box">
              <Content current={current}>
                {children}
              </Content>
            </ul>
          </div>
          <div className="navbar-end">
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
