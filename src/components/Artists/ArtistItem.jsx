
const ArtistItem = ({ artist, deleteArtistById, setUpdateArtist }) => {
    
    /*<li>
        <span>Genres: </span>
        <span>{artist.genres[0].name}</span>    
    </li>*/

    const handleDelete = () => {
        deleteArtistById('/artists', artist.id)
    }
      
    const handleEdit = () => {
        setUpdateArtist(artist)
    }
    return (
    <div>
        <img src={artist.image} alt={ artist.name } />
        <li>
            { artist.name }
        </li>
        <li>
            <span>Country: </span>
            <span>{artist.country}</span>    
        </li>
        <li>
            <span>Year: </span>
            <span>{artist.formationYear}</span>    
        </li>
        <div>
            <button onClick={handleEdit}><i className='bx bx-edit'></i></button>
            <button onClick={handleDelete}><i className='bx bx-trash'></i></button>
        </div>
    </div>
  )
}

export default ArtistItem