import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import ArtistItem from "../components/Artists/ArtistItem"
import { useForm } from "react-hook-form"
import './styles/Artist.css'

const Artist = () => {
    const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ artists, getAllArtist, createNewArtist, deleteArtistById, updateArtistById ] = useFetch(baseUrl)

    useEffect(() => {
        getAllArtist('/artists')
    }, [])
    
    const baseUrl2 = 'https://song-crud-1ku8.onrender.com/api/v1'
    const [ genres, getAllGenres ] = useFetch(baseUrl2)

    useEffect(() => {
        getAllGenres('/genres')
    }, [])

    const [ updateArtist, setUpdateArtist ] = useState()
    const { register, reset, handleSubmit } = useForm()
    const [isFormVisible, setFormVisible] = useState(false)

    useEffect(() => {
        reset(updateArtist)
    }, [updateArtist])
    
    const submit = data => {
        if(updateArtist) {
            updateArtistById('/artists', updateArtist.id, data)
            setUpdateArtist()
        } else {
            createNewArtist('/artists', data)
        }
        reset({
            name: '',
            formationYear: '',
            country: '',
            image: '',
            genres: ''
        })
    }

    const handleShowForm = () => {
        setFormVisible(true)
    }

    const handleExitForm = () => {
        reset({
            name: '',
            formationYear: '',
            country: '',
            image: '',
            genres: ''
        })
        setFormVisible(false)
        setUpdateArtist()
    }

    return (
    <section>
        <h2 className="artist__title">Artists</h2>
        {
            isFormVisible && (
            <div className="artist__overlay">
                <form className="artist__form" onSubmit={handleSubmit(submit)}>
                    <h3 className="artist__title2">Artist Form</h3>
                    <div className="artist__section">
                        <label className="artist__form-label" htmlFor="name"></label>
                        <input className="artist__input" { ...register('name')} type="text" id="name" placeholder="Name"/>
                    </div>
                    <div className="artist__section">
                        <label className="artist__form-label" htmlFor="formationYear"></label>
                        <input className="artist__input" { ...register('formationYear') } type="number" id="formationYear" placeholder="Formation year"/>
                    </div>
                    <div className="artist__section">
                        <label className="artist__form-label" htmlFor="country"></label>
                        <input className="artist__input" { ...register('country') } type="text" id="country" placeholder="Country"/>
                    </div>
                    <div className="artist__section">
                        <label className="artist__form-label" htmlFor="image"></label>
                        <input className="artist__input" { ...register('image') } type="text" id="image" placeholder="image"/>
                    </div>
                    <div>
                        <label className="artist__form-genre" htmlFor="genres">Genres</label>
                        <select { ...register('genres') } className="artist__form-select">
                        <option hidden>Select Genre</option>
                            {
                                genres?.map(genre => (
                                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className="artist__form-btn" onClick={handleExitForm}>Close</button>
                    <button className="artist__form-save">{updateArtist ? 'Update' : 'Save'}</button>
                </form>
            </div>
            )
        }
        {!isFormVisible && (
            <button className="artist__btn" onClick={handleShowForm}>Add Artist</button>
        )}
        <div>
            <ul className="artist__container">
                {
                    artists?.map(artist => (
                        <ArtistItem
                            key={artist.id}
                            artist={artist}
                            deleteArtistById={deleteArtistById}
                            setUpdateArtist={setUpdateArtist}
                            setFormVisible={setFormVisible}
                        />
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default Artist