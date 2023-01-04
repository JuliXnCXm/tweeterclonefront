import { useState } from 'react'

const useSearcher = () => {
    const [query, setQuery] = useState("")
    const [searching , setSearching ] = useState(false)

    return {
        query,
        setQuery,
        searching,
        setSearching
    }
}

export default useSearcher