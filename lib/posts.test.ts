import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getSortedPostsData, getPostData, getAllPostIds } from './posts';

// Mock the fs and path modules
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');

describe('posts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });

  describe('getSortedPostsData', () => {
    it('should return sorted posts data', () => {
      const fileNames = ['post1.md', 'post2.md'];
      const fileContent1 =
        '---\ntitle: Test Post 1\npublishedDate: 2023-01-01\n---\nContent';
      const matterResult1 = {
        data: { title: 'Test Post 1', publishedDate: '2023-01-01' },
        content: 'Content',
      };
      const fileContent2 =
        '---\ntitle: Test Post 2\npublishedDate: 2023-01-02\n---\nContent';
      const matterResult2 = {
        data: { title: 'Test Post 2', publishedDate: '2023-01-02' },
        content: 'Content',
      };

      (fs.readdirSync as jest.Mock).mockReturnValue(fileNames);
      (fs.readFileSync as jest.Mock)
        .mockReturnValueOnce(fileContent1)
        .mockReturnValueOnce(fileContent2);
      (matter as jest.Mock)
        .mockReturnValueOnce(matterResult1)
        .mockReturnValueOnce(matterResult2);

      const result = getSortedPostsData();
      expect(result).toEqual([
        { id: 'post2', title: 'Test Post 2', publishedDate: '2023-01-02' },
        { id: 'post1', title: 'Test Post 1', publishedDate: '2023-01-01' },
      ]);
    });
  });

  describe('getPostData', () => {
    it('should return post data', () => {
      const id = 'post1';
      const fileContents =
        '---\ntitle: Test Post\npublishedDate: 2023-01-01\n---\nContent';
      const matterResult = {
        data: { title: 'Test Post', publishedDate: '2023-01-01' },
        content: 'Content',
      };

      (fs.readFileSync as jest.Mock).mockReturnValue(fileContents);
      (matter as jest.Mock).mockReturnValue(matterResult);

      const result = getPostData(id);
      expect(result).toEqual({
        id: 'post1',
        title: 'Test Post',
        publishedDate: '2023-01-01',
        content: 'Content',
      });
    });
  });

  describe('getAllPostIds', () => {
    it('should return all post ids', () => {
      const fileNames = ['post1.md', 'post2.md'];

      (fs.readdirSync as jest.Mock).mockImplementation((dir) => {
        return fileNames;
      });

      const result = getAllPostIds();
      expect(result).toEqual([
        { params: { slug: 'post1' } },
        { params: { slug: 'post2' } },
      ]);
    });
  });
});
