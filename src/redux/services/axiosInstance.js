import axios from 'axios'
import { useEffect } from 'react';

export const axiosInstance = axios.create({
    baseURL: 'https://shazam-core.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_SHAZAM_API_KEY,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
    },
});

 
export const searchSongs = async (searchTerm) => {
    const { data } = await axiosInstance.get(
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
    );

    return data;
};


export const useInComponents = () => {

    const [song, setSong] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await searchSongs('metallica');
                setSong(data);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [])
}