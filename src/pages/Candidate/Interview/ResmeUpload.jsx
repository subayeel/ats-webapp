import React from 'react';
import pdfjsLib from 'pdfjs-dist';
import {MainContainer} from "../../../Global"

function ResmeUpload() {
  return (
    <MainContainer>

    </MainContainer>
  )
}

export default ResmeUpload

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
  
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const resumeText = await extractTextFromPDF(pdf);
  
      // Parse the resumeText and extract relevant information
      // Populate the form fields with the extracted data
    };
  
    fileReader.readAsArrayBuffer(file);
  };

  const extractTextFromPDF = async (pdf) => {
    let resumeText = '';
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
  
      content.items.forEach((item) => {
        resumeText += item.str + ' ';
      });
    }
  
    return resumeText;
  };