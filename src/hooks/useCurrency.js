import { useState, useEffect } from 'react'
import { currencyService } from '../services/supabaseService'

export const useCurrency = () => {
  const [currencies, setCurrencies] = useState([])
  const [currentCurrency, setCurrentCurrency] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize with default currency (NGN)
  useEffect(() => {
    const storedCurrency = localStorage.getItem('preferredCurrency')
    
    const initCurrency = async () => {
      try {
        setLoading(true)
        // Get all available currencies
        const { data: allCurrencies, error: currenciesError } = await currencyService.getCurrencies()
        if (currenciesError) throw currenciesError
        setCurrencies(allCurrencies || [])
        
        // Set current currency
        let currencyCode = 'NGN' // Default
        if (storedCurrency) {
          // Check if stored currency is valid
          const isValid = allCurrencies.some(c => c.code === storedCurrency)
          if (isValid) {
            currencyCode = storedCurrency
          }
        }
        
        const { data: currency, error: currencyError } = await currencyService.getCurrencyByCode(currencyCode)
        if (currencyError) throw currencyError
        
        setCurrentCurrency(currency)
        localStorage.setItem('preferredCurrency', currency.code)
      } catch (err) {
        setError(err.message)
        // Fallback to a default currency object if there's an error
        setCurrentCurrency({
          code: 'NGN',
          name: 'Nigerian Naira',
          symbol: '₦',
          rate: 1.0
        })
      } finally {
        setLoading(false)
      }
    }
    
    initCurrency()
  }, [])

  const changeCurrency = async (currencyCode) => {
    try {
      setLoading(true)
      const { data, error } = await currencyService.getCurrencyByCode(currencyCode)
      if (error) throw error
      
      setCurrentCurrency(data)
      localStorage.setItem('preferredCurrency', data.code)
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (priceInNGN) => {
    if (!currentCurrency || !priceInNGN) return ''
    
    const convertedPrice = priceInNGN * currentCurrency.rate
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency.code,
      currencyDisplay: 'symbol',
      minimumFractionDigits: currentCurrency.code === 'NGN' ? 0 : 2,
      maximumFractionDigits: currentCurrency.code === 'NGN' ? 0 : 2
    }).format(convertedPrice)
  }

  return {
    currencies,
    currentCurrency,
    loading,
    error,
    changeCurrency,
    formatPrice
  }
}