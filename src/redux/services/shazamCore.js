import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// old default url = 'https://shazam-core.p.rapidapi.com/v1/charts/world'
// const url = 'https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS&offset=0&query=metallica';


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_RAPID_SHAZAM_API_KEY);

            headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');

            return headers;
        },
    }),
 
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            // query: () => '/charts/world',
            query: (searchTerm) => `/v1/search/multi?search_type=SONGS&offset=0&query=${searchTerm}`,
        }),
        getSongsDetails: builder.query({
            query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`,
        }),
        getSongRelated: builder.query({
            query: ({ songid }) => `/v1/tracks/related?offset=0&track_id=${songid}`
        })
    }),
})

export const {
    useGetTopChartsQuery,
    useGetSongsDetailsQuery,
    useGetSongRelatedQuery,
} = shazamCoreApi;


