import React, { useState, useEffect, useRef } from 'react';
import { TableRow, HeaderState, FooterState, WatermarkState, ThemeState } from './types';
import { INITIAL_TABLE_DATA, INITIAL_HEADER_STATE, INITIAL_FOOTER_STATE, INITIAL_WATERMARK_STATE, INITIAL_THEME_STATE } from './constants';
import DocumentView from './components/DocumentView';
import PrintPreviewModal from './components/PrintPreviewModal';
import CustomizeModal from './components/CustomizeModal';
import { GoogleGenAI, Type } from '@google/genai';

// --- Type declarations for CDN libraries ---
declare const html2pdf: any;
declare const htmlToImage: any;

// --- Helper Hook for localStorage ---
function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const stickyValue = window.localStorage.getItem(key);
            if (stickyValue) {
                const storedValue = JSON.parse(stickyValue);
                // If default is a non-array object, merge to handle schema changes gracefully.
                if (typeof defaultValue === 'object' && !Array.isArray(defaultValue) && defaultValue !== null) {
                    return { ...defaultValue, ...storedValue };
                }
                return storedValue;
            }
            return defaultValue;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, value]);

    return [value, setValue];
}

// --- SVG Icon Components ---
const AddIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const PrintIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);

const CustomizeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const PdfIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 2a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm8 0v6h6L10 2z"/>
        <path d="M6.5 11.5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm3.5 0a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4zm-5 3a1 1 0 000 2h1a1 1 0 000-2H5z"/>
    </svg>
);

const PngIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

const ImportIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


/**
 * Fetches the Google Fonts CSS stylesheet as a string.
 * This is used to embed fonts directly into exported files (PDF/PNG)
 * to prevent cross-origin loading errors.
 */
async function getFontCss(): Promise<string> {
    try {
        const fontUrl = 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Lato:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Serif+Bengali:wght@400;700&family=Roboto:wght@400;700&display=swap';
        const response = await fetch(fontUrl);
        if (!response.ok) {
            console.error(`Failed to fetch font CSS: ${response.statusText}`);
            return '';
        }
        return await response.text();
    } catch (error) {
        console.error("Error fetching font CSS:", error);
        return '';
    }
}


