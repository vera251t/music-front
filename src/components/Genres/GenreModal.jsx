import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useForm } from "react-hook-form"
import GenreItem from "./GenreItem"

const GenreModal = () => {

  const [updateGenres, setUpdateGenres] = useState()

  const baseUrl = 'http://localhost:8080/api/v1'
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

  const handleExit = () => {
    reset({
        name: ''
    });
    setUpdateGenres()
  }

  return (
    <div>
    <h3>Add Genres</h3>
    <div onClick={handleExit}>x</div>
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="name">Genre</label>
        <input { ...register('name')} type="text" id="name"placeholder="Enter genre"/>
      </div>
      <button>Add</button>
    </form>
    <div>
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
  </div>
  )
}

export default GenreModal