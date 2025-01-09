import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  // Allow normal processing for www.obsidianstats.com
  if (hostname === 'www.obsidianstats.com') {
    return NextResponse.next();
  }
 
  // Only allow /migrate on obsidian-plugin-stats.ganesshkumar.com
  if (hostname === 'obsidian-plugin-stats.ganesshkumar.com') {
    if (pathname === '/migrate' || pathname.startsWith('/_next') || pathname.startsWith('/images')) {
      return NextResponse.next(); 
    }
  }

  // Only allow /migrate on locahost
  if (hostname === 'localhost') {
    if (pathname === '/migrate' || pathname.startsWith('/_next') || pathname.startsWith('/images')) {
      return NextResponse.next(); 
    }
  }

  // Permanent redirect to www.obsidianstats.com
  const url = req.nextUrl.clone();
  url.hostname = 'www.obsidianstats.com';
  url.port = "443";
  return NextResponse.redirect(url, 301);
}
