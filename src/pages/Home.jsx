import { useDispatch, useSelector } from "react-redux"
import SongItem from "../components/Home/SongItem"
import './styles/Home.css'
import FilterArtist from "../components/Home/FilterArtist"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { deleteSongThunk, postSongThunk, updateSongThunk } from "../store/slice/songs.slice"
import useFetch from "../hooks/useFetch"

const Home = () => {
  
  const songs = useSelector(states => states.songs)
  
  const [allSongs, setAllSongs] = useState(songs);
  const [filteredSongs, setFilteredSongs] = useState(songs);

  useEffect(() => {
    setAllSongs(songs);
    setFilteredSongs(songs);
  }, [songs]);

  const handleFilterArtists = (artistName) => {
    if (artistName) {
      const filtered = allSongs.filter((song) => song.artists[0].name === artistName);
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(allSongs);
    }
  };

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  
  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  const closeAside = () => {
    setIsAsideOpen(false)
  }

  
  const { register, handleSubmit, reset } = useForm();
  const [ updateSong, setUpdateSong ] = useState()
  const [isFormVisible, setFormVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postSongThunk())
    dispatch(deleteSongThunk())
    dispatch((updateSongThunk()))
  }, [])

  useEffect(() => {
    reset(updateSong)
  }, [updateSong])

  const onSubmit = data => {
    if(updateSong) {
        dispatch(updateSongThunk(updateSong.id, data))
        setUpdateSong()
    } else {
        dispatch(postSongThunk(data))
    }
    reset({
      name: '',
      youtubeUrl: '',
      artists: '',
      albumId: '',
      genres: ''
    })
  }

  const handleShowForm = () => {
    setFormVisible(true)
  }

  const handleExitFormSong = () => {
    reset({
      name: '',
      youtubeUrl: '',
      artists: '',
      albumId: '',
      genres: ''
    })
    setFormVisible(false)
    setUpdateSong()
  }

  const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1'
  const [ artists, getAllAtists ] = useFetch(baseUrl)

  useEffect(() => {
    getAllAtists('/artists')
  }, [])

  const baseUrl2 = 'https://song-crud-1ku8.onrender.com/api/v1'
  const [ genres, getAllGenres ] = useFetch(baseUrl2)

  useEffect(() => {
    getAllGenres('/genres')
  }, [])

  const baseUrl3 = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ albums, getAllAlbums ] = useFetch(baseUrl3)

    useEffect(() => {
        getAllAlbums('/albums')
    }, [])

  return (
    <>
      <h1 className="home__title">Songs</h1>
      <button className="home__filter-btn" onClick={toggleAside}><i className='bx bx-filter-alt'></i> Filters</button>
      <aside className={`home__aside ${isAsideOpen ? 'open' : ''}`}>
        <h3 className="home__title">Filters</h3>
        <div onClick={closeAside}><i className='bx bxs-x-circle'></i></div>
        <FilterArtist songs={allSongs} onFilterArtists={handleFilterArtists}/>
      </aside>
      <div>
      {
        !isFormVisible && <button className='song__create' onClick={handleShowForm}>Create New Song</button>
      }
      {
        isFormVisible && (
        <>
          <div className='song__overlay'>
            <form className="song__form" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="song__form-title">Song form</h2>
              <div className="song__form-x" onClick={handleExitFormSong}>x</div>
              <div className="song__section">
                <label className="song__form-label" htmlFor="name">Name</label>
                <input className="song__input" {...register('name')} type="text" id="name" placeholder="Song name"/>
              </div>
              <div className="song__section">
                <label className="song__form-label" htmlFor="youtubeUrl">Song Url</label>
                <input className="song__input" {...register('youtubeUrl')} type="text" id="youtubeUrl" placeholder="URL"/>
                <p className='song__paragraph'>Ve a Youtube | seleciona la canción | Click en compartir | Click en insertar | Copia el link de src</p>
              </div>
              <div>
                <label className='song__form-la' htmlFor="artists">Artists</label>
                <select className="song__form-select" {...register('artists')}>
                  <option hidden>Select artist</option>
                  {artists?.map((artist) => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='song__form-la' htmlFor="albumId">Album</label>
                <select className="song__form-select" {...register('albumId')}>
                  <option hidden>Select album</option>
                  {albums?.map((album) => (
                    <option key={album.id} value={album.id}>{album.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='song__form-la' htmlFor="genres">Genres</label>
                <select className="song__form-select" {...register('genres')}>
                  <option hidden>Select genre</option>
                  {genres?.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
                <button className="song__form-btn">{updateSong ? 'Update' : 'Save Changes'}</button>
            </form>
          </div>
        </>
        )
      }
    </div>
      <div className="table">
          <table className="table__song">
            <thead className="table__head">
              <tr>
                <th>Title</th>
                <th>Album</th>
                <th>Release year</th>
                <th>Genre</th>
                <th>Video</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {
                filteredSongs?.map(song => (
                  <SongItem
                    key={song.id}
                    song={song}
                    setFormVisible={setFormVisible}
                    setUpdateSong={setUpdateSong}
                    deleteSongThunk={deleteSongThunk}
                  />
                ))
              }
            </tbody>
          </table>
      </div>
    </>
  )
}

export default Home