import { useState, useEffect, Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { createResource as fetchData } from './Components/Helper'
import Spinner from './Components/spinner';


function App() {
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState('Search for music')
  const [ data, setData ] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    if (search) {
        setData(fetchData(search))
    }
  }, [search])

  const renderGallery = () => {
  if (data) {
    return (
      <div>
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>

      </div>
    )
  }
}


  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
)


}

export default App;


