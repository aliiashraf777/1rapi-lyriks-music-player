// before 
// const {
//   id,
//   type,
//   href,
//   attributes: {
//     albumName,
//     artistName,
//     artwork: { url: artworkUrl },
//     durationInMillis,
//     genreNames,
//     name,
//     playParams: { id: playParamId, kind: playParamKind },
//     previews: [{ url: previewUrl } = {}] = [], 
//     releaseData,
//     url: albumUrl,
//   },
// } = song || {};


export const normalizedSong = (song) => {
    if (!song) return null;

    const attr = song.attributes

    return {
        id: song.id,
        songUrl: song.href,
        name: attr?.name,
        artistName: attr?.artistName,
        albumName: attr?.albumName,
        artworkUrl: attr?.artwork?.url,
        composerName: attr?.composerName,
        durationInMillis: attr?.durationInMillis,
        // genreNames: attr?.genreNames = [],
        // nullish coalescing
        // genreNames: attr?.genreNames ?? [],
        genreNames: attr?.genreNames,
        isrc: attr?.isrc,
        previewsUrl: attr?.previews[0].url ?? null,
        releaseData: attr?.releaseData,
        trackNo: attr?.trackNumber,
        albumUrl: attr?.url
    }
}

