import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
  const handleSearch = (e, term) => {
    e.preventDefault()
    fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(response => response.json())
    .then(resData => {
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('Not Found.')
      }
      fetchData()
    }
  }, [search])

  return (
    <div className="App">
      <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <Router>
        <Route exact path="/">
          <SearchBar handleSearch={handleSearch} />
          <Gallery data={data} />
      </Route>
        <Route path="/album/:id">
          <AlbumView term={searchTerm} />
        </Route>
        <Route path="/artist/:id">
          <ArtistView term={searchTerm} />
        </Route>
      </Router>
    </div>
  );
}

export default App;