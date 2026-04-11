import { createSelector, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (
        action.payload?.data?.tracks?.hits ||
        action.payload?.apiMultiSearchData?.tracks?.hits
      ) {
        state.currentSongs = action.payload.data.tracks.hits ||
          action.payload.apiMultiSearchData.tracks.hits;
      } else if (
        action.payload?.data?.properties ||
        action.payload?.apiMultiSearchData?.properties
      ) {
        state.currentSongs = action.payload?.data?.tracks ||
          action.payload?.apiMultiSearchData?.tracks;
      } else {
        state.currentSongs = action.payload.data ||
          action.payload.apiMultiSearchData;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
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
