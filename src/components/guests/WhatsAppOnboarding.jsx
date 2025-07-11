import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useGuests } from '../../hooks/useGuests';

const { FiShare2, FiLink, FiCopy, FiUsers, FiDownload, FiUpload, FiCheckCircle, FiInfo, FiCheckSquare, FiChevronDown, FiAlertCircle, FiClock } = FiIcons;

const WhatsAppOnboarding = ({ eventId, eventTitle }) => {
  const [showExportGuide, setShowExportGuide] = useState(false);
  const { importGuestsFromExcel } = useGuests(eventId);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  const [importStats, setImportStats] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError('');
    setImportSuccess(false);

    try {
      const result = await importGuestsFromExcel(file);
      setImportSuccess(true);
      setImportStats(result.stats);
      console.log('Import stats:', result.stats);
    } catch (err) {
      setImportError(err.message || 'Failed to import guests');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Import from WhatsApp</h3>
      <p className="text-gray-600 mb-4">
        Export your WhatsApp group members to Excel/CSV and upload here to add them to your guest list.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls,.csv"
          className="hidden"
        />
        <button
          onClick={handleImportClick}
          disabled={isImporting}
          className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <SafeIcon icon={isImporting ? FiClock : FiUpload} className="w-5 h-5" />
          <span>{isImporting ? 'Importing...' : 'Upload WhatsApp Export'}</span>
        </button>
        <button
          onClick={() => setShowExportGuide(!showExportGuide)}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiDownload} className="w-5 h-5" />
          <span>How to Export</span>
          <SafeIcon
            icon={FiChevronDown}
            className={`w-4 h-4 transform transition-transform ${showExportGuide ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {showExportGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50 rounded-lg mt-4 space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">How to Export from WhatsApp</h3>
                    <p className="text-sm text-gray-700">
                      Follow these steps to export your WhatsApp group members.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Open WhatsApp Web",
                    content: (
                      <>
                        Visit{' '}
                        <a
                          href="https://web.whatsapp.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          web.whatsapp.com
                        </a>{' '}
                        and scan the QR code.
                      </>
                    )
                  },
                  {
                    step: 2,
                    title: "Open your group chat",
                    content: "Click on the WhatsApp group you want to import members from."
                  },
                  {
                    step: 3,
                    title: "Click on group info",
                    content: "Click on the group name at the top of the chat to open group information."
                  },
                  {
                    step: 4,
                    title: "Copy member list",
                    content: "Scroll down to see the list of participants. Select and copy all the members."
                  },
                  {
                    step: 5,
                    title: "Paste into Excel/Google Sheets",
                    content: "Open a new spreadsheet and paste the copied data. Make sure it has Name and Phone columns."
                  },
                  {
                    step: 6,
                    title: "Save as Excel or CSV file",
                    content: "Save your spreadsheet as an Excel (.xlsx) or CSV (.csv) file."
                  },
                  {
                    step: 7,
                    title: "Upload the file",
                    content: 'Return here and click "Upload WhatsApp Export" to import your guests.'
                  }
                ].map(({ step, title, content }) => (
                  <div key={step} className="flex">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-3">
                      {step}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{title}</p>
                      <div className="text-sm text-gray-600">{content}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex">
                  <SafeIcon icon={FiCheckSquare} className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Excel Template Format</h3>
                    <p className="text-sm text-gray-700">
                      Your Excel file should have at least these columns:{' '}
                      <code className="bg-gray-200 px-1 rounded">Name</code> and{' '}
                      <code className="bg-gray-200 px-1 rounded">Phone</code>. Optionally, you can include{' '}
                      <code className="bg-gray-200 px-1 rounded">Email</code> for additional contact information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download Excel Template</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Use our template for the best results
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Error Messages */}
      {importSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>
            {importStats ? (
              <>Successfully imported {importStats.success} guests. {importStats.failed > 0 ? `(${importStats.failed} failed)` : ''}</>
            ) : (
              "Guests imported successfully!"
            )}
          </span>
        </div>
      )}
      
      {importError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>{importError}</span>
        </div>
      )}
    </div>
  );
};

export default WhatsAppOnboarding;