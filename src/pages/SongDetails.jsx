import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { playPause, selectPlayerState, setActiveSong } from '../redux/features/playerSlice';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongRelatedQuery, useGetSongsDetailsQuery } from '../redux/services/shazamCore';

const SongDetails = () => {

    const { songid } = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector(selectPlayerState);

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongsDetailsQuery({ songid });

    const { data: relatedSongData, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title='Searching song details' />

    if (error) return <Error />

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (idx, song, relatedSongData) => {
        dispatch(setActiveSong({ idx, song, fetchedSongs: relatedSongData }));
        dispatch(playPause(true));
    }

    return (
        <div className="flex flex-col">
            <DetailsHeader
                artistId=''
                songData={songData}
            />

            {/* lyrics */}
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">
                    Lyrics:
                </h2>

                {/* song lyrics details */}
                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS'
                        ? songData?.sections[1].text.map((line, i) => (
                            <p className='text-gray-400 text-base my-1
                            '>{line}</p>
                        ))
                        : <p className='text-gray-400 text-base my-1
                        '>Sorry, now lyrics found!</p>
                    }
                </div>
            </div>

            <RelatedSongs
                relatedSongData={relatedSongData}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}

export default SongDetails
