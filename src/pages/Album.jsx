import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import AlbumItem from "../components/Album/AlbumItem"
import { useForm } from "react-hook-form"

const Album = () => {

    const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ albums, getAllAlbum, createNewAlbum, deleteAlbumById, updateAlbumById ] = useFetch(baseUrl)

    useEffect(() => {
        getAllAlbum('/albums')
    }, [])

    const { register, reset, handleSubmit } = useForm()
    const [updateAlbum, setUpdateAlbum] = useState()
    const [isFormVisible, setFormVisible] = useState(false)

    useEffect(() => {
        reset(updateAlbum)
    }, [updateAlbum])
    
    const submit = data => {
        if(updateAlbum) {
            updateAlbumById('/albums', updateAlbum.id, data)
            setUpdateAlbum()
        } else {
            createNewAlbum('/albums', data)
        }
        reset({
            name: '',
            releaseYear: '',
            image: '',
            artistId: ''
        })
    }

    const handleCloseForm = () => {
        setFormVisible(false)
    }
    
    const handleShowForm = () => {
        setFormVisible(true)
    }
  return (
    <section>
        <h3>Albums</h3>
        {
            isFormVisible && (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <h2>Album form</h2>
                    <div className="form__x" onClick={handleCloseForm}>x</div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="name"></label>
                        <input { ...register('name') } className="form__input" id="name" type="text" placeholder="Album name" />
                    </div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="releaseYear"></label>
                        <input { ...register('releaseYear') } className="form__input" id="releaseYear" type="number" placeholder="Release year" />
                    </div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="image"></label>
                        <input { ...register('image') } className="form__input" id="image" type="text" placeholder="Image url" />
                    </div>
                    <div>
                        <label htmlFor="artistId">Genres</label>
                        <select { ...register('artistId') }>
                            <option hidden>Select Artist</option>
                                {
                                    albums?.map(album => (
                                        <option value={album.id} key={album.id}>{album.artist.name}</option>
                                    ))
                                }
                        </select>
                    </div>
                    <button className="form__btn">{updateAlbum ? 'Update' : 'Save'}</button>
                </form>
            </div>
            )
        }
        {!isFormVisible && (
            <button onClick={handleShowForm}>Add New Album</button>
        )}
        <div>
            <ul>
                {
                    albums?.map(album => (
                        <AlbumItem
                            key={album.id}
                            album={album}
                            deleteAlbumById={deleteAlbumById}
                            setUpdateAlbum={setUpdateAlbum}
                        />
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default Album