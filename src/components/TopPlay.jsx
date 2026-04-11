import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectPlayerState } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { apiMultiSearchData } from "../data/shazamApiData";
import Loader from "./Loader";
import Error from "./Error";
import { normalizedSong } from "../utils/normalizeSong";
import { playPause, setActiveSong } from "../redux/features/playerSlice copy";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode'
import PlayPause from "./PlayPause";


const TopPlay = () => {
  const dispatch = useDispatch();

  const divRef = useRef(null);

  const { activeSong, isPlaying } = useSelector(selectPlayerState);

  // api and local data toggle
  const USE_LOCAL = true;

  const { data, isFetching, error } = useGetTopChartsQuery('metallica', { skip: USE_LOCAL });
  console.log('topplay: ', data);

  const rawSongs = USE_LOCAL
    ? apiMultiSearchData
    : data?.data || [];

  if (!USE_LOCAL && isFetching) (
    <Loader title='Loading songs...' />
  )

  if (!USE_LOCAL && error) (<Error />)

  const fetchedSongs = rawSongs.map(normalizedSong);

  const topFetchedPlays = fetchedSongs?.slice(0, 4);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (idx, song, topFetchedPlays) => {
    console.log('topPlayHandle', idx, song, topFetchedPlays)
    dispatch(setActiveSong({
      idx,
      song,
      fetchedSongs: topFetchedPlays
    }));
    dispatch(playPause(true));
  }

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [])


  return (
    <div ref={divRef}
      className='borderx border-2x ml-0 xl:ml-6 mb-6 xl:mb-0 max-w-full xl:max-w-[400px] flex-1 flex flex-col overflow-y-scrollx'
    >
      <div className="w-full flex flex-col">
        {/* title */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl lg:text-2xlx">
            Top Charts
          </h2>

          <Link to='/top-charts'>
            <p className="text-gray-300 text-base cursor-pointer border-b border-b-white/55 hover:border-b-white/85">
              See more
            </p>
          </Link>
        </div>

        {/* topcharts card */}
        <div className="mt-4 flex flex-col gap-1">
          {topFetchedPlays.map((song, idx) => (
            <TopChartCard
              key={idx}
              song={song}
              idx={idx}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
              topFetchedPlays={topFetchedPlays}
            />
          ))}
        </div>
      </div>

      {/* top artists section */}
      <div className="w-full flex flex-col mt-8">
        {/* title */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl lg:text-2xlx">
            Top Artists
          </h2>

          <Link to='/top-artists'>
            <p className="text-gray-300 text-base cursor-pointer border-b border-b-white/55 hover:border-b-white/85">
              See more
            </p>
          </Link>
        </div>

        {/* top artists slider */}
        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[freeMode]}
          className='mt-4'
        >
          {topFetchedPlays.map((song) => (
            <SwiperSlide
              key={song.id}
              style={{ width: '20%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artists/${song?.albumUrl}`}>
                <img
                  src={song.artworkUrl}
                  // src={song.songUrl}
                  alt={song.id}
                  className='w-full rounded-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default TopPlay


const TopChartCard = ({ song, idx, isPlaying, activeSong, handlePause, handlePlay, topFetchedPlays }) => {
  return (
    <div className='w-full flex flex-row items-center py-2 p-4 mb-2 rounded-lg cursor-pointer hover:bg-[#4c4263]'>
      <h3 className="font-bold text-base text-white/85 mr-3">
        {idx + 1}.
      </h3>

      {/* song */}
      <div className='flex-1 flex flex-row justify-between items-center'>
        <img
          src={song?.artworkUrl}
          alt={song?.name}
          className='w-16 h-w-16 rounded-lg'
        />

        {/* songs titles */}
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.id}`}>
            <p className="text-lg font-medium text-white">
              {song?.name}
            </p>
          </Link>

          <Link to={`/artists/${song.artistName}`}>
            <p className="text-base text-gray-300 mt-1">
              {song?.artistName}
            </p>
          </Link>
        </div>
      </div>

      {/* playpause handle */}
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePause}
        handlePlay={() => handlePlay(idx, song, topFetchedPlays)}
      />
    </div>
  )
}
