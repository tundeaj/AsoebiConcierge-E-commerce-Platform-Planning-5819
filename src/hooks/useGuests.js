import { useState, useEffect } from 'react'
import { guestService } from '../services/supabaseService'
import * as XLSX from 'xlsx'

export const useGuests = (eventId) => {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (eventId) {
      fetchGuests()
    }
  }, [eventId])

  const fetchGuests = async () => {
    try {
      setLoading(true)
      const { data, error } = await guestService.getEventGuests(eventId)
      if (error) throw error
      setGuests(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addGuest = async (guestData) => {
    try {
      const { data, error } = await guestService.createGuest({
        ...guestData,
        event_id: eventId
      })
      if (error) throw error
      setGuests(prev => [...prev, data[0]])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const updateGuest = async (id, updates) => {
    try {
      const { data, error } = await guestService.updateGuest(id, updates)
      if (error) throw error
      setGuests(prev => prev.map(guest => guest.id === id ? { ...guest, ...data[0] } : guest))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  const deleteGuest = async (id) => {
    try {
      const { error } = await guestService.deleteGuest(id)
      if (error) throw error
      setGuests(prev => prev.filter(guest => guest.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  const importGuestsFromExcel = async (file) => {
    try {
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
            
            // Convert to JSON with headers
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
            
            // Extract headers from first row
            const headers = jsonData[0]
            
            // Map data to our format
            const guestsData = jsonData.slice(1).map(row => {
              const guest = {}
              headers.forEach((header, index) => {
                const key = header.toLowerCase().replace(/\s+/g, '_')
                // Map Excel columns to our database fields
                if (key === 'name' || key === 'email' || key === 'phone' || key === 'location') {
                  guest[key] = row[index] || '' // Handle undefined values
                } else if (key === 'rsvp_status' || key === 'rsvp') {
                  guest.rsvp_status = row[index] || 'pending'
                } else if (key === 'asoebi_status' || key === 'asoebi') {
                  guest.asoebi_status = row[index] || 'not_ordered'
                }
              })
              
              // Ensure required fields
              if (!guest.name) {
                throw new Error('Name is required for all guests')
              }
              return guest
            })

            // Import to database
            const { data: importedData, error: importError } = await guestService.importGuests(guestsData, eventId)
            if (importError) throw importError
            
            // Update local state
            setGuests(prev => [...prev, ...importedData])
            resolve({ data: importedData, error: null })
          } catch (err) {
            reject({ data: null, error: err })
          }
        }

        reader.onerror = () => {
          reject({ data: null, error: new Error('Failed to read file') })
        }

        reader.readAsArrayBuffer(file)
      })
    } catch (err) {
      return { data: null, error: err }
    }
  }

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
      }))

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Create workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Guests')

      // Generate file and download
      XLSX.writeFile(workbook, `Event_${eventId}_Guests.xlsx`)

      return { error: null }
    } catch (err) {
      return { error: err }
    }
  }

  return {
    guests,
    loading,
    error,
    refetch: fetchGuests,
    addGuest,
    updateGuest,
    deleteGuest,
    importGuestsFromExcel,
    exportGuestsToExcel
  }
}