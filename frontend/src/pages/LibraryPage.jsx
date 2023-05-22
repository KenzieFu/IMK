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
  const {books,genres}=useLoaderData('books');
  const [currentGenre,setGenre]=useState(0);
  console.log(currentGenre)
  const setGenreHandler=(index)=>{
    console.log(index)
    setGenre(index);
  }
  console.log("Haihai")
  const [enteredKey,setKey]=useState('');
  let check = enteredKey.trim() !=="";

  const keyHandler=(event)=>{
      setKey(event.target.value);
  }
  return (
    <>

    <div className={classes.content}>
<div>
{isAuth &&<Sidebar/>}

      <div className={classes.main}>
      {check &&
          <h1>
            Hasil Pencarian untuk : {enteredKey}
          </h1>
        }
        <div className={classes.maintop}>
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
          <Await resolve={books}>
            {(loadedBooks)=><PopularBook books={loadedBooks}/>}
        </Await>
        </Suspense>

        </>
        }

      </div>
      <div className={classes['mainmid']}>

      {!check &&
          <>
        <Suspense fallback="">
          <Await resolve={genres}>
         {(loadedGenres)=><ListGenre setGenre={setGenreHandler} current={currentGenre} genres={loadedGenres}/>}
          </Await>
        </Suspense>

           </>
        }
        </div>
        

        <div className={classes['mainbot']}>
        {!check &&
        <>
        <Suspense fallback ={<p style={{ textAlign:"center" }}>Loading.....</p>}>
          <Await resolve={books}>
          {(loadedBooks)=><ListBooks books={loadedBooks}/>}
          </Await>
        </Suspense>

            </>

        }
        </div>
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

export const loader=()=>{
  return defer({
    books:loadBooks(),
    genres:loadGenre(),
  })
}