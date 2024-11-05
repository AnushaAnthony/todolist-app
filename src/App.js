import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {useState,useEffect} from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
 const API_URL='http://localhost:3000/items';
  const[items,setItems]=useState([]);
  const[search,setSearch]=useState('');
 const [newItem,setNewItem]=useState('');
 const[fetchError,setFetchError]=useState(null);
 const[isLoading,setIsLoading]=useState(true);

useEffect(()=>{
   const fetchItem=async()=>{
         try{

          const response= await fetch(API_URL);
          if(!response.ok) throw Error("Data not received");
          const listItems=await response.json();
          setItems(listItems);
          setFetchError(false);

         }catch(err){
           setFetchError(err.message);
         }finally{
          setIsLoading(false);
         }
   }
   setTimeout(()=>{
    (async()=>await fetchItem())();
   },2000)
  
},[])



  const handleCheck=async(id)=>{
   const itemList=items.map((item)=>item.id===id ? {...item,checked:!item.checked} : item);
   setItems(itemList);

   const myItem=items.find((item)=>item.id===id);
   const  updateOptions={
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({checked:myItem.checked})
   };

   const reqUrl=`${API_URL}/${id}`; 
   const result=await apiRequest(reqUrl,updateOptions);
   if(result) setFetchError (result);

  }




  const handleDelete=async(id)=>{
    const itemList=items.filter((item)=>item.id!==id);
    setItems(itemList);


    
    const deleteOptions={
      method:"DELETE"
    };
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,deleteOptions);
    if (result) setFetchError(result);
  };


  const formItem=async(content)=>{
    const id= items.length?( items[items.length-1].id+1) : 1;
    const addnewItem={id, checked:false, content};
    const itemList=[...items,addnewItem]; //...items,spread operators
    setItems(itemList);
  
    const postOption={
      method:"POST",
      headers:{
        "ContentType":"application/json",
      },
      body:JSON.stringify(addnewItem)
    }

    const result=await apiRequest(API_URL,postOption);
    if(result) setFetchError(result);
    };


  
    const handleSubmit=(e)=>{
    e.preventDefault();
     if(!newItem) return;
    formItem(newItem);
    console.log(newItem);
    setNewItem("");
    }
  return (
    <div className='App'>
      <Header title="Balachandra"/>
      <AddItem newItem={newItem} 
               setNewItem={setNewItem}
                handleSubmit={handleSubmit}
      />

      <SearchItem
              search={search}
              setSearch={setSearch}/>



        <main>
          {isLoading && <p>Loading Items..</p>}
          {fetchError && <p>{`Error:${fetchError}`}</p>}
         
            { !isLoading && !fetchError &&  ( <Content items={items.filter((item)=>(item.content.toLowerCase()).includes(search.toLowerCase()))}
                                                       handleCheck={handleCheck}
                    Content                                   handleDelete={handleDelete}/>)}
             
        </main>       
    
      <Footer length={items.length}  />
    </div>
  )
}

export default App

//npx json-server -p 3000 -w data/db.json