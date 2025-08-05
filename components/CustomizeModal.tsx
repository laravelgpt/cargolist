import React, { useState } from 'react';
import { HeaderState, FooterState, WatermarkState, ThemeState } from '../types';
import { FONT_OPTIONS } from '../constants';

interface CustomizeModalProps {
  onClose: () => void;
  onSave: (header: HeaderState, footer: FooterState, watermark: WatermarkState, theme: ThemeState) => void;
  onReset: () => void;
  headerState: HeaderState;
  footerState: FooterState;
  watermarkState: WatermarkState;
  themeState: ThemeState;
}

const CloseIcon: React.FC = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CustomizeModal: React.FC<CustomizeModalProps> = ({ onClose, onSave, onReset, headerState, footerState, watermarkState, themeState }) => {
  const [currentHeader, setCurrentHeader] = useState(headerState);
  const [currentFooter, setCurrentFooter] = useState(footerState);
  const [currentWatermark, setCurrentWatermark] = useState(watermarkState);
  const [currentTheme, setCurrentTheme] = useState(themeState);

  const handleHeaderChange = (field: keyof HeaderState, value: string) => {
    setCurrentHeader(prev => ({ ...prev, [field]: value }));
  };

  const handleFooterChange = (field: keyof FooterState, value: string) => {
    setCurrentFooter(prev => ({ ...prev, [field]: value }));
  };
  
  const handleWatermarkChange = <K extends keyof WatermarkState>(field: K, value: WatermarkState[K]) => {
    setCurrentWatermark(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (field: keyof ThemeState, value: string) => {
    setCurrentTheme(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(currentHeader, currentFooter, currentWatermark, currentTheme);
    onClose();
  };
  
  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset all content and settings to their original defaults? This action cannot be undone and will also reset the item list.")) {
      onReset();
      onClose();
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 no-print" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex flex-col bg-gray-100 rounded-lg shadow-xl w-[95vw] max-w-2xl h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-300 rounded-t-lg flex-shrink-0">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900">Customize Document</h2>
          <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <CloseIcon />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body with Form */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto no-scrollbar">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {/* Header Section */}
            <fieldset className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <legend className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Header Information</legend>
              <div>
                <label htmlFor="companyName" className={labelClass}>Company Name</label>
                <input id="companyName" type="text" value={currentHeader.companyName} onChange={(e) => handleHeaderChange('companyName', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="address" className={labelClass}>Address</label>
                <input id="address" type="text" value={currentHeader.address} onChange={(e) => handleHeaderChange('address', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="tagline" className={labelClass}>Tagline</label>
                <input id="tagline" type="text" value={currentHeader.tagline} onChange={(e) => handleHeaderChange('tagline', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="mobile" className={labelClass}>Mobile Numbers</label>
                <input id="mobile" type="text" value={currentHeader.mobile} onChange={(e) => handleHeaderChange('mobile', e.target.value)} className={inputClass} />
              </div>
            </fieldset>

            {/* Title Section */}
            <fieldset className="bg-white p-4 rounded-lg shadow-sm mb-6">
               <legend className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">List Title</legend>
               <div>
                <label htmlFor="listTitle" className={labelClass}>Title Text</label>
                <input id="listTitle" type="text" value={currentHeader.listTitle} onChange={(e) => handleHeaderChange('listTitle', e.target.value)} className={inputClass} />
              </div>
            </fieldset>

             {/* Theme Section */}
            <fieldset className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <legend className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Font & Color</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fontFamily" className={labelClass}>Main Font</label>
                    <select id="fontFamily" value={currentTheme.fontFamily} onChange={(e) => handleThemeChange('fontFamily', e.target.value)} className={inputClass}>
                      {FONT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="headingFontFamily" className={labelClass}>Heading Font</label>
                    <select id="headingFontFamily" value={currentTheme.headingFontFamily} onChange={(e) => handleThemeChange('headingFontFamily', e.target.value)} className={inputClass}>
                       {FONT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
              </div>
              <div className="mt-4">
                <label htmlFor="fontSize" className={labelClass}>Base Font Size</label>
                <div className="flex items-center gap-2">
                    <input id="fontSize" type="number" value={parseInt(currentTheme.fontSize) || 16} onChange={(e) => handleThemeChange('fontSize', `${e.target.value}px`)} className={`${inputClass} mt-0 w-24`} />
                    <span className="text-sm text-gray-600">px</span>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="accentColor" className={labelClass}>Accent Color</label>
                <div className="flex items-center gap-2">
                    <input id="accentColor" type="color" value={currentTheme.accentColor} onChange={(e) => handleThemeChange('accentColor', e.target.value)} className="p-1 h-10 w-10 block bg-white border border-gray-300 cursor-pointer rounded-md shadow-sm" />
                    <input type="text" value={currentTheme.accentColor.toUpperCase()} onChange={(e) => handleThemeChange('accentColor', e.target.value)} className={`${inputClass} mt-0`} />
                </div>
              </div>
            </fieldset>

            {/* Watermark Section */}
            <fieldset className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <legend className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Watermark &amp; Logo Settings</legend>
              <div className="flex items-center justify-between py-2">
                  <label htmlFor="showWatermark" className={labelClass}>Show Background Watermark</label>
                  <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                          type="checkbox" 
                          id="showWatermark" 
                          className="sr-only peer"
                          checked={currentWatermark.show}
                          onChange={(e) => handleWatermarkChange('show', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
              </div>
              <div className="mt-4">
                <label htmlFor="topArcText" className={labelClass}>Top Arc Text (Logo &amp; Watermark)</label>
                <input id="topArcText" type="text" value={currentWatermark.topArcText} onChange={(e) => handleWatermarkChange('topArcText', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="bottomArcText" className={labelClass}>Bottom Arc Text (Logo &amp; Watermark)</label>
                <input id="bottomArcText" type="text" value={currentWatermark.bottomArcText} onChange={(e) => handleWatermarkChange('bottomArcText', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="centralText" className={labelClass}>Central Text (Logo &amp; Watermark)</label>
                <input id="centralText" type="text" value={currentWatermark.centralText} onChange={(e) => handleWatermarkChange('centralText', e.target.value)} className={inputClass} />
              </div>
            </fieldset>

            {/* Footer Section */}
            <fieldset className="bg-white p-4 rounded-lg shadow-sm">
              <legend className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Footer Text</legend>
              <div>
                <label htmlFor="warning" className={labelClass}>Warning Message</label>
                <textarea id="warning" rows={3} value={currentFooter.warning} onChange={(e) => handleFooterChange('warning', e.target.value)} className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="examples" className={labelClass}>Prohibited Items Examples</label>
                <textarea id="examples" rows={2} value={currentFooter.examples} onChange={(e) => handleFooterChange('examples', e.target.value)} className={inputClass} />
              </div>
            </fieldset>
          </form>
        </div>
        
        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 space-x-2 bg-white border-t border-gray-200 rounded-b-lg flex-shrink-0">
          <div>
              <button onClick={handleResetClick} type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Reset to Defaults
              </button>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onClose} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
              Cancel
            </button>
            <button onClick={handleSave} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;