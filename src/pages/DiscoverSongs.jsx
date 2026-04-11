import { useDispatch, useSelector } from "react-redux";
import { defaultAppGenres } from "../assets/constants"
import { Error, Loader, SongCard } from "../components";
import { apiMultiSearchData } from "../data/shazamApiData";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId, selectPlayerState } from "../redux/features/playerSlice";
import { normalizedSong } from "../utils/normalizeSong";


const DiscoverSongs = () => {
 
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector(selectPlayerState);

    // api and local data toggle
    const USE_LOCAL = true;

    const { data, isFetching, error } = useGetTopChartsQuery('metallica', { skip: USE_LOCAL });
    console.log('useTopChartsData', data);

    const rawSongs = USE_LOCAL
        ? apiMultiSearchData
        : data?.data || [];

    if (!USE_LOCAL && isFetching) (
        <Loader title='Loading songs...' />
    )

    if (!USE_LOCAL && error) (<Error />)

    const fetchedSongs = rawSongs.map(normalizedSong);

    // console.log(defaultAppGenres)
    // const genreTitle = 'Pop';
    const genreTitle = defaultAppGenres.find(({ value }) => value === genreListId)?.title || 'POP';


    return (
        <div className="flex flex-col">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center mt-4 mb-10">
                <h4 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                    {/* Discover {genreListId} */}
                </h4>

                <select
                    name="genre"
                    id="genre"
                    value={genreListId || 'pop'}
                    onChange={(e) => { dispatch(selectGenreListId(e.target.value)) }}
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {defaultAppGenres?.map((genre) => (
                        <option
                            key={genre.value}
                            value={genre.value}
                        >
                            {genre.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* songs cards */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-5">
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song, idx, i) => ( */}
                {/* {data?.data?.map((song, idx, i) => ( */}
                {/* {apiMultiSearchData.map((song, idx, i) => ( */}
                {fetchedSongs.map((song, idx) => (
                    <SongCard
                        key={song.id}
                        idx={idx}
                        song={song}
                        fetchedSongs={fetchedSongs}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                    // data={data}
                    // apiMultiSearchData={apiMultiSearchData}
                    />
                ))}
            </div>

        </div>
    )
}

export default DiscoverSongs
