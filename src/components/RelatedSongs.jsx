import SongBar from "./SongBar"

const RelatedSongs = ({ relatedSongData, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">
        Related Songs
      </h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongData.map((song, idx) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            idx={idx}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, idx, relatedSongData)}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs
