import './styles/AlbumItem.css'

const AlbumItem = ({ album, deleteAlbumById, setUpdateAlbum, setFormVisible }) => {
    
    const handleDelete = () => {
        deleteAlbumById('/albums', album.id)
    }
      
    const handleEdit = () => {
        setUpdateAlbum(album)
        setFormVisible(true)
    }

  return (
    <section className="album__card">
        <img className="album__image" src={album.image} alt={album.name} />
        <li>
            <span className='album__name'>
                {album.name}
            </span>
        </li>
        <li>
            <span className='album__artist'>Artist:</span>
            <span className='album__artist-name'>{album.artist?.name}</span>
        </li>
        <li>
            <span className='album__year'>Year:</span>
            <span className='album__year-release'>{album.releaseYear}</span>
        </li>
        <div className="album__btn-icon">
            <button className='album__edit' onClick={handleEdit}><i className='bx bx-edit'></i></button>
            <button className='album__delete' onClick={handleDelete}><i className='bx bx-trash'></i></button>
        </div>
    </section>
  )
}

export default AlbumItem