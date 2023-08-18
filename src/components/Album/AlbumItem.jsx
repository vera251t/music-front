
const AlbumItem = ({ album, deleteAlbumById, setUpdateAlbum }) => {
    
    const handleDelete = () => {
        deleteAlbumById('/albums', album.id)
    }
      
    const handleEdit = () => {
        setUpdateAlbum(album)
    }

  return (
    <div>
        <img src={album.image} alt={album.name} />
        <li>
            {album.name}
        </li>
        <li>
            <span>Artist: </span>
            <span>{album.artist.name}</span>
        </li>
        <li>
            <span>Year: </span>
            <span>{album.releaseYear}</span>
        </li>
        <div>
            <button onClick={handleEdit}><i className='bx bx-edit'></i></button>
            <button onClick={handleDelete}><i className='bx bx-trash'></i></button>
        </div>
    </div>
  )
}

export default AlbumItem