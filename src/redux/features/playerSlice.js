import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  currentSongs: [],
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      const { idx, song, fetchedSongs } = action.payload;

      state.currentIndex = idx;
      state.activeSong = song;
      state.isActive = true;
      state.currentSongs = fetchedSongs;
    },

    nextSong: (state, action) => {
      const nextIndex = state.currentIndex + 1;

      if (nextIndex < state.currentIndex.length) {
        state.currentIndex = nextIndex;
        state.activeSong = state.currentSongs[nextIndex];
      }
    },

    prevSong: (state, action) => {
      const prevIndex = state.currentIndex - 1;

      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.activeSong = state.currentSongs[prevIndex];
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

// base selector
export const selectPlayerState = (state) => {
  // console.log('playerRedux state: ', state);
  console.log('playerRedux state: ', state?.player);
  return state?.player;
}

// memoized selector
export const selectActiveSong = createSelector(
  [selectPlayerState],
  (active) => active?.activeSong
)

// invalude hool call - useSelector can only be called in function comopnent body
// export const useSelectActiveSong = useSelector(selectActiveSong);

export default playerSlice.reducer;