const App: React.FC = () => {
  const [headerState, setHeaderState] = useStickyState<HeaderState>(INITIAL_HEADER_STATE, 'balaka-header');
  const [tableData, setTableData] = useStickyState<TableRow[]>(INITIAL_TABLE_DATA, 'balaka-tableData');
  const [footerState, setFooterState] = useStickyState<FooterState>(INITIAL_FOOTER_STATE, 'balaka-footer');
  const [watermarkState, setWatermarkState] = useStickyState<WatermarkState>(INITIAL_WATERMARK_STATE, 'balaka-watermark');
  const [themeState, setThemeState] = useStickyState<ThemeState>(INITIAL_THEME_STATE, 'balaka-theme');

  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHeaderChange = (field: keyof typeof headerState, value: string) => {
    setHeaderState(prev => ({...prev, [field]: value}));
  };

  const handleFooterChange = (field: keyof typeof footerState, value: string) => {
    setFooterState(prev => ({...prev, [field]: value}));
  };

  const handleTableCellChange = (id: number, field: keyof TableRow, value: string) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };
  
  const handleAddRow = () => {
    const newId = tableData.length > 0 ? Math.max(...tableData.map(r => r.id)) + 1 : 1;
    const newRow: TableRow = {
      id: newId,
      serial: `${tableData.length + 1}`,
      description: 'New Item',
      quantity: '',
      remarks: ''
    };
    setTableData(prevData => [...prevData, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setTableData(prevData => prevData.filter(row => row.id !== id));
  };
  
  const handleCustomizeSave = (newHeader: HeaderState, newFooter: FooterState, newWatermark: WatermarkState, newTheme: ThemeState) => {
    setHeaderState(newHeader);
    setFooterState(newFooter);
    setWatermarkState(newWatermark);
    setThemeState(newTheme);
  };

  const handleResetAllData = () => {
      setHeaderState(INITIAL_HEADER_STATE);
      setTableData(INITIAL_TABLE_DATA);
      setFooterState(INITIAL_FOOTER_STATE);
      setWatermarkState(INITIAL_WATERMARK_STATE);
      setThemeState(INITIAL_THEME_STATE);
  };

  const handleDownloadPdf = async () => {
      setShowDownloadMenu(false);
      const element = document.getElementById('printable-document');
      if (!element) return;

      try {
          const fontCss = await getFontCss();
          const opt = {
              margin:       [10, 5, 10, 5],
              filename:     'balaka-cargo-list.pdf',
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { 
                  scale: 2, 
                  useCORS: true, 
                  logging: false,
                  onclone: (doc: Document) => {
                      // Inject the fetched font styles into the head of the cloned document
                      const style = doc.createElement('style');
                      style.innerHTML = fontCss;
                      doc.head.appendChild(style);
                      // Hide elements meant only for screen
                      doc.querySelectorAll('.no-print').forEach(el => {
                         if(el instanceof HTMLElement) el.style.display = 'none';
                      });
                  }
              },
              jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };
          
          await html2pdf().from(element).set(opt).save();

      } catch(e) {
          console.error("PDF download failed", e);
          alert("Could not download PDF. See console for details.");
      }
  };

  const handleDownloadPng = async () => {
      setShowDownloadMenu(false);
      const element = document.getElementById('printable-document');
      if (!element) return;

      try {
          const fontCss = await getFontCss();
          const dataUrl = await htmlToImage.toPng(element, { 
              quality: 1,
              pixelRatio: 3,
              backgroundColor: '#ffffff',
              filter: (node: HTMLElement) => !node.classList?.contains('no-print'),
              fontEmbedCss: fontCss,
          });
          
          const link = document.createElement('a');
          link.download = 'balaka-cargo-list.png';
          link.href = dataUrl;
          link.click();

      } catch (error) {
          console.error('Failed to generate PNG', error);
          alert('An error occurred while generating the PNG image. Please check the console for details.');
      }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const base64Data = await fileToBase64(file);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const imagePart = {
        inlineData: {
          mimeType: file.type,
          data: base64Data,
        },
      };

      const textPart = {
        text: "You are an expert data entry assistant for cargo manifests. Analyze the provided image of a cargo list, which may contain text in English or Bengali. For each item on the list, extract the serial number, item description, quantity, and any remarks. Return the data as a valid JSON array of objects. Each object must have four string keys: 'serial', 'description', 'quantity', and 'remarks'. If a value is missing for any field, use an empty string. Ensure the extracted text preserves the original language (e.g., Bengali script). Only return the raw JSON array, without any surrounding text or markdown formatting."
      };
      
      const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            serial: { type: Type.STRING },
            description: { type: Type.STRING },
            quantity: { type: Type.STRING },
            remarks: { type: Type.STRING },
          },
          required: ['serial', 'description', 'quantity', 'remarks']
        }
      };
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
        }
      });
      
      let jsonString = response.text.trim();
      const extractedItems = JSON.parse(jsonString);

      if (!Array.isArray(extractedItems)) {
        throw new Error("AI response is not an array.");
      }
      
      const newRows: TableRow[] = extractedItems.map((item: any, index: number) => {
        return {
          id: index + 1, // Reset IDs since we are replacing the table
          serial: item.serial || `${index + 1}`, // Use extracted serial, or fallback to index
          description: item.description || '',
          quantity: item.quantity || '',
          remarks: item.remarks || '',
        };
      });

      setTableData(newRows);

    } catch (error) {
      console.error('Error importing from image:', error);
      alert('Failed to analyze image. Please ensure the image is clear and try again. Check the console for more details.');
    } finally {
      setIsImporting(false);
      // Reset file input value to allow re-uploading the same file
      if(e.target) e.target.value = '';
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 print:bg-white p-2 sm:p-4 md:p-8 flex items-start md:items-center justify-center print:p-0 print:block" style={{fontFamily: themeState.fontFamily, fontSize: themeState.fontSize}}>
      
      {isImporting && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center z-[100] no-print">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
              <p className="text-white text-lg mt-4">Analyzing image and extracting items...</p>
          </div>
      )}

      <DocumentView
        isEditable={true}
        headerState={headerState}
        tableData={tableData}
        footerState={footerState}
        watermarkState={watermarkState}
        themeState={themeState}
        onHeaderChange={handleHeaderChange}
        onFooterChange={handleFooterChange}
        onTableCellChange={handleTableCellChange}
        onDeleteRow={handleDeleteRow}
      />

      {showPrintPreview && (
        <PrintPreviewModal
          onClose={() => setShowPrintPreview(false)}
          headerState={headerState}
          tableData={tableData}
          footerState={footerState}
          watermarkState={watermarkState}
          themeState={themeState}
        />
      )}
      
      {showCustomizeModal && (
        <CustomizeModal 
            onClose={() => setShowCustomizeModal(false)}
            onSave={handleCustomizeSave}
            onReset={handleResetAllData}
            headerState={headerState}
            footerState={footerState}
            watermarkState={watermarkState}
            themeState={themeState}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
        disabled={isImporting}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col sm:flex-row gap-3 no-print z-50">
          <button onClick={handleImportClick} disabled={isImporting} className="flex items-center justify-center bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:bg-orange-400 disabled:cursor-not-allowed">
              <ImportIcon />
              <span>Import</span>
          </button>
          <button onClick={handleAddRow} className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105">
              <AddIcon />
              <span>Add Item</span>
          </button>
          <button onClick={() => setShowCustomizeModal(true)} className="flex items-center justify-center bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-transform transform hover:scale-105">
              <CustomizeIcon />
              <span>Customize</span>
          </button>
          <button onClick={() => setShowPrintPreview(true)} className="flex items-center justify-center bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105">
              <PrintIcon />
              <span>Print</span>
          </button>
          <div className="relative">
              <button onClick={() => setShowDownloadMenu(prev => !prev)} className="flex items-center justify-center bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 w-full">
                  <DownloadIcon />
                  <span className="ml-1">Download</span>
              </button>
              {showDownloadMenu && (
                  <div className="absolute bottom-full mb-2 right-0 flex flex-col items-stretch gap-2 w-full">
                      <button onClick={handleDownloadPng} className="flex items-center justify-center bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-teal-700">
                          <PngIcon />
                          <span className="ml-2">PNG</span>
                      </button>
                      <button onClick={handleDownloadPdf} className="flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-700">
                          <PdfIcon />
                          <span className="ml-2">PDF</span>
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default App;