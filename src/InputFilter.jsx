import React from 'react';
import { useState, useEffect } from 'react'

function InputSearch() {
 const [data, setData] = useState([]) 
 const [searchTerm, setSearchTerm] = useState('')
 
 useEffect(()=>{
   const fetchValue = async() =>{
     try{ 
       const dataFetch = await fetch('https://jsonplaceholder.typicode.com/comments')
       const dataJson  = await dataFetch.json() 
       setData(dataJson.data)
       
     }catch(error){
       console.log(error.message)
     }
   }
   fetchValue()
 })  
 
 
 const filterItem = data.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())) )
 console.log(filterItem)
 
  
  

  return (
    <div>  
    
     <input type="search" placeholder="search email here" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      
      {filterItem.map((item) =>(
       <div>
         {item.email}
       </div>
      
      ))}
      
    </div>
  )
}

export default InputSearch
