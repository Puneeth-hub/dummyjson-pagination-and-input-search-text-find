import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [quotes, setQuotes] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)  
  const [totalQuotes, setTotalQuotes] = useState(1)


  const perPage = 30




   const fetchQuotes = async(page)=>{
     
        const skip = (page -1)* perPage;
        const quoteData = await fetch(`https://dummyjson.com/quotes?limit=${perPage}&skip=${skip}`)
        const quoteJson = await quoteData.json() 
        setQuotes(quoteJson.quotes)
        setTotalQuotes(quoteJson.total)
    } 
  

  useEffect(() =>{
   
    fetchQuotes(currentPage) 
  
  }, [currentPage]) 

  const filterQuote = quotes.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())))

  

   

  const totalPages = Math.ceil(totalQuotes/perPage) 

  
  
 const handleClickPrev = () =>{
     setCurrentPage((prev) => Math.max(prev -1, 1))
 }

const handleClickNext = () =>{
  setCurrentPage((prev) => Math.min(prev +1, totalPages))
}


  return (
    
      <div className='main-container'> 
         <div>
          
          <button onClick={handleClickPrev} disabled={currentPage === 1}>Prev</button> 
          <span>{currentPage} And {totalPages}</span>
          <button onClick={handleClickNext} disabled={currentPage === totalPages}>Next</button>
         </div>
         <div className='search-container'>
             <input type='search'  placeholder='Search her Quote and Author' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
         </div>
        <div className='sub-container'> 
         {filterQuote.map((item) =>(
          <div className='quote-contianer' key={item.id}>
            <p>{item.quote}</p> 
            <p>{item.author}</p>
          </div>
         ))}
        </div>
      </div>
    
  )
}

export default App
