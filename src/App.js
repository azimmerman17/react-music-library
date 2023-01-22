import { useEffect, useState, useRef, Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import Spinner from './components/Spinner'
import { createResource as fetchData } from './helper'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
    {message}
    <Router>
      <Route exact path={'/'}>
        <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
          <SearchBar />
        </SearchContext.Provider>
          <DataContext.Provider value={data}>
            {renderGallery()}
          </DataContext.Provider>
      </Route>
      <Route path="/album/:id">
        <AlbumView />
      </Route>
      <Route path="/artist/:id">
        <ArtistView />
      </Route>
    </Router>
    </div>
  );
}

export default App;