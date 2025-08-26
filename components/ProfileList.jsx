'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ProfileItem from './ProfileItem'

const ProfileList = () => {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState([])
  const [savedFilters, setSavedFilters] = useState([])
  const [showAdvancedBuilder, setShowAdvancedBuilder] = useState(false)
  const [sortConfig, setSortConfig] = useState({ field: 'createdAt', direction: 'desc' })
  const [currentFilterGroup, setCurrentFilterGroup] = useState({ logic: 'AND', conditions: [] })
  const [filterStats, setFilterStats] = useState({})
  const router = useRouter()

  // Load saved filters on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedFilters')
    if (saved) {
      try {
        setSavedFilters(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved filters:', error)
      }
    }
  }, [])

  // Comprehensive field definitions with metadata
  const fieldDefinitions = {
    // Basic Info
    name: { type: 'string', label: 'Name', searchable: true, sortable: true },
    age: { type: 'number', label: 'Age', min: 18, max: 100, sortable: true },
    gender: { type: 'enum', label: 'Gender', options: ['Male', 'Female', 'Other'], sortable: true },
    ethnicity: { type: 'string', label: 'Ethnicity', searchable: true, sortable: true },
    
    // Professional Info
    occupation: { 
      type: 'enum', 
      label: 'Occupation', 
      options: ['Student', 'Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Lawyer', 'Healthcare Worker', 'Finance', 'Technology', 'Imam/Religious Leader', 'Other', 'No Occupation'],
      sortable: true 
    },
    education: { 
      type: 'enum', 
      label: 'Education', 
      options: ['High School', 'Some College', "Bachelor's Degree", "Master's Degree", 'PhD/Doctorate', 'Islamic Studies', 'Trade School', 'None', 'Other (please mention in extra info later)'],
      hierarchy: { 'None': 0, 'High School': 1, 'Some College': 2, 'Trade School': 2, "Bachelor's Degree": 3, 'Islamic Studies': 3, "Master's Degree": 4, 'PhD/Doctorate': 5 },
      sortable: true 
    },
    
    // Status Info
    citizenshipStatus: { 
      type: 'enum', 
      label: 'Citizenship Status', 
      options: ['Canadian Citizen', 'Permanent Resident', 'Visa (work/study/tourist/etc)', 'Other (please mention in extra info later)'] 
    },
    maritalHistory: { 
      type: 'enum', 
      label: 'Marital History', 
      options: ['Not Applicable', 'Married', 'Divorced', 'Previously Engaged', 'Other (please mention in extra info later)'] 
    },
    children: { type: 'enum', label: 'Has Children', options: ['Yes', 'No', 'Other (please mention in extra info later)'] },
    relocation: { type: 'boolean', label: 'Willing to Relocate', options: ['Yes', 'No'] },
    revert: { type: 'boolean', label: 'Revert to Islam', options: ['Yes', 'No'] },
    
    // Religious Info
    hijab: { 
      type: 'enum', 
      label: 'Hijab Style', 
      options: ['Niqab', 'Hijab and abaya', 'Hijab', 'No hijab', 'Not Applicable'],
      hierarchy: { 'No hijab': 0, 'Hijab': 1, 'Hijab and abaya': 2, 'Niqab': 3, 'Not Applicable': -1 }
    },
    
    // Complex Fields
    languages: { 
      type: 'array_object', 
      label: 'Languages', 
      subFields: { language: 'string', fluency: 'string' },
      searchable: true 
    },
    
    // Text Fields
    aboutMe: { type: 'text', label: 'About Me', searchable: true },
    lookingForDetails: { type: 'text', label: 'Looking For', searchable: true },
    additionalInfo: { type: 'text', label: 'Additional Info', searchable: true },
    preferences: { type: 'text', label: 'Preferences', searchable: true },
    
    // Contact
    phone: { type: 'string', label: 'Phone Number', searchable: true },
    email: { type: 'email', label: 'Email', searchable: true },
    
    // Metadata
    createdAt: { type: 'date', label: 'Created Date', sortable: true },
    updatedAt: { type: 'date', label: 'Updated Date', sortable: true },
    completed: { type: 'boolean', label: 'Profile Complete', options: ['true', 'false'] }
  }

  // Advanced operators for different field types
  const getOperatorsForType = (type) => {
    const operators = {
      string: [
        { value: 'contains', label: 'Contains', description: 'Field contains text' },
        { value: 'equals', label: 'Equals', description: 'Exact match' },
        { value: 'startsWith', label: 'Starts with', description: 'Begins with text' },
        { value: 'endsWith', label: 'Ends with', description: 'Ends with text' },
        { value: 'regex', label: 'Regex', description: 'Regular expression match' },
        { value: 'isEmpty', label: 'Is Empty', description: 'Field is empty or null' },
        { value: 'isNotEmpty', label: 'Is Not Empty', description: 'Field has value' }
      ],
      number: [
        { value: 'equals', label: 'Equals', description: 'Exact number match' },
        { value: 'gt', label: 'Greater than', description: 'Greater than value' },
        { value: 'gte', label: 'Greater than or equal', description: 'Greater than or equal to value' },
        { value: 'lt', label: 'Less than', description: 'Less than value' },
        { value: 'lte', label: 'Less than or equal', description: 'Less than or equal to value' },
        { value: 'between', label: 'Between', description: 'Between two values (inclusive)' },
        { value: 'notBetween', label: 'Not between', description: 'Outside range' }
      ],
      enum: [
        { value: 'equals', label: 'Is', description: 'Exact match' },
        { value: 'notEquals', label: 'Is not', description: 'Not equal to' },
        { value: 'in', label: 'Is one of', description: 'Matches any selected values' },
        { value: 'notIn', label: 'Is not one of', description: 'Does not match any selected values' }
      ],
      boolean: [
        { value: 'equals', label: 'Is', description: 'True or false' }
      ],
      date: [
        { value: 'equals', label: 'On date', description: 'Exact date match' },
        { value: 'before', label: 'Before', description: 'Before specified date' },
        { value: 'after', label: 'After', description: 'After specified date' },
        { value: 'between', label: 'Between dates', description: 'Between two dates' },
        { value: 'lastDays', label: 'Last X days', description: 'Within last number of days' },
        { value: 'olderThan', label: 'Older than X days', description: 'Older than number of days' }
      ],
      array_object: [
        { value: 'arrayContains', label: 'Contains', description: 'Array contains value' },
        { value: 'arraySize', label: 'Array size', description: 'Number of items in array' },
        { value: 'arrayEmpty', label: 'Is empty', description: 'Array is empty' }
      ],
      text: [
        { value: 'contains', label: 'Contains', description: 'Text contains words' },
        { value: 'containsAll', label: 'Contains all', description: 'Contains all specified words' },
        { value: 'containsAny', label: 'Contains any', description: 'Contains any of the words' },
        { value: 'wordCount', label: 'Word count', description: 'Number of words in text' },
        { value: 'regex', label: 'Regex', description: 'Regular expression match' }
      ]
    }
    return operators[type] || operators.string
  }

  // Sophisticated filtering engine
  const evaluateCondition = useCallback((profile, condition) => {
    const { field, operator, value, caseSensitive = false } = condition
    const fieldDef = fieldDefinitions[field]
    if (!fieldDef) return true

    let fieldValue = profile[field]
    
    // Handle null/undefined values
    if (fieldValue === null || fieldValue === undefined) {
      return ['isEmpty', 'isNotEmpty'].includes(operator) ? operator === 'isEmpty' : false
    }

    // Type-specific value processing
    if (!caseSensitive && typeof fieldValue === 'string') {
      fieldValue = fieldValue.toLowerCase()
    }

    switch (operator) {
      // String operations
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(value).toLowerCase())
      case 'equals':
        return caseSensitive ? fieldValue === value : String(fieldValue).toLowerCase() === String(value).toLowerCase()
      case 'startsWith':
        return String(fieldValue).toLowerCase().startsWith(String(value).toLowerCase())
      case 'endsWith':
        return String(fieldValue).toLowerCase().endsWith(String(value).toLowerCase())
      case 'regex':
        try {
          const flags = caseSensitive ? 'g' : 'gi'
          return new RegExp(value, flags).test(String(fieldValue))
        } catch {
          return false
        }
      case 'isEmpty':
        return !fieldValue || fieldValue === ''
      case 'isNotEmpty':
        return fieldValue && fieldValue !== ''

      // Number operations
      case 'gt':
        return Number(fieldValue) > Number(value)
      case 'gte':
        return Number(fieldValue) >= Number(value)
      case 'lt':
        return Number(fieldValue) < Number(value)
      case 'lte':
        return Number(fieldValue) <= Number(value)
      case 'between':
        return Array.isArray(value) && Number(fieldValue) >= Number(value[0]) && Number(fieldValue) <= Number(value[1])
      case 'notBetween':
        return Array.isArray(value) && (Number(fieldValue) < Number(value[0]) || Number(fieldValue) > Number(value[1]))

      // Enum operations
      case 'notEquals':
        return fieldValue !== value
      case 'in':
        return Array.isArray(value) && value.includes(fieldValue)
      case 'notIn':
        return Array.isArray(value) && !value.includes(fieldValue)

      // Date operations
      case 'before':
        return new Date(fieldValue) < new Date(value)
      case 'after':
        return new Date(fieldValue) > new Date(value)
      case 'lastDays':
        const daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - Number(value))
        return new Date(fieldValue) >= daysAgo
      case 'olderThan':
        const olderThan = new Date()
        olderThan.setDate(olderThan.getDate() - Number(value))
        return new Date(fieldValue) < olderThan

      // Array operations
      case 'arrayContains':
        if (field === 'languages') {
          return Array.isArray(fieldValue) && fieldValue.some(item => 
            item.language && item.language.toLowerCase().includes(String(value).toLowerCase())
          )
        }
        return Array.isArray(fieldValue) && fieldValue.some(item => 
          String(item).toLowerCase().includes(String(value).toLowerCase())
        )
      case 'arraySize':
        return Array.isArray(fieldValue) && fieldValue.length === Number(value)
      case 'arrayEmpty':
        return !Array.isArray(fieldValue) || fieldValue.length === 0

      // Text operations
      case 'containsAll':
        const allWords = String(value).toLowerCase().split(' ').filter(w => w.length > 0)
        const text = String(fieldValue).toLowerCase()
        return allWords.every(word => text.includes(word))
      case 'containsAny':
        const anyWords = String(value).toLowerCase().split(' ').filter(w => w.length > 0)
        const textAny = String(fieldValue).toLowerCase()
        return anyWords.some(word => textAny.includes(word))
      case 'wordCount':
        const words = String(fieldValue).split(/\s+/).filter(w => w.length > 0)
        return words.length === Number(value)

      default:
        return true
    }
  }, [fieldDefinitions])

  // Evaluate filter group with AND/OR logic
  const evaluateFilterGroup = useCallback((profile, group) => {
    if (!group.conditions || group.conditions.length === 0) return true
    
    const results = group.conditions.map(condition => {
      if (condition.type === 'group') {
        return evaluateFilterGroup(profile, condition)
      }
      return evaluateCondition(profile, condition)
    })

    return group.logic === 'OR' ? results.some(Boolean) : results.every(Boolean)
  }, [evaluateCondition])

  // Global text search across searchable fields
  const globalSearch = useCallback((profile, query) => {
    if (!query.trim()) return true
    
    const searchableFields = Object.entries(fieldDefinitions)
      .filter(([_, def]) => def.searchable)
      .map(([field, _]) => field)
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    return searchTerms.every(term => 
      searchableFields.some(field => {
        const value = profile[field]
        if (!value) return false
        
        if (field === 'languages' && Array.isArray(value)) {
          return value.some(lang => lang.language && lang.language.toLowerCase().includes(term))
        }
        
        return String(value).toLowerCase().includes(term)
      })
    )
  }, [fieldDefinitions])

  // Smart sorting with custom logic
  const sortProfiles = useCallback((profiles, config) => {
    if (!config.field) return profiles
    
    return [...profiles].sort((a, b) => {
      const aVal = a[config.field]
      const bVal = b[config.field]
      const fieldDef = fieldDefinitions[config.field]
      
      // Handle null values
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1
      
      let comparison = 0
      
      // Use hierarchy for enum fields if available
      if (fieldDef?.hierarchy) {
        const aHier = fieldDef.hierarchy[aVal] ?? 999
        const bHier = fieldDef.hierarchy[bVal] ?? 999
        comparison = aHier - bHier
      }
      // Date comparison
      else if (fieldDef?.type === 'date') {
        comparison = new Date(aVal).getTime() - new Date(bVal).getTime()
      }
      // Number comparison
      else if (fieldDef?.type === 'number') {
        comparison = Number(aVal) - Number(bVal)
      }
      // String comparison
      else {
        comparison = String(aVal).localeCompare(String(bVal))
      }
      
      return config.direction === 'desc' ? -comparison : comparison
    })
  }, [fieldDefinitions])

  // Calculate filter statistics
  const calculateFilterStats = useCallback((profiles) => {
    const stats = {}
    
    Object.entries(fieldDefinitions).forEach(([field, def]) => {
      if (def.type === 'enum') {
        const counts = {}
        def.options.forEach(option => counts[option] = 0)
        
        profiles.forEach(profile => {
          const value = profile[field]
          if (value && counts.hasOwnProperty(value)) {
            counts[value]++
          }
        })
        
        stats[field] = counts
      } else if (def.type === 'number') {
        const values = profiles.map(p => p[field]).filter(v => v !== null && v !== undefined)
        stats[field] = {
          min: Math.min(...values),
          max: Math.max(...values),
          avg: values.reduce((a, b) => a + b, 0) / values.length
        }
      }
    })
    
    return stats
  }, [fieldDefinitions])

  // Load profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profile')
        if (!response.ok) throw new Error('Failed to fetch profiles')
        const data = await response.json()
        setProfiles(data)
        setFilterStats(calculateFilterStats(data))
      } catch (error) {
        console.error('Error fetching profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [calculateFilterStats])

  // Apply all filters and sorting
  const filteredAndSortedProfiles = useMemo(() => {
    let result = profiles
    
    // Apply global search
    if (searchQuery.trim()) {
      result = result.filter(profile => globalSearch(profile, searchQuery))
    }
    
    // Apply filter groups
    if (currentFilterGroup.conditions.length > 0) {
      result = result.filter(profile => evaluateFilterGroup(profile, currentFilterGroup))
    }
    
    // Apply active quick filters
    if (activeFilters.length > 0) {
      result = result.filter(profile => 
        activeFilters.every(filter => evaluateCondition(profile, filter))
      )
    }
    
    // Apply sorting
    result = sortProfiles(result, sortConfig)
    
    return result
  }, [profiles, searchQuery, currentFilterGroup, activeFilters, sortConfig, globalSearch, evaluateFilterGroup, evaluateCondition, sortProfiles])

  // Quick filter presets
  const quickFilters = [
    { label: 'Young (18-25)', field: 'age', operator: 'between', value: [18, 25] },
    { label: 'Students', field: 'occupation', operator: 'equals', value: 'Student' },
    { label: 'Citizens', field: 'citizenshipStatus', operator: 'equals', value: 'Canadian Citizen' },
    { label: 'Never Married', field: 'maritalHistory', operator: 'equals', value: 'Not Applicable' },
    { label: 'Has Degree', field: 'education', operator: 'in', value: ["Bachelor's Degree", "Master's Degree", "PhD/Doctorate"] },
    { label: 'Wears Hijab', field: 'hijab', operator: 'in', value: ['Hijab', 'Hijab and abaya', 'Niqab'] },
    { label: 'Will Relocate', field: 'relocation', operator: 'equals', value: 'Yes' },
    { label: 'Reverts', field: 'revert', operator: 'equals', value: 'Yes' },
    { label: 'Speaks Arabic', field: 'languages', operator: 'arrayContains', value: 'Arabic' },
    { label: 'Recent Profiles', field: 'createdAt', operator: 'lastDays', value: 30 }
  ]

  // Add condition to filter group
  const addCondition = () => {
    setCurrentFilterGroup(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { field: 'age', operator: 'gte', value: '', caseSensitive: false }
      ]
    }))
  }

  // Remove condition
  const removeCondition = (index) => {
    setCurrentFilterGroup(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }))
  }

  // Update condition
  const updateCondition = (index, updates) => {
    setCurrentFilterGroup(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, ...updates } : condition
      )
    }))
  }

  // Save current filter configuration
  const saveFilter = () => {
    const name = prompt('Enter filter name:')
    if (name) {
      const filterConfig = {
        id: Date.now(),
        name,
        searchQuery,
        filterGroup: currentFilterGroup,
        activeFilters,
        createdAt: new Date().toISOString()
      }
      setSavedFilters(prev => [...prev, filterConfig])
      localStorage.setItem('savedFilters', JSON.stringify([...savedFilters, filterConfig]))
    }
  }

  // Load saved filter
  const loadFilter = (filterConfig) => {
    setSearchQuery(filterConfig.searchQuery || '')
    setCurrentFilterGroup(filterConfig.filterGroup || { logic: 'AND', conditions: [] })
    setActiveFilters(filterConfig.activeFilters || [])
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
    </div>
  )

  return (
    <div className='bg-white py-5 md:px-20'>
      {/* Advanced Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search across all fields... (e.g., 'Engineer Arabic Toronto')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pr-12 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600">
            Searching: {searchQuery.split(' ').map(term => `"${term}"`).join(' + ')}
          </div>
        )}
      </div>

      {/* Quick Filters */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => {
                const isActive = activeFilters.some(f => 
                  f.field === filter.field && f.operator === filter.operator
                )
                if (isActive) {
                  setActiveFilters(prev => prev.filter(f => 
                    !(f.field === filter.field && f.operator === filter.operator)
                  ))
                } else {
                  setActiveFilters(prev => [...prev, filter])
                }
              }}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                activeFilters.some(f => f.field === filter.field && f.operator === filter.operator)
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
              {filterStats[filter.field] && filter.operator === 'equals' && (
                <span className="ml-1 text-xs opacity-75">
                  ({filterStats[filter.field][filter.value] || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Builder */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Advanced Filter Builder</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvancedBuilder(!showAdvancedBuilder)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {showAdvancedBuilder ? 'Hide' : 'Show'} Builder
            </button>
            {(currentFilterGroup.conditions.length > 0 || searchQuery || activeFilters.length > 0) && (
              <button
                onClick={saveFilter}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Filter
              </button>
            )}
          </div>
        </div>

        {showAdvancedBuilder && (
          <div className="space-y-4">
            {/* Logic Selector */}
            <div className="flex items-center gap-4">
              <label className="font-medium">Logic:</label>
              <select
                value={currentFilterGroup.logic}
                onChange={(e) => setCurrentFilterGroup(prev => ({ ...prev, logic: e.target.value }))}
                className="px-3 py-1 border rounded"
              >
                <option value="AND">AND (all conditions must match)</option>
                <option value="OR">OR (any condition can match)</option>
              </select>
            </div>

            {/* Conditions */}
            {currentFilterGroup.conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white rounded border">
                {/* Field Selector */}
                <select
                  value={condition.field}
                  onChange={(e) => updateCondition(index, { 
                    field: e.target.value, 
                    operator: getOperatorsForType(fieldDefinitions[e.target.value]?.type)[0]?.value,
                    value: ''
                  })}
                  className="px-3 py-1 border rounded min-w-[120px]"
                >
                  {Object.entries(fieldDefinitions).map(([field, def]) => (
                    <option key={field} value={field}>{def.label}</option>
                  ))}
                </select>

                {/* Operator Selector */}
                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(index, { operator: e.target.value, value: '' })}
                  className="px-3 py-1 border rounded min-w-[120px]"
                >
                  {getOperatorsForType(fieldDefinitions[condition.field]?.type).map(op => (
                    <option key={op.value} value={op.value} title={op.description}>
                      {op.label}
                    </option>
                  ))}
                </select>

                {/* Value Input */}
                {!['isEmpty', 'isNotEmpty', 'arrayEmpty'].includes(condition.operator) && (
                  <div className="flex-1">
                    {fieldDefinitions[condition.field]?.type === 'enum' && ['in', 'notIn'].includes(condition.operator) ? (
                      <select
                        multiple
                        value={Array.isArray(condition.value) ? condition.value : []}
                        onChange={(e) => updateCondition(index, { 
                          value: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                        className="px-3 py-1 border rounded w-full min-h-[80px]"
                      >
                        {fieldDefinitions[condition.field].options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : fieldDefinitions[condition.field]?.type === 'enum' ? (
                      <select
                        value={condition.value}
                        onChange={(e) => updateCondition(index, { value: e.target.value })}
                        className="px-3 py-1 border rounded w-full"
                      >
                        <option value="">Select...</option>
                        {fieldDefinitions[condition.field].options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : condition.operator === 'between' ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={Array.isArray(condition.value) ? condition.value[0] || '' : ''}
                          onChange={(e) => {
                            const newValue = Array.isArray(condition.value) ? [...condition.value] : ['', '']
                            newValue[0] = e.target.value
                            updateCondition(index, { value: newValue })
                          }}
                          className="px-3 py-1 border rounded w-20"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={Array.isArray(condition.value) ? condition.value[1] || '' : ''}
                          onChange={(e) => {
                            const newValue = Array.isArray(condition.value) ? [...condition.value] : ['', '']
                            newValue[1] = e.target.value
                            updateCondition(index, { value: newValue })
                          }}
                          className="px-3 py-1 border rounded w-20"
                        />
                      </div>
                    ) : (
                      <input
                        type={fieldDefinitions[condition.field]?.type === 'number' ? 'number' : 
                              fieldDefinitions[condition.field]?.type === 'date' ? 'date' : 'text'}
                        placeholder="Enter value..."
                        value={Array.isArray(condition.value) ? condition.value.join(',') : condition.value}
                        onChange={(e) => updateCondition(index, { value: e.target.value })}
                        className="px-3 py-1 border rounded w-full"
                      />
                    )}
                  </div>
                )}

                {/* Case Sensitive Toggle */}
                {fieldDefinitions[condition.field]?.type === 'string' && (
                  <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={condition.caseSensitive}
                      onChange={(e) => updateCondition(index, { caseSensitive: e.target.checked })}
                    />
                    Case sensitive
                  </label>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeCondition(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Add Condition Button */}
            <button
              onClick={addCondition}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Add Condition
            </button>
          </div>
        )}
      </div>

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Saved Filters</h3>
          <div className="flex flex-wrap gap-2">
            {savedFilters.map((filter) => (
              <div key={filter.id} className="flex items-center bg-white border rounded-lg">
                <button
                  onClick={() => loadFilter(filter)}
                  className="px-3 py-2 hover:bg-gray-50 rounded-l-lg"
                >
                  {filter.name}
                  <span className="ml-2 text-xs text-gray-500">
                    {new Date(filter.createdAt).toLocaleDateString()}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setSavedFilters(prev => prev.filter(f => f.id !== filter.id))
                    localStorage.setItem('savedFilters', JSON.stringify(savedFilters.filter(f => f.id !== filter.id)))
                  }}
                  className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-r-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sorting Controls */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Sort by:</label>
        <select
          value={sortConfig.field}
          onChange={(e) => setSortConfig(prev => ({ ...prev, field: e.target.value }))}
          className="px-3 py-2 border rounded"
        >
          <option value="">No sorting</option>
          {Object.entries(fieldDefinitions)
            .filter(([_, def]) => def.sortable)
            .map(([field, def]) => (
              <option key={field} value={field}>{def.label}</option>
            ))}
        </select>
        
        {sortConfig.field && (
          <select
            value={sortConfig.direction}
            onChange={(e) => setSortConfig(prev => ({ ...prev, direction: e.target.value }))}
            className="px-3 py-2 border rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-green-900">
              {filteredAndSortedProfiles.length} of {profiles.length} profiles
            </h3>
            <p className="text-sm text-green-700">
              {searchQuery && `Search: "${searchQuery}" • `}
              {activeFilters.length > 0 && `Quick filters: ${activeFilters.length} • `}
              {currentFilterGroup.conditions.length > 0 && `Advanced: ${currentFilterGroup.conditions.length} conditions • `}
              {sortConfig.field && `Sorted by ${fieldDefinitions[sortConfig.field]?.label} (${sortConfig.direction})`}
            </p>
          </div>
          
          <div className="flex gap-2">
            {/* Clear All Filters */}
            {(searchQuery || activeFilters.length > 0 || currentFilterGroup.conditions.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilters([])
                  setCurrentFilterGroup({ logic: 'AND', conditions: [] })
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear All
              </button>
            )}
            
            {/* Export Results */}
            <button
              onClick={() => {
                const csvContent = [
                  // Headers
                  ['Name', 'Age', 'Gender', 'Occupation', 'Education', 'Ethnicity', 'Phone'].join(','),
                  // Data
                  ...filteredAndSortedProfiles.map(profile => 
                    [profile.name, profile.age, profile.gender, profile.occupation, profile.education, profile.ethnicity, profile.phone]
                      .map(field => `"${field || ''}"`)
                      .join(',')
                  )
                ].join('\n')
                
                const blob = new Blob([csvContent], { type: 'text/csv' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `filtered-profiles-${new Date().toISOString().split('T')[0]}.csv`
                a.click()
                window.URL.revokeObjectURL(url)
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filter Statistics */}
      {filteredAndSortedProfiles.length > 0 && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Age Distribution */}
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-sm mb-2">Age Range</h4>
            <div className="text-sm text-gray-600">
              {Math.min(...filteredAndSortedProfiles.map(p => p.age).filter(Boolean))} - 
              {Math.max(...filteredAndSortedProfiles.map(p => p.age).filter(Boolean))} years
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-sm mb-2">Gender Split</h4>
            <div className="text-sm text-gray-600">
              {Object.entries(
                filteredAndSortedProfiles.reduce((acc, p) => {
                  acc[p.gender] = (acc[p.gender] || 0) + 1
                  return acc
                }, {})
              ).map(([gender, count]) => `${gender}: ${count}`).join(', ')}
            </div>
          </div>

          {/* Education Levels */}
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-sm mb-2">Education</h4>
            <div className="text-sm text-gray-600">
              {Object.entries(
                filteredAndSortedProfiles.reduce((acc, p) => {
                  const edu = p.education?.includes('Degree') ? 'Degree+' : p.education || 'Other'
                  acc[edu] = (acc[edu] || 0) + 1
                  return acc
                }, {})
              ).map(([edu, count]) => `${edu}: ${count}`).join(', ')}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-sm mb-2">Recent</h4>
            <div className="text-sm text-gray-600">
              {filteredAndSortedProfiles.filter(p => {
                const createdDate = new Date(p.createdAt)
                const monthAgo = new Date()
                monthAgo.setMonth(monthAgo.getMonth() - 1)
                return createdDate > monthAgo
              }).length} in last month
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredAndSortedProfiles.length === 0 && profiles.length > 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-400">No profiles match your filters</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria or clearing some filters</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveFilters([])
              setCurrentFilterGroup({ logic: 'AND', conditions: [] })
            }}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && profiles.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-200">No profiles found</h2>
          <p className="text-gray-300 mt-2">Check back later or create a new profile</p>
          <button 
            onClick={() => router.push('/application')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create First Profile
          </button>
        </div>
      )}
      
      {/* Profile Grid */}
      {filteredAndSortedProfiles.length > 0 && (
        <div className="flex flex-wrap justify-center gap-20 gap-y-10 mb-16 xl:mx-24">
          {filteredAndSortedProfiles.map((profile) => (
            <ProfileItem
              key={profile._id}
              id={profile._id}
              name={profile.name}
              age={profile.age}
              gender={profile.gender}
              ethnicity={profile.ethnicity}
              occupation={profile.occupation}
              education={profile.education}
              citizenshipStatus={profile.citizenshipStatus}
              languages={profile.languages}
              phone={profile.phone}
            />
          ))}
        </div>
      )}


    </div>
  )
}

export default ProfileList