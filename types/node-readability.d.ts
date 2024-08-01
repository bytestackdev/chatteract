declare module 'node-readability' {
  import { Document } from 'jsdom';

  interface ReadabilityOptions {
    // Add any specific options if known
  }

  function readability(document: Document, callback: (err: Error | null, article: any) => void, options?: ReadabilityOptions): void;

  export = readability;
}
