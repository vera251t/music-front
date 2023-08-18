import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const songsSlice = createSlice({
    name: 'songs',
    initialState: [],
    reducers: {
        setSongG: (state, action) => action.payload,
        addSongG: (state, action) => [...state, action.payload],
        deleteSongG: (state, action) => {
            return state.filter(song => song.id !== action.payload)
        },
        updateSongG: (state, action) => {
            return state.map(song => {
                if(song.id === action.payload.id) {
                    return action.payload
                } else {
                    return song
                }
            })
        }
    }
})

export const { setSongG, addSongG, deleteSongG, updateSongG } = songsSlice.actions

export default songsSlice.reducer

const baseUrl = 'https://song-crud-1ku8.onrender.com/api/v1/songs'

export const getAllSongsThunk = () => (dispatch) => {
    const url = baseUrl
    axios.get(url)
        .then(res => dispatch(setSongG(res.data)))
        .catch(err => console.log(err))
}

export const postSongThunk = (data) => (dispatch) => {
    const url = baseUrl
    axios.post(url, data)
        .then(res => {
            dispatch(addSongG(res.data))
        })
        .catch(err => console.log(err))
}

export const deleteSongThunk = (id) => (dispatch) => {
    const url = `${baseUrl}/${id}`
    axios.delete(url)
        .then(res => {
            console.log(res.data)
            dispatch(deleteSongG(id))
        })
        .catch(err => console.log(err))
}

export const updateSongThunk = (id, data) => (dispatch) => {
    const url = `${baseUrl}/${id}`
    axios.put(url, data)
        .then(res => {
            console.log(res.data)
            dispatch(updateSongG(id))
        })
        .catch(err => console.log(err))

}