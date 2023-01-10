import { useState } from "react"

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <form onSubmit={(e) => handleSearch(e, searchTerm)}>
      <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter a Search term here" />
      <input type='submit' />
    </form>
    
  )
}

export default SearchBar