import '../../pages/styles/Home.css'
import { useDispatch } from 'react-redux'

const SongItem = ({ song, setUpdateSong, setFormVisible, deleteSongThunk }) => {

    const dispatch = useDispatch()

    
    const handleDeleteSong = () => {
        dispatch(deleteSongThunk(song.id))
    }

    const handleEdit = () => {
        setUpdateSong(song)
        setFormVisible(true)
    }

  return (
    <>
        <tr>
            <td>
                <img src={song.album.image} alt={song.album.name} />
                <div className='table__info'>
                    {song.name} -
                    <div>
                        {song.artists[0].name}
                    </div>
                </div>
            </td>
            <td>{song.album.name}</td>
            <td>{song.album.releaseYear}</td>
            <td>{song.genres[0].name}</td>
            <td>
                <iframe width="200" height="110" src={song.youtubeUrl} title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                </iframe>       
            </td>
            <td>
                <div>
                    <button className='table__btn-delete' onClick={handleDeleteSong}><i className='bx bxs-trash'></i></button>
                </div>
                <div>
                    <button className='table__btn-edit' onClick={handleEdit}><i className='bx bxs-edit-alt'></i></button>
                </div>
            </td>
        </tr>
    </>
  )
}

export default SongItem