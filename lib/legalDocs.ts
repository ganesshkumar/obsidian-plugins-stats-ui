import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const legalDocsDirectory = path.join(process.cwd(), 'legal-docs');

export function getAllLegalDocIds() {
  const fileNames = fs.readdirSync(legalDocsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        legal: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getLegalDocData(id: string) {
  const fullPath = path.join(legalDocsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  };
}
