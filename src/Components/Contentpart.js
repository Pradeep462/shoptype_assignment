import React from 'react';
import { useEffect, useState } from 'react';
import './ContentPart.css'
import Paginate from './Paginate.js';

const APIKEY = '7iiKl5AdqLqxdmzs7Aa9v5cU1xKp4icO';

const ContentPart = () => {

    
  const [searchKey , setSearchKey] = useState('');
  const [data , setData] = useState([]);
  const [isError , setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const getSearchData = async (event) => {
    event.preventDefault();
   
    setIsError(false);
    try{
         const searchresponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searchKey}`);
         const responsejson = await searchresponse.json();
         setData(responsejson.data);  
         
    }catch(err){
          setIsError(true);
          }
        
       
     }     
    const getData = async () => {
        
        setIsError(false);
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`);
             const resjson = await response.json();
             setData(resjson.data);

        }catch(err){
              setIsError(true);
              
        }
     }

     const handleSearchChange = event => {
      
        setSearchKey(event.target.value);
      
    };

    useEffect(()=>{
      getData();
    },[]);

    const showError = () =>{
        if(isError){
            return <div className="error-div">failed to load data. Try again after some time</div>
      }
    }
console.log(data);
const pageSelected = pageNumber => {
  setCurrentPage(pageNumber);
};

    return (
        <>
        <div className="header text-white"> <h2 >Search Gifs</h2>
                <input type="text-white form-control " placeholder="Search" onChange={handleSearchChange} />
                <button className="btn bg-primary text-white" onClick={getSearchData}>Go</button>
         </div>
        <div className="d-flex w-100 justify-content-center flex-wrap align-items-center ">
            {showError() }
              
               

            {  currentItems.map(item =>{
                return <div key={`${item.id}`} className="gift d-inline-block p-3" >
                      <img  src={item.images.fixed_height.url} alt="loding..."/>
                    </div>
              }) }
       </div>
       <Paginate className="p-3"
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
    </>
    );
};

export default ContentPart;