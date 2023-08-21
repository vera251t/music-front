import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useForm } from "react-hook-form"
import GenreItem from "./GenreItem"
import './styles/Genre.css'

const Genre = () => {

  const [updateGenres, setUpdateGenres] = useState()

  const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1'
  const [ genres, getAllGenres, createNewGenre, deleteGenreById, updateGenreById ] = useFetch(baseUrl)
  
  useEffect(() => {
    getAllGenres('/genres')
  }, [])
  
  const { register, reset, handleSubmit } = useForm()
  useEffect(() => {
    reset(updateGenres)
  }, [updateGenres])

  const submit = data => {
    if(updateGenres) {
      updateGenreById('/genres', updateGenres.id, data)
      setUpdateGenres()
    } else {
      createNewGenre('/genres', data)
    }
    reset({
      name: ''
    })
  }

  return (
    <>
      <div className="genre__modal">
        <h3 className="genre__title">Add Genres</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="genre__div">
            <label className="genre__form-genre" htmlFor="name">Genre</label>
            <input { ...register('name')} type="text" id="name"placeholder="Enter genre"/>
          </div>
          <button className="genre__add">Add</button>
        </form>
      </div>
      <div className="genre__container">
        {
          genres?.map(genre => (
            <GenreItem 
              key={genre.id}
              genre={genre}
              deleteGenreById={deleteGenreById}
              setUpdateGenres={setUpdateGenres}
            />
          ))
        }
    </div>
    </>
  )
}

export default Genre