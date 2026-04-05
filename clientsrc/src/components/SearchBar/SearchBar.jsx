import React from 'react';
import { useSearch } from "../../context/SearchContext";

const SearchBar = () => {
  const { search, setSearch } = useSearch();

  return (
    <div className='container'>
    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
      <input
        className="form-control mt-3"
        type="search"
        placeholder="Search products Here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
    </div>
  );
};

export default SearchBar;



