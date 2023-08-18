import { useSelector } from "react-redux"
import SongItem from "../components/Home/SongItem"
import './styles/Home.css'
import FilterArtist from "../components/Home/FilterArtist"
import { useEffect, useState } from "react"
import SongForm from '../components/Home/SongForm'

const Home = () => {
  
  const songs = useSelector(states => states.songs)
  
  const [allSongs, setAllSongs] = useState(songs);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  
  return (
    <>
      <h1>Songs</h1>
      <aside>
        <FilterArtist songs={allSongs} onFilterArtists={handleFilterArtists}/>
      </aside>
      <div>
        <SongForm songs={songs}/>
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
                  <SongItem key={song.id} song={song} />
                ))
              }
            </tbody>
          </table>
      </div>
    </>
  )
}

export default Home