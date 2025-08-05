import React, { useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import DocumentView from './DocumentView';
import { TableRow, HeaderState, FooterState, WatermarkState, ThemeState } from '../types';

interface PrintPreviewModalProps {
  onClose: () => void;
  headerState: HeaderState;
  tableData: TableRow[];
  footerState: FooterState;
  watermarkState: WatermarkState;
  themeState: ThemeState;
}

const CloseIcon: React.FC = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PrintIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);


const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({ onClose, themeState, ...props }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handlePrint = () => {
        const printWindow = iframeRef.current?.contentWindow;
        if (printWindow) {
            printWindow.focus(); // Necessary for some browsers
            printWindow.print();
        }
    };

    // This effect populates the iframe with a static, responsive version of the document
    useEffect(() => {
        const staticMarkup = ReactDOMServer.renderToStaticMarkup(
            <DocumentView 
                isEditable={false} 
                themeState={themeState}
                {...props} 
                // Dummy handlers for static render
                onHeaderChange={()=>{}} 
                onFooterChange={()=>{}} 
                onTableCellChange={()=>{}} 
                onDeleteRow={()=>{}} 
            />
        );

        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument;
        if (!doc) return;

        // The full HTML structure for the iframe's content, with responsive styles
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Print Preview</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Lato:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Serif+Bengali:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    /* --- Base styles for the preview area --- */
                    body { 
                      font-family: ${themeState.fontFamily}; 
                      font-size: ${themeState.fontSize};
                      background-color: #f3f4f6; /* Use a neutral gray background for the preview area */
                      padding: 2rem 0;
                      margin: 0;
                      overflow-y: scroll;
                    }

                    /* --- Style the document container to be responsive within the preview --- */
                    #printable-document {
                        width: 95%;
                        max-width: 1024px;
                        margin: 0 auto !important;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
                        border: 1px solid #ddd !important;
                        background-color: white !important;
                    }

                    /* --- Styles for the ACTUAL printing process --- */
                    @media print {
                        body {
                           background-color: white !important;
                           padding: 0;
                           margin: 0;
                        }
                        #printable-document {
                           width: 100% !important;
                           max-width: none !important;
                           margin: 0 !important;
                           padding: 0 !important;
                           box-shadow: none !important;
                           border: none !important;
                        }
                        @page {
                            margin: 1.5cm;
                        }
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                </style>
            </head>
            <body>
                ${staticMarkup}
            </body>
            </html>
        `);
        doc.close();

    }, [props, themeState]);


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 no-print" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex flex-col bg-gray-200 rounded-lg shadow-xl w-[95vw] h-[95vh] max-w-7xl">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 bg-white border-b border-gray-300 rounded-t-lg flex-shrink-0">
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-900">Print Preview</h2>
                    <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <CloseIcon />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                
                {/* Modal Body with IFrame */}
                <div className="flex-grow bg-gray-200">
                    <iframe ref={iframeRef} title="Printable Document" className="w-full h-full border-0" />
                </div>
                
                {/* Modal Footer */}
                <div className="flex items-center justify-end p-4 space-x-2 bg-white border-t border-gray-200 rounded-b-lg flex-shrink-0">
                    <button onClick={onClose} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                        Cancel
                    </button>
                    <button onClick={handlePrint} type="button" className="flex items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <PrintIcon />
                        Print Document
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrintPreviewModal;