import React from "react";
import { Sidebar } from "../UI/Sidebar";
import classes from "./BookDetails.module.css"
import { useEffect, useState } from "react";
import { defer, json, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";

const BookDetail = () => {
    const navigate=useNavigate();
    const {book}=useLoaderData('book-detail');
    const backHandler=()=>{
        navigate("..");
    }
    return (
        <>
            <div className={classes.content}>
                <Sidebar />
                <div className={classes.card}>
                    
                    <div className={classes.cover}>
                        <img src="../assets/book.png"></img>
                    </div>
                    
                    <div className={classes.book_info}>
                    <button className={classes["button-back"]} onClick={backHandler}>Back</button>
                        <h2>{book.judul_buku}</h2>
                        <table >
                            <tr>
                                <td style={{ color: "#686B6F" }}>Penulis</td>
                                <td>:</td>
                                <td>{book.pengarang}</td>
                            </tr>
                            <tr>
                                <td style={{ color: "#686B6F" }}>Penerbit</td>
                                <td>:</td>
                                <td>{book.penerbit}</td>
                            </tr>
                            <tr>
                                <td style={{ color: "#686B6F" }}>Tahun</td>
                                <td>:</td>
                                <td>{book.tahun_terbit}</td>
                            </tr>
                            <tr>
                                <td style={{ color: "#686B6F" }}>ISBN</td>
                                <td>:</td>
                                <td>{book.isbn}</td>
                            </tr>
                            <tr>
                                <td style={{ color: "#686B6F" }}>Genre</td>
                                <td>:</td>
                                <td>{book.kategori.nama_kategori}</td>
                            </tr>
                        </table>

                    </div>
                     <div className={classes.summary}>
                        <h3>Sinopsis</h3>
                        <p>{book.sinopsis}</p>
                        
        
                    </div>
                </div>

            </div>
        </>
    )
}

export default BookDetail

const loadBook=async (id)=>{
    const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku/"+id)
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch events.' },
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
  
  export async function loader({ request, params }) {
    const id = params.bookId;

    return defer({
      book: await loadBook(id),
    });
  }