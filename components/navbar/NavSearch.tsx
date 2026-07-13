'use client'
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

function NavSearch() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || '',
  )

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`/products?${params.toString()}`)
  }, 500) //Run the function with delay

  //set state value back to empty if we have no value in the searchParams w/ useEffect

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams])

  return (
    <Input
      type='search'
      placeholder='Search product...'
      className='max-w-xs dark:bg-muted'
      onChange={(e) => {
        setSearch(e.target.value) // Control state value
        handleSearch(e.target.value) // Navigate to the product & provide query param
      }}
    />
  )
}

export default NavSearch
