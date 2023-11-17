// Christopher Dietel, Daryl Illangovan, Chris Pillgreen
// Project 2: VideoStar
// Advanced Web Programming CPTR-456
// 11/10/2023


import { useEffect, useState } from 'react'
import './App.css'
import VideoCard from './components/VideoCard'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Footer from './components/Footer';
import Sort from './components/Sort'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TheaterMode from './components/TheaterMode'

const BASE_ADDRESS = "https://videostar.dacoder.io/"

function App() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFreeFilter, setIsFreeFilter] = useState(false)
  const [isPaidFilter, setIsPaidFilter] = useState(false)
  const [isFavoritesFilter, setIsFavoritesFilter] = useState(false)
  const [less15, setLess15] = useState(false)
  const [great15, setGreat15] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [cart, setCart] = useState(false)
  const [inCart, setInCart] = useState([])


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const response = await fetch(BASE_ADDRESS)
      const data = await response.json()
      setIsLoading(false)
      setVideos(data.map(datum => ({ ...datum, isLiked: false, inCart: false, inTheater: false })))

    })()
  }, [])

  const handleInput = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <NavBar
        setCart={setCart}
        cart={cart}

      />
      <div style={{ display: "flex", justifyContent: "right", position: "sticky", top: "4em", zIndex: cart ? "60": "0" }}>
        <div style={{ width: '30em', height: '50em', position: 'absolute' }} className='cart'>
          {cart && <Cart
            inCart={inCart}
            videos={videos}
            setInCart={setInCart}
            setvideos={setVideos}
            setCart={setCart}
          />}

        </div>
      </div>
      {theaterMode && <TheaterMode
        setTheaterMode={setTheaterMode}
        videos={videos}
        setVideos={setVideos}
        setInCart={setInCart}
        theaterMode={theaterMode}
      />}
    
      <div className='recommendedOuter' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: theaterMode ? "50px" : "" }}>
        <div className='recommendedTitle' style={{ paddingBottom: "20px", width: "29%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1>Featured Videos</h1>
          <hr style={{ width: "100%" }} />
          {isLoading &&
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "10em" }}>
              <CircularProgress size={"5em"} style={{ color: "darkgray" }} />
            </Box>}
        </div>
        <div className='Recommended' style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", boxSizing: "border-box" }}>
          {videos.filter(video => !video.isFree).slice(-3).map(video => <VideoCard videos={videos} setTheaterMode={setTheaterMode} key={video.id} data={video} setVideos={setVideos} setInCart={setInCart} width={"550px"} height={"400px"} />)}
        </div>
        <hr style={{ width: "100%" }} />
      </div>
      <div className='gallery' style={{ display: "flex", paddingTop: "50px", alignItems: "center", justifyContent: "space-between", marginBottom: "3em", }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2em", width: "33%", zIndex: "50" }}>

          <h1>Search</h1>
          <input type="text" value={search} onChange={handleInput} style={{ cursor: "pointer", height: "3em", width: "15em", borderRadius: ".5em" }} />
        </div>
        <div className='title' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", width: "30%" }}>
          <h1 style={{ justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%" }}>Video Gallery</h1>
          <hr style={{ width: "100%" }} />

        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3em", width: "33%", justifyContent: "center"}}>

          <Filter setIsFreeFilter={setIsFreeFilter} 
                  setIsPaidFilter={setIsPaidFilter} 
                  setIsFavoritesFilter={setIsFavoritesFilter} 
                  setLess15={setLess15} 
                  setGreat15={setGreat15} />
          <Sort className="sort" setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
        </div>

      </div>

      {isLoading &&
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "1em" }}>
          <CircularProgress size={"5em"} style={{ color: "darkgray" }} />
        </Box>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", alignItems: "center" }}>
        {videos
          .filter((video) => {
            if (isFreeFilter && isPaidFilter) {
              return true;
            } else if (isFreeFilter) {
              return video.isFree
            } else if (isPaidFilter) {
              return !video.isFree
            } else {
              return true
            }
          })
          .filter(video => isFavoritesFilter ? video.isLiked : true)
          .filter((video) => {
            if (less15 && great15) {
              return true
            } else if (less15) {
              if (video.duration > "00:00:15.0") {
                return false
              } else if (video.duration < "00:00:15.0") {
                return true
              } else {
                return false
              }

            } else if (great15) {
              if (video.duration < "00:00:15.0") {
                return false
              } else if (video.duration > "00:00:15.0") {
                console.log("Greater than 15")
                return true
              } else {
                return true
              }
            } else {
              return true
            }
          })
          .filter(video => video.name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => {
            if (selectedIndex === "Title-ASC") {
              if (a.name < b.name) {
                return -1
              } else if (a.name > b.name) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Title-DEC") {
              if (a.name > b.name) {
                return -1
              } else if (a.name < b.name) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Free") {
              if (a.isFree > b.isFree) {
                return -1
              } else if (a.isFree < b.isFree) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Paid") {
              if (a.isFree < b.isFree) {
                return -1
              } else if (a.isFree > b.isFree) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Favorites") {
              if (a.isLiked > b.isLiked) {
                return -1
              } else if (a.isLiked < b.isLiked) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Length-ASC") {
              if (a.duration < b.duration) {
                return -1
              } else if (a.duration > b.duration) {
                return 1
              } else {
                return 0
              }
            }
            if (selectedIndex === "Length-DEC") {
              if (a.duration > b.duration) {
                return -1
              } else if (a.duration < b.duration) {
                return 1
              } else {
                return 0
              }
            }
          })
          .map(video => <VideoCard key={video.id} 
            data={video} 
            videos={videos} 
            setVideos={setVideos} 
            setInCart={setInCart} 
            setTheaterMode={setTheaterMode} 
            theaterMode={theaterMode} 
            inCart={inCart} 
            width={"550px"} 
            height={"400px"} />)}

      </div>
      {isLoading ? "" : <Footer />}
    </ >

  )
}

export default App
