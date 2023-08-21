import './styles/ArtistItem.css'

const ArtistItem = ({ artist, deleteArtistById, setUpdateArtist, setFormVisible }) => {

    const handleDelete = () => {
        deleteArtistById('/artists', artist.id)
    }
      
    const handleEdit = () => {
        setUpdateArtist(artist)
        setFormVisible(true)
    }

    return (
    <div className="artist__info">
        <img className="artist__img" src={artist.image} alt={ artist.name } />
        <li>
            <span className="artist__name">
                {artist.name}
            </span>
        </li>
        <li>
            <span className="artist__country">Country:</span>
            <span className="artist__country-info">{artist.country}</span>  
        </li>
        <li>
            <span className="artist__genre">Genres:</span>
            <span className="artist__genre-info">{artist.genres[0]?.name}</span>    
        </li>
        <li>
            <span className="artist__year">Year:</span>
            <span className="artist__year-info">{artist.formationYear}</span>    
        </li>
        <div className="artist__btn-icon">
            <button className="artist__btn-edit" onClick={handleEdit}><i className='bx bx-edit'></i></button>
            <button className="artist__btn-delete" onClick={handleDelete}><i className='bx bx-trash'></i></button>
        </div>
    </div>
  )
}

export default ArtistItem