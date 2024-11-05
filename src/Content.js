
import React from 'react';

import { MdDelete } from "react-icons/md";

const Content = ({items,handleCheck,handleDelete}) => {

return(
  <>
    {items.length ?(
    <ul>
      {items.map((item)=>
      <li >
        <input type="checkbox" 
        checked={item.checked}
        onClick={()=>handleCheck(item.id)}
        />
        <label style={(item.checked) ? {textDecoration:"line-through"}:null}
      
        >{item.content}</label>
        <MdDelete onClick={()=>handleDelete(item.id)} />
      </li>
      )}
    </ul>
):(
  <p> Your list is empty</p>
)}
  </>
)
}
export default Content;