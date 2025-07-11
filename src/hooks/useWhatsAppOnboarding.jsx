import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';
import { guestService } from '../services/supabaseService';
import * as XLSX from 'xlsx';

export const useWhatsAppOnboarding = (eventId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invitationLink, setInvitationLink] = useState(null);
  const [importStats, setImportStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    processing: false
  });
  
  // Generate invitation link on component mount
  useEffect(() => {
    if (eventId) {
      generateLink();
    }
  }, [eventId]);
  
  // Generate a new invitation link
  const generateLink = async () => {
    try {
      setLoading(true);
      
      // For now, we'll use a simple URL without token verification
      // In production, use linkService to generate a proper token
      const link = `${window.location.origin}/#/guest-rsvp/${eventId}`;
      setInvitationLink(link);
      
    } catch (err) {
      console.error('Error generating link:', err);
      setError(err.message || 'Failed to generate invitation link');
    } finally {
      setLoading(false);
    }
  };
  
  // Process WhatsApp export file
  const processWhatsAppExport = async (file) => {
    try {
      setImportStats(prev => ({ ...prev, processing: true }));
      
      // Read the Excel/CSV file
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            // Parse the file
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // Convert to JSON with headers
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            // Extract headers - if no headers, create default ones
            const headers = jsonData[0] && jsonData[0].length > 0 
              ? jsonData[0].map(h => String(h).toLowerCase().replace(/\s+/g, '_'))
              : ['name', 'phone'];
            
            // Process WhatsApp contacts - start from row 1 if headers exist, otherwise from row 0
            const startRow = jsonData[0] && headers.includes('name') ? 1 : 0;
            
            // Map data to our format
            const contacts = [];
            let successCount = 0;
            let failedCount = 0;
            
            for (let i = startRow; i < jsonData.length; i++) {
              const row = jsonData[i];
              if (!row || row.length === 0) continue;
              
              try {
                // Extract name and phone based on available columns
                let name = '', phone = '';
                
                // If we have headers, use them to find the right columns
                if (headers.includes('name') && headers.includes('phone')) {
                  const nameIndex = headers.indexOf('name');
                  const phoneIndex = headers.indexOf('phone');
                  name = row[nameIndex] || '';
                  phone = row[phoneIndex] || '';
                } else {
                  // Without headers, try to guess - first column is usually name, second is phone
                  name = row[0] || '';
                  phone = row[1] || '';
                  
                  // If only one column and it looks like a phone number, use it as phone
                  if (row.length === 1 && String(row[0]).match(/\+?[0-9\s\-()]+/)) {
                    name = '';
                    phone = row[0];
                  }
                }
                
                // Clean phone number - remove spaces, dashes, etc.
                phone = String(phone).replace(/\s+/g, '').replace(/[()+-]/g, '');
                
                // Add country code if missing (assuming Nigerian numbers)
                if (phone && !phone.startsWith('+')) {
                  if (phone.startsWith('0')) {
                    phone = '+234' + phone.substring(1);
                  } else if (!phone.startsWith('234')) {
                    phone = '+234' + phone;
                  } else {
                    phone = '+' + phone;
                  }
                }
                
                // Skip empty rows
                if (!phone) {
                  failedCount++;
                  continue;
                }
                
                // Create contact object
                const contact = {
                  name: name || `Guest ${i + 1}`,  // Use placeholder name if missing
                  phone,
                  whatsapp_number: phone,
                  event_id: eventId,
                  rsvp_status: 'pending',
                  asoebi_status: 'not_ordered',
                  source: 'whatsapp_import'
                };
                
                contacts.push(contact);
                successCount++;
              } catch (err) {
                console.error('Error processing row:', err, row);
                failedCount++;
              }
            }
            
            // Import to database
            if (contacts.length > 0) {
              const { data, error } = await guestService.importGuests(contacts, eventId);
              if (error) throw error;
            }
            
            setImportStats({
              total: successCount + failedCount,
              success: successCount,
              failed: failedCount,
              processing: false
            });
            
            resolve({ 
              success: true, 
              stats: {
                total: successCount + failedCount,
                imported: successCount,
                failed: failedCount
              }
            });
          } catch (err) {
            setImportStats(prev => ({ ...prev, processing: false }));
            reject(err);
          }
        };
        
        reader.onerror = (err) => {
          setImportStats(prev => ({ ...prev, processing: false }));
          reject(new Error('Failed to read file'));
        };
        
        reader.readAsArrayBuffer(file);
      });
    } catch (err) {
      setImportStats(prev => ({ ...prev, processing: false }));
      setError(err.message || 'Failed to process WhatsApp export');
      throw err;
    }
  };
  
  return {
    loading,
    error,
    invitationLink,
    importStats,
    generateLink,
    processWhatsAppExport
  };
};

export default useWhatsAppOnboarding;