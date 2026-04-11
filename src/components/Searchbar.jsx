import { FiSearch } from 'react-icons/fi'
import { selectGenreListId } from '../redux/features/playerSlice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Search = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`)

    setSearchTerm('')
  }

  return (
    <form
      action=""
      autoComplete='off'
      className="p-2 text-gray-300 focus-within:text-gray-600 border-bx"
      onSubmit={handleSearchSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>

      <div className="flex flex-row justify-start items-center">
        <FiSearch className='w-5 h-5 ml-4' />

        <input
          name='search-field'
          autoComplete='off'
          id='search-field'
          placeholder='Search'
          type='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-base text-white p-4'
        />
      </div>
    </form>
  )
}

export default Search
