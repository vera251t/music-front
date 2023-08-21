import './styles/FilterArtist.css'

const FilterArtist = ({ songs, onFilterArtists }) => {
  const handleFilterArtists = (artistName) => {
    onFilterArtists(artistName)
  }

  return (
    <div>
      <article>
        <h3 className="filter__artists">Filter by artist</h3>
        <hr />
        <ul className="filters__artist-name">
          <li onClick={() => handleFilterArtists(null)}>Todos los Artistas</li>
          {songs?.map((song) => (
            <li key={song.id} onClick={() => handleFilterArtists(song.artists[0].name)}>
              {song.artists[0].name}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export default FilterArtist;
