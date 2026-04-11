import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


// const SongCard = ({ song, i, isPlaying, activeSong, data, apiMultiSearchData }) => {
const SongCard = ({ idx, song, fetchedSongs, isPlaying, activeSong }) => {

  // const activeSong = { name: 'Test' };

  if (!song) return null;

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ idx, song, fetchedSongs }));
    dispatch(playPause(true));
  }

  // useEffect(() => {
  //   handlePauseClick();
  //   handlePlayClick();
  // }, [handlePauseClick, handlePlayClick])


  return (
    <div className="flex flex-col w-[204px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      {/* song img */}
      <div className="borderx border-2x relative w-full h-56 group">
        <div
          className={`
            absolute inset-0 justify-center items-center bg-black/60 rounded-lgx transition-opacity duration-700
            group-hover:flex 
            opacity-0 group-hover:opacity-70
            ${activeSong?.name === song.name
              ? 'flex opacity-80'
              : 'hidden'}
            `}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        {/* <img src={song.images?.coverart} alt="" /> */}
        {/* <img src={song?.attributes?.artwork?.url} alt="" /> */}
        <img src={song.artworkUrl} alt="" className='w-full h-full object-cover' />
      </div>

      {/* songs details */}
      <div className="mt-4 flex flex-col">
        <p className='font-semibold text-lg text-white truncate'>
          {/* <Link to={`/songs/${song?.key}`}> */}
          <Link to={`/songs/${song.id}`}>
            {/* {song.name} */}
            {/* {name} */}
            {song.name}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          {/* <Link to={artistName ? `/artists/${song.artists[0]?.adamid}` : '/top-artists'}> */}
          <Link to={song.artistName ? `/artists/${song.albumUrl}` : '/top-artists'}>
            {/* {song.subname} */}
            {/* {artistName} */}
            {song.artistName}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
