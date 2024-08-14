import Papa from 'papaparse';
import pdf from 'pdf-parse';

const parseTxtFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const parseCsvFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = Papa.parse(reader.result as string, {
        header: true, // Set to true if you want the first row as headers
        skipEmptyLines: true,
      });
      resolve(JSON.stringify(csvData.data));
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};


export { parseTxtFile, parseCsvFile}