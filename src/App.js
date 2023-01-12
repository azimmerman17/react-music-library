import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Searchbar from "./Components/Searchbar";
import Gallery from './Components/Gallery'
import { DataContext } from "./Context/DataContext";
import AlbumView from "./Components/AlbumView";
import ArtistView from './Components/ArtistView'


function App() {
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState('Search for music')
  const [ data, setData ] = useState([])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        const Base_URL = 'https://itunes.apple.com/search?term='
        const encodedSearchTerm = encodeURIComponent(search)
        const url = Base_URL + encodedSearchTerm
        const response = await fetch(url)
        const data = await response.json()
  
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Results not found')
        }
        console.log(data)
  
      }
      fetchData()
    }
  }, [search])

  return (
    <div>
      
      {message}
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Searchbar handleSearch={handleSearch} />
                <Gallery data={data} />
              </>
            }
          />
          <Route path='/album/:albumId' element={<AlbumView />} />
          <Route path='/artist/:artistId' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
