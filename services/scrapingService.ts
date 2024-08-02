import axios from 'axios';
import { load } from 'cheerio';
import nlp from 'compromise';
import { parseWebsite, extractURLs } from './websiteService';

interface Metadata {
  title: string;
  description: string | undefined;
  keywords: string | undefined;
  author: string | undefined;
  url: string;
  dateScraped: string;
  extractedKeywords?: string[];
  summary?: string;
}

interface ScrapeResult {
  text: string;
  metadata: Metadata;
}

const summarizeText = (text: string, numSentences: number = 3): string => {
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');

  // Use a simple heuristic to choose the first few sentences
  return sentences.slice(0, numSentences).join(' ');
};

const extractKeywords = (text: string): string[] => {
  const doc = nlp(text);
  const terms = doc.terms().out('array');
  const frequency: { [term: string]: number } = {};

  terms.forEach((term: any) => {
    if (frequency[term]) {
      frequency[term]++;
    } else {
      frequency[term] = 1;
    }
  });

  // Get the top 10 most frequent terms
  return Object.keys(frequency)
    .sort((a, b) => frequency[b] - frequency[a])
    .slice(0, 10);
};

export const scrapeWebpage = async (url: string): Promise<ScrapeResult[]> => {
  const urls = await extractURLs(url);
  const results: ScrapeResult[] = [];

  for (const link of urls) {
    try {
      const response = await axios.get(link);
      const $ = load(response.data);
      const text = $('p, h1, h2, h3, h4, h5, h6, li, blockquote, span')
        .text()
        .trim()
        .replace(/\s+/g, ' ');

      const metadata: Metadata = {
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content') || undefined,
        keywords: $('meta[name="keywords"]').attr('content') || undefined,
        author: $('meta[name="author"]').attr('content') || undefined,
        url: link,
        dateScraped: new Date().toISOString(),
      };

      // Extract additional NLP-friendly data
      const keywordList = extractKeywords(text);
      const summary = summarizeText(text);

      metadata.extractedKeywords = keywordList;
      metadata.summary = summary;

      results.push({ text, metadata });
    } catch (error) {
      console.error(`Failed to scrape webpage ${link}:`, error);
    }
  }

  return results;
};
