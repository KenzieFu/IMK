import React, { useState } from 'react'
import { Sidebar } from '../UI/Sidebar'
import { StudentChart } from '../components/StudentChart'
import classes from './LibraryPage.module.css'
import { SearchBox } from '../UI/SearchBox'
import { Recommendation } from '../UI/Recommendation'
import { PopularBook } from '../components/PopularBook'
import { ListBooks } from '../components/ListBooks'
import { Suspense } from 'react'
import {useLoaderData,json,defer,Await} from 'react-router-dom'
import { ListGenre } from '../UI/ListGenre'
import { useSelector } from 'react-redux'
import { SearchResult } from '../components/SearchResult'

export const LibraryPage = () => {
  const isAuth=useSelector(state=>state.auth.isAuth);
  const {books,genres,popular}=useLoaderData('books');
  const [currentGenre,setGenre]=useState(0);

  const setGenreHandler=(index)=>{
 
    setGenre(index);
  }

  const [enteredKey,setKey]=useState('');
  let check = enteredKey.trim() !=="";

  const keyHandler=(event)=>{
      setKey(event.target.value);
  }
  return (
    <>

    <div className={classes.content}>
<div style={{ display:"flex", alignItems:"flex-start" }}>
{isAuth &&<Sidebar/>}

      <div className={classes.main}>

        <div className={classes.maintop}>
        <div className={classes['searchsugg']}>
      {check &&
          <h1>
            <span> Hasil Pencarian untuk : </span>
            <span style={{color:'#3a3a3a', marginLeft:'0.4vw', fontWeight:'600'}}>{enteredKey}</span>
          </h1>
        }
        </div>
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'2vw'}}> <SearchBox keyword={enteredKey} keyHandler={keyHandler}/>
      </div>
      {check &&
        <Suspense>
          <Await resolve={books}>
              {loadedData=><SearchResult keyword={enteredKey} books={loadedData} />}
          </Await>
        </Suspense>
      }

      {!isAuth && <div style={{ marginLeft:"0px" }}></div>}
      {!check &&
      <>
      <Suspense fallback="">
          <Await resolve={genres}>
         {(loadedRecommendation)=><Recommendation recommendation={loadedRecommendation}/>}
          </Await>
        </Suspense>

        </>
      }

      {!check &&
        <>
        <Suspense fallback={<p style={{ textAlign:"center" }}>Loading.....</p>}>
          <Await resolve={popular}>
            {(loadedBooks)=><PopularBook books={loadedBooks}/>}
        </Await>
        </Suspense>

        </>
        }

      </div>
      {!check &&
      <div className={classes['mainbatch']}> 
      
      <div className={classes['mainmid']}>
          <>
        <Suspense fallback="">
          <Await resolve={genres}>
         {(loadedGenres)=><ListGenre setGenre={setGenreHandler} current={currentGenre} genres={loadedGenres}/>}
          </Await>
        </Suspense>

           </>
        </div>
        
        

     
        <div className={classes['mainbot']}>
        <>
        <Suspense fallback ={<p style={{ textAlign:"center" }}>Loading.....</p>}>
          <Await resolve={books}>
          {(loadedBooks)=><ListBooks genre={currentGenre} books={loadedBooks}/>}
          </Await>
        </Suspense>

            </>

        </div>
        
          </div>}
        </div>


      </div>
    </div>
    </>
  )
}

const loadBooks=async ()=>{

  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku-perpus")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch books.' },
      {
        status: 500,
      }
    );
  }
  else{
    const resData=await response.json();
    return resData;
  }
}

const loadGenre=async ()=>{
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/kategori")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch genres.' },
      {
        status: 500,
      }
    );
  }
  else{
    const resData=await response.json();
    return resData;
  }
}

const loadPopular=async()=>{
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/jumlah-dipinjam");
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch genres.' },
      {
        status: 500,
      }
    );
  }

    const resData=await response.json();
    return resData;

}

export const loader=()=>{
  return defer({
    popular:loadPopular(),
    books:loadBooks(),
    genres:loadGenre(),
  })
}