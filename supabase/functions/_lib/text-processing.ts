import pdfParse from 'pdf-parse';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import mammoth from 'mammoth';
import pptxgen from 'pptxgenjs';

// Process PDF files from a blob
const processPDF = async (fileBlob) => {
  const dataBuffer = Buffer.from(await fileBlob.arrayBuffer());
  const data = await pdfParse(dataBuffer);
  return data.text;
};

// Process CSV files from a blob
const processCSV = (fileBlob) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = fileBlob.stream();
    stream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(JSON.stringify(results)))
      .on('error', reject);
  });
};

// Process DOCX files from a blob
const processDOCX = async (fileBlob) => {
  const dataBuffer = Buffer.from(await fileBlob.arrayBuffer());
  return await mammoth.extractRawText({ buffer: dataBuffer });
};

// Process PPTX files from a blob
const processPPTX = async (fileBlob) => {
  const dataBuffer = Buffer.from(await fileBlob.arrayBuffer());
  const tempFilePath = join(tmpdir(), 'temp_pptx.pptx');
  await writeFile(tempFilePath, dataBuffer);
  
  const pptx = new pptxgen();
  pptx.load(tempFilePath);
  
  const slides = pptx.getSlides(); // Adjust this method based on actual usage
  return slides.map(slide => slide.text).join(' ');
};

export { processPDF, processCSV, processDOCX, processPPTX };
