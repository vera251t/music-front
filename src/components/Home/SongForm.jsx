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
            <select {...register('artist')}>
              <option>
                Select artist
              </option>
              {songs?.map((song) => (
                <option key={song.artists[0].id} value={song.artists[0].name}>
                  {song.artists[0].name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Album</h3>
            <select {...register('album')}>
              <option>
                Select album
              </option>
              {songs?.map((song) => (
                <option key={song.artists[0].id} value={song.artists[0].name}>
                  {song.album.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Genres</h3>
            <select {...register('genre')}>
              <option>
                Select genre
              </option>
              {songs?.map((song) => (
                <option key={song.artists[0].id} value={song.artists[0].name}>
                  {song.album.name}
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
