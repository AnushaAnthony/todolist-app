import React from 'react';


const SearchItem = ({search,setSearch}) => {
   
  return (
   <form className="searchItem"  onSubmit={(e)=>e.preventDefault()}>
    <label>Search Item:</label>
        <input 
        type="text" 
        id="search" 
        placeholder="search Item" 
        role="searchbox"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>
   </form>
  )
}

export default SearchItem
