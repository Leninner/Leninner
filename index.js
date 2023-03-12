import fs from 'fs';
import Parser from 'rss-parser';

const LATEST_ARTICLE_PLACEHOLDER = '%{{latest_article}}%'
const parser = new Parser()

const markdownTemplate = await fs.promises.readFile('./README.tpl', 'utf-8')
const { items } = await parser.parseURL('https://medium.com/feed/@leninner')
const [{ title, link }] = items
const latestArticleMarkdown = `[${title}](${link})`

const newMarkdown = markdownTemplate.replace(LATEST_ARTICLE_PLACEHOLDER, latestArticleMarkdown)
await fs.promises.writeFile('./README.md', newMarkdown)
