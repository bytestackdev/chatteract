declare module 'node-summarizer' {
  export function extractKeywords(text: string): Promise<string[]>;
  export function extractSummary(text: string): Promise<string>;
}
