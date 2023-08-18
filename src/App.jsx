import { useDispatch} from 'react-redux'
import './App.css'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { getAllSongsThunk } from './store/slice/songs.slice'
import Footer from './components/shared/Footer'
import Header from './components/shared/Header'
import GenreModal from './components/Genres/GenreModal'
import Artist from './pages/Artist'
import Album from './pages/Album'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/genres' element={<GenreModal />}/>
        <Route path='/artists' element={<Artist />}/>
        <Route path='albums' element={<Album />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
