import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import AlbumItem from "../components/Album/AlbumItem"
import { useForm } from "react-hook-form"
import './styles/Album.css'

const Album = () => {

    const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ albums, getAllAlbums, createNewAlbum, deleteAlbumById, updateAlbumById ] = useFetch(baseUrl)

    useEffect(() => {
        getAllAlbums('/albums')
    }, [])

    const baseUrl2 = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ artists, getAllAtists] = useFetch(baseUrl2)

    useEffect(() => {
        getAllAtists('/artists')
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
    
    const handleShowForm = () => {
        setFormVisible(true)
    }

    const handleExit = () => {
        reset({
            name: '',
            releaseYear: '',
            image: '',
            artistId: ''
        })
        setFormVisible(false)
        setUpdateAlbum()
    }
  return (
    <section>
        <h3 className="album__title">Albums</h3>
        {
            isFormVisible && (
            <div className="form__overlay">
                <form className="form__album" onSubmit={handleSubmit(submit)}>
                    <h2 className="form__title-h2">Album form</h2>
                    <div className="form__x" onClick={handleExit}>x</div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="name"></label>
                        <input className="form__input" { ...register('name') } id="name" type="text" placeholder="Album name" />
                    </div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="releaseYear"></label>
                        <input className="form__input" { ...register('releaseYear') } id="releaseYear" type="number" placeholder="Release year" />
                    </div>
                    <div className="form__section">
                        <label className="form__label" htmlFor="image"></label>
                        <input className="form__input" { ...register('image') } id="image" type="text" placeholder="Image url" />
                    </div>
                    <div>
                        <label className="form__input-artist" htmlFor="artistId">Artists</label>
                        <select { ...register('artistId') } className="form__select">
                            <option hidden>Select Artist</option>
                                {
                                    artists?.map(artist => (
                                        <option value={artist.id} key={artist.id}>{artist.name}</option>
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
            <button className="album__btn" onClick={handleShowForm}>Add New Album</button>
        )}
        <div>
            <ul className="album__container">
                {
                    albums?.map(album => (
                        <AlbumItem
                            key={album.id}
                            album={album}
                            deleteAlbumById={deleteAlbumById}
                            setUpdateAlbum={setUpdateAlbum}
                            setFormVisible={setFormVisible}
                        />
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default Album