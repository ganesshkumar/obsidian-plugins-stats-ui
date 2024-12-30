// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './abstractions';

const postsDirectory = path.join(process.cwd(), 'posts');
const postsJsxDirectory = path.join(process.cwd(), 'pages', 'posts');

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

  return allPostsData.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
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
  const fileNames = fs.readdirSync(postsDirectory);
  const jsxFileNames = fs
    .readdirSync(postsJsxDirectory)
    .filter((fileName) => fileName !== '[slug].tsx' && fileName !== 'index.jsx')
    .map((fileName) => fileName.replace(/\.tsx$/, ''));

  return fileNames
    .filter((fileName) => !jsxFileNames.includes(fileName.replace(/\.md$/, '')))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}
