// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './abstractions';

const postsDirectory = path.join(process.cwd(), 'posts');
const postsJsxDirectory = path.join(process.cwd(), 'pages', 'posts');

const isLocal = process.env.NODE_ENV === 'development';

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    } as Post;
  });

  const now = new Date();
  return allPostsData
    .filter((post) => (isLocal ? true : new Date(post.publishedDate) < now))
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );
}

export function getPostData(id: string): Post {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  } as Post;
}

export function getAllPostIds() {
  const isLocal = process.env.NODE_ENV === 'development';
  const now = new Date();
  const fileNames = fs.readdirSync(postsDirectory);
  const jsxFileNames = fs
    .readdirSync(postsJsxDirectory)
    .filter((fileName) => fileName !== '[slug].tsx' && fileName !== 'index.jsx')
    .map((fileName) => fileName.replace(/\.tsx$/, ''));

  return fileNames
    .filter((fileName) => !jsxFileNames.includes(fileName.replace(/\.md$/, '')))
    .filter((fileName) => {
      const date = new Date(fileName.substring(0, 10));
      return isLocal ? true : date.getTime() < now.getTime();
    })
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}
