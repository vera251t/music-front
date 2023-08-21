import './styles/Genre.css'

const GenreItem = ({ genre, deleteGenreById, setUpdateGenres }) => {
  const handleDelete = () => {
    deleteGenreById('/genres', genre.id)
  }
  
  const handleEdit = () => {
    setUpdateGenres(genre)
  }
  
  return (
    <article className='genre__card'>
      <ul>
        <li className='genre__name'>{genre.name}</li>
      </ul>
      <div className='genre__btn'>
        <button className='genre__btn-edit' onClick={handleEdit}><i className='bx bx-edit'></i></button>
        <button className='genre__btn-delete' onClick={handleDelete}><i className='bx bx-trash'></i></button>
      </div>
    </article>
  )
}

export default GenreItem