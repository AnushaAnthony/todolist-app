import React from 'react';

import { FaPlusSquare } from "react-icons/fa";

const AddItem = ({newItem,setNewItem,handleSubmit}) => {

 

 return (
    <form className="AddItem" onSubmit={handleSubmit}> 
      <input 
      type="text"
      autoFocus
      required
      value={newItem}
      onChange={(e)=>setNewItem(e.target.value)}/>
      <button type="submit"  aria-label="Add Item">
      <FaPlusSquare />
      </button>
    </form>
  )
}

export default AddItem
