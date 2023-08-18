import { configureStore } from "@reduxjs/toolkit";
import songs from './slice/songs.slice'

export default configureStore({
    reducer: {
        songs
    }
})