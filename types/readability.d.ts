declare module 'readability' {
  import { JSDOM } from 'jsdom';
  
  export default class Readability {
    constructor(document: JSDOM['document']);
    parse(): {
      title: string;
      description?: string;
      keywords?: string;
      author?: string;
      content: string;
    };
  }
}
