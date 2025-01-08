import fs from 'fs';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'indexnow.json');

function readLocalFile(filePath) {
  if (!fs.existsSync(filePath)) {
    const initialData = {
      lastSubmission: new Date().toISOString(),
    };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fetchSitemap(url) {
  return fetch(url).then((response) => response.text());
}

function parseSitemap(data) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(data, (err, result) => {
      if (err) {
        reject('Error parsing XML: ' + err);
      } else {
        const urls = result.urlset.url.map((entry) => ({
          loc: entry.loc[0],
          lastmod: entry.lastmod[0],
        }));
        resolve(urls);
      }
    });
  });
}

function filterSitemap(urls, lastSubmission) {
  return urls.filter((url) => new Date(url.lastmod) > new Date(lastSubmission));
}

function submitToIndexNow(filteredUrls) {
  const indexNowUrl = 'https://api.indexnow.org/indexnow';
  const submissionData = {
    host: 'www.obsidianstats.com',
    key: 'bcee69848e584efbac6b1dcbadaa8c64',
    keyLocation:
      'https://www.obsidianstats.com/bcee69848e584efbac6b1dcbadaa8c64.txt',
    urlList: filteredUrls.map((url) => url.loc),
  };
  //console.log(filteredUrls.map(url => url.loc));
  return fetch(indexNowUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData),
  });
}

async function main() {
  try {
    const fileData = readLocalFile(filePath);
    const sitemapData = await fetchSitemap(
      'https://www.obsidianstats.com/sitemap-0.xml'
    );
    const urls = await parseSitemap(sitemapData);
    const filteredUrls = filterSitemap(urls, fileData.lastSubmission);
    await submitToIndexNow(filteredUrls);
    fileData.lastSubmission = new Date().toISOString();
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`${filteredUrls.length} links submitted successfully.`);
  } catch (error) {
    console.error(error);
  }
}

main();
