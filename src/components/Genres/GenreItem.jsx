import React from 'react'

const GenreItem = ({ genre, deleteGenreById, setUpdateGenres }) => {
  const handleDelete = () => {
    deleteGenreById('/genres', genre.id)
  }
  
  const handleEdit = () => {
    setUpdateGenres(genre)
  }
  
  return (
    <article>
      <ul>
        <li>{genre.name}</li>
      </ul>
      <div>
        <button onClick={handleEdit}><i className='bx bx-edit'></i></button>
        <button onClick={handleDelete}><i className='bx bx-trash'></i></button>
      </div>
    </article>
  )
}

export default GenreItem