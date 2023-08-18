import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import ArtistItem from "../components/Artists/ArtistItem"
import { useForm } from "react-hook-form"


const Artist = () => {
    const baseUrl = 'https://song-crud-1j5p.onrender.com/api/v1'
    const [ artists, getAllArtist, createNewArtist, deleteArtistById, updateArtistById ] = useFetch(baseUrl)

    useEffect(() => {
        getAllArtist('/artists')
    }, [])
    console.log(artists)
    
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
            youtubeUrl: ''
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
        Artists
        {
            isFormVisible && (

        <div>
            <h3>Artist Form</h3>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="name"></label>
                    <input { ...register('name')} type="text" id="name" placeholder="Name"/>
                </div>
                <div>
                    <label htmlFor="formationYear"></label>
                    <input { ...register('formationYear') } type="number" id="formationYear" placeholder="Formation year"/>
                </div>
                <div>
                    <label htmlFor="country"></label>
                    <input { ...register('country') } type="text" id="country" placeholder="Country"/>
                </div>
                <div>
                    <label htmlFor="image"></label>
                    <input { ...register('image') } type="text" id="image" placeholder="image"/>
                </div>
                <div>
                    <label htmlFor="genres">Genres</label>
                    <select name="genres" id="genres">
                    <option>Select Genre</option>
                        {
                            artists?.map(artist => (
                                <option key={artist.id}>{artist.genres[0].name}</option>
                            ))
                        }
                    </select>
                </div>
                <button onClick={handleCloseForm}>Close</button>
                <button>Save</button>
            </form>
        </div>
            )
        }
        {!isFormVisible && (
            <button onClick={handleShowForm}>Add Artist</button>
        )}
        <ul>
            {
                artists?.map(artist => (
                    <ArtistItem
                        key={artist.id}
                        artist={artist}
                        deleteArtistById={deleteArtistById}
                        setUpdateArtist={setUpdateArtist}
                    />
                ))
            }
        </ul>
    </section>
  )
}

export default Artist