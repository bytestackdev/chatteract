import axios from 'axios';
import Crawler from 'crawler';
import { load } from 'cheerio';

export const parseWebsite = async (url: string): Promise<string[]> => {
	try {
		const robotsTxt = await axios.get(`${url}/robots.txt`);
		const disallowedPaths = (robotsTxt.data.match(/Disallow:\s*(.*)/g) || []).map((path: string) => path.replace('Disallow: ', ''));

		const links: string[] = [];

		const crawler = new Crawler({
			callback: function (error: unknown, res: any, done?: unknown) {
				if (error) {
					console.log(error);
				} else {
					const $ = res.$;
					const pageLinks = $('a').map((i: number, link: any) => $(link).attr('href')).get();
					const filteredLinks = pageLinks.filter((link: string) => !disallowedPaths.some((path: string) => link.includes(path)));
					links.push(...filteredLinks);
				}
				if (typeof done === 'function') {
					done();
				}
			}
		});

		return new Promise<string[]>((resolve, reject) => {
			crawler.queue([{ uri: url }]);
			crawler.on('drain', () => {
				resolve(links);
			});
			crawler.on('error', reject);
		});
	} catch (error) {
		throw new Error('Failed to parse website');
	}
};

export const extractURLs = async (baseURL: string): Promise<string[]> => {
	try {
		const { data: html } = await axios.get(baseURL);
		const $ = load(html);
		const links: string[] = [];

		$('a').each((index, element) => {
			const href = $(element).attr('href');
			if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
				const absoluteURL = new URL(href, baseURL).href;
				links.push(absoluteURL);
			}
		});

		return links;
	} catch (error) {
		console.error(`Error fetching URL ${baseURL}:`, error);
		return [];
	}
};
