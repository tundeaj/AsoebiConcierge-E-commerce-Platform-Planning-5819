import { useState, useEffect } from 'react';
import { guestService } from '../services/supabaseService';
import * as XLSX from 'xlsx';

export const useGuests = (eventId) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchGuests();
    }
  }, [eventId]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const { data, error } = await guestService.getEventGuests(eventId);
      if (error) throw error;
      setGuests(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addGuest = async (guestData) => {
    try {
      const { data, error } = await guestService.createGuest({
        ...guestData,
        event_id: eventId
      });
      if (error) throw error;
      setGuests(prev => [...prev, data[0]]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateGuest = async (id, updates) => {
    try {
      const { data, error } = await guestService.updateGuest(id, updates);
      if (error) throw error;
      setGuests(prev => prev.map(guest => guest.id === id ? { ...guest, ...data[0] } : guest));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteGuest = async (id) => {
    try {
      const { error } = await guestService.deleteGuest(id);
      if (error) throw error;
      setGuests(prev => prev.filter(guest => guest.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const importGuestsFromExcel = async (file) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
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
                  name: name || `Guest ${i + 1}`, // Use placeholder name if missing
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
            
            // Import to database if we have contacts
            if (contacts.length > 0) {
              const { data, error } = await guestService.importGuests(contacts, eventId);
              if (error) throw error;
              
              // Refresh the guest list
              fetchGuests();
            }
            
            resolve({
              data: contacts,
              error: null,
              stats: {
                total: successCount + failedCount,
                success: successCount,
                failed: failedCount
              }
            });
          } catch (err) {
            reject(err);
          }
        };
        
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        
        reader.readAsArrayBuffer(file);
      });
    } catch (err) {
      console.error('Error importing guests:', err);
      throw err;
    }
  };

  const exportGuestsToExcel = () => {
    try {
      // Prepare data for export
      const exportData = guests.map(guest => ({
        Name: guest.name,
        Email: guest.email || '',
        Phone: guest.phone || '',
        Location: guest.location || '',
        'RSVP Status': guest.rsvp_status || 'pending',
        'Asoebi Status': guest.asoebi_status || 'not_ordered'
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Guests');
      
      // Generate file and download
      XLSX.writeFile(workbook, `Event_${eventId}_Guests.xlsx`);
      
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const refetch = fetchGuests;

  return {
    guests,
    loading,
    error,
    refetch,
    addGuest,
    updateGuest,
    deleteGuest,
    importGuestsFromExcel,
    exportGuestsToExcel
  };
};

export default useGuests;