import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteSongThunk, postSongThunk, updateSongThunk } from '../../store/slice/songs.slice';

const SongForm = ({ songs }) => {
  const { register, handleSubmit, reset } = useForm();
  const [ updateSong, setUpdateSong ] = useState()
  const [isFormVisible, setFormVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postSongThunk())
    dispatch(deleteSongThunk())
    dispatch((updateSongThunk()))
  }, [])

  useEffect(() => {
    reset(updateSong)
  }, [updateSong, reset])

  const onSubmit = data => {
    if(updateSong) {
        dispatch(updateSongThunk(updateSong.id, data))
        setUpdateSong()
    } else {
        dispatch(postSongThunk(data))
    }
    reset({
      name: '',
      youtubeUrl: '',
      artistId: '',
      albumId: '',
    })
  }
  const handleCloseForm = () => {
    setFormVisible(false)
  }

  const handleShowForm = () => {
    setFormVisible(true)
  }
  return (
    <div>
      <h2>Song form</h2>
      {
        !isFormVisible && <button onClick={handleShowForm}>Create New Song</button>
      }
      {
        isFormVisible && (
          <>
        <div className="form__x" onClick={handleCloseForm}>x</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register('name')} type="text" id="name" />
          </div>
          <div>
            <label htmlFor="youtubeUrl">Song Url</label>
            <input {...register('youtubeUrl')} type="text" id="youtubeUrl" />
          </div>
          <div>
            <h3>Artists</h3>
            <select {...register('artistId')}>
              <option hidden>
                Select artist
              </option>
              {songs?.map((song) => (
                <option key={song.artists[0].artistId} value={song.artists[0].artistId}>
                  {song.artists[0].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Album</h3>
            <select {...register('albumId')}>
              <option hidden>
                Select album
              </option>
              {songs?.map((song) => (
                <option key={song.albumId.id} value={song.albumId.id}>
                  {song.album.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Genres</h3>
            <select {...register('genreId')}>
              <option hidden>
                Select genre
              </option>
              {songs?.map((song) => (
                <option key={song.genres[0].id} value={song.genres[0].id}>
                  {song.genres[0].name}
                </option>
              ))}
            </select>
          </div>
            <button>Save Changes</button>
        </form>
        </>
        )
      }
    </div>
  );
};

export default SongForm;
