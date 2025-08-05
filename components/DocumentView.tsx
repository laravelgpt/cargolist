import React from 'react';
import { TableRow, HeaderState, FooterState, WatermarkState, ThemeState } from '../types';
import EditableCell from './EditableCell';
import HeaderLogo from './HeaderLogo';
import Watermark from './Watermark';

// --- Types ---
interface DocumentViewProps {
  isEditable: boolean;
  headerState: HeaderState;
  tableData: TableRow[];
  footerState: FooterState;
  watermarkState: WatermarkState;
  themeState: ThemeState;
  onHeaderChange: (field: keyof HeaderState, value: string) => void;
  onFooterChange: (field: keyof FooterState, value: string) => void;
  onTableCellChange: (id: number, field: keyof TableRow, value: string) => void;
  onDeleteRow: (id: number) => void;
}

// --- SVG Icon Components ---
const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const DocumentView: React.FC<DocumentViewProps> = ({
  isEditable,
  headerState,
  tableData,
  footerState,
  watermarkState,
  themeState,
  onHeaderChange,
  onFooterChange,
  onTableCellChange,
  onDeleteRow,
}) => {
  const editableCellClass = "p-2 w-full h-full";

  const Cell: React.FC<{value: string, onSave: (val: string) => void, className?: string, tag?: keyof React.JSX.IntrinsicElements, style?: React.CSSProperties}> = 
    isEditable ? EditableCell : ({value, className, tag: Tag = 'div', style}) => <Tag className={className} style={style}>{value}</Tag>;

  const headingStyle: React.CSSProperties = { fontFamily: themeState.headingFontFamily };

  return (
    <main id="printable-document" className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-4 sm:p-6 md:p-10 relative z-0 print:shadow-none print:border-none print:p-0 print:max-w-full">
      {watermarkState.show && <Watermark watermarkState={watermarkState} />}
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row print:flex-row items-center justify-between gap-6 border-b-2 border-gray-300 pb-4 mb-4">
        <HeaderLogo accentColor={themeState.accentColor} logoState={watermarkState} />
        <div className="text-center sm:text-right print:text-right flex-grow">
          <Cell tag="h1" style={{...headingStyle, color: themeState.accentColor}} className="text-2xl sm:text-3xl print:text-2xl font-bold" value={headerState.companyName} onSave={(val) => onHeaderChange('companyName', val)} />
          <Cell tag="p" className="text-sm text-gray-600 mt-1" value={headerState.address} onSave={(val) => onHeaderChange('address', val)} />
          <Cell tag="p" className="text-sm text-gray-600" value={headerState.tagline} onSave={(val) => onHeaderChange('tagline', val)} />
          <Cell tag="p" style={headingStyle} className="text-md font-semibold text-gray-700 mt-2" value={headerState.mobile} onSave={(val) => onHeaderChange('mobile', val)} />
        </div>
      </header>

      {/* List Title */}
      <div className="text-center my-6">
          <Cell tag="h2" style={headingStyle} className="text-xl font-bold text-gray-800 border-2 border-gray-400 inline-block px-4 py-2 rounded-md" value={headerState.listTitle} onSave={(val) => onHeaderChange('listTitle', val)} />
      </div>

      {/* --- DESKTOP TABLE --- */}
      <div className="overflow-x-auto no-scrollbar hidden md:block print:block">
        <table className="w-full text-sm text-left text-gray-700 border border-collapse border-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 print:bg-gray-100">
            <tr>
              <th className="border border-gray-400 px-4 py-2 w-16 text-center font-bold" style={headingStyle}>ক্রমিক</th>
              <th className="border border-gray-400 px-4 py-2 font-bold" style={headingStyle}>বিবরণ</th>
              <th className="border border-gray-400 px-4 py-2 w-32 font-bold" style={headingStyle}>পরিমান</th>
              <th className="border border-gray-400 px-4 py-2 font-bold" style={headingStyle}>মন্তব্য</th>
              {isEditable && <th className="border border-gray-400 px-2 py-2 w-12 text-center no-print"></th>}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="bg-white hover:bg-gray-50/50 group">
                <td className="border border-gray-400 text-center"><Cell className={`${editableCellClass} text-center font-bold`} value={row.serial} onSave={(val) => onTableCellChange(row.id, 'serial', val)} /></td>
                <td className="border border-gray-400"><Cell className={`${editableCellClass} font-bold`} value={row.description} onSave={(val) => onTableCellChange(row.id, 'description', val)} /></td>
                <td className="border border-gray-400"><Cell className={`${editableCellClass} font-bold`} value={row.quantity} onSave={(val) => onTableCellChange(row.id, 'quantity', val)} /></td>
                <td className="border border-gray-400"><Cell className={`${editableCellClass} font-bold`} value={row.remarks} onSave={(val) => onTableCellChange(row.id, 'remarks', val)} /></td>
                {isEditable && 
                  <td className="border border-gray-400 text-center no-print">
                    <button onClick={() => onDeleteRow(row.id)} className="p-2 text-red-500 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-red-100" aria-label="Delete row">
                      <TrashIcon />
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARDS --- */}
      <div className="md:hidden space-y-4 print:hidden">
          {tableData.map((row) => (
              <div key={row.id} className="bg-white p-4 rounded-lg border border-gray-300 relative group">
                  <div className="flex justify-between items-start">
                      <div className="font-bold text-gray-800 pr-10">
                          <Cell className={`${editableCellClass} font-bold`} value={row.description} onSave={(val) => onTableCellChange(row.id, 'description', val)} />
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-1 font-bold" style={headingStyle}>নং:</span>
                          <Cell className={`${editableCellClass} text-sm font-bold`} value={row.serial} onSave={(val) => onTableCellChange(row.id, 'serial', val)} />
                      </div>
                  </div>
                   <div className="mt-2">
                      <label className="text-xs text-gray-500 uppercase font-bold" style={headingStyle}>পরিমান</label>
                      <Cell className={`${editableCellClass} font-bold`} value={row.quantity} onSave={(val) => onTableCellChange(row.id, 'quantity', val)} />
                  </div>
                  <div className="mt-2">
                      <label className="text-xs text-gray-500 uppercase font-bold" style={headingStyle}>মন্তব্য</label>
                      <Cell className={`${editableCellClass} font-bold`} value={row.remarks} onSave={(val) => onTableCellChange(row.id, 'remarks', val)} />
                  </div>
                  {isEditable && 
                    <button onClick={() => onDeleteRow(row.id)} className="absolute top-2 right-2 p-2 text-red-500 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-red-100 no-print" aria-label="Delete row">
                      <TrashIcon />
                    </button>
                  }
              </div>
          ))}
      </div>


      {/* Footer */}
      <footer className="mt-8 pt-4 text-xs font-semibold" style={{color: themeState.accentColor}}>
        <Cell className="p-1" value={footerState.warning} onSave={(val) => onFooterChange('warning', val)} />
        <Cell className="p-1 mt-1 text-gray-600 font-medium" value={footerState.examples} onSave={(val) => onFooterChange('examples', val)} />
      </footer>
    </main>
  );
};

export default DocumentView;