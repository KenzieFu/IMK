import React from "react";
import { Sidebar } from "../UI/Sidebar";
import classes from "./BookDetails.module.css"
import { useEffect, useState } from "react";
import { defer, json, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

const BookDetail = () => {
    const navigate=useNavigate();
    const isAuth = useSelector((state)=>state.auth.isAuth);
    const {book}=useLoaderData('book-detail');
    const backHandler=()=>{
        navigate("..");
    }
    return (
        <>
            <div className={classes.content}>
                <div className={classes.card}>
               {isAuth && <Sidebar />}
                   {/*  <div className={classes.hero}>
                        <img src="../assets/hero-details-books.jpg"></img>
                    </div> */}
                    <div className={classes.cover}>
                        <img src="../assets/book.png"></img>
                    </div>
                    
                    <div className={classes.book_info}>
                        <h2>{book.judul_buku}</h2>
                            <div className={classes.summary}>
                            {/* <h3>Sinopsis</h3> */}
                            <p>{book.sinopsis}</p>
                        </div>
                        <table >
                            <tr>
                                <td>Penulis</td>
                                <td>:</td>
                                <td style={{ color: "#000000", fontWeight: "bold"}}>{book.pengarang}</td>
                            </tr>
                            <tr>
                                <td>Penerbit</td>
                                <td>:</td>
                                <td style={{ color: "#000000", fontWeight: "bold"}}>{book.penerbit}</td>
                            </tr>
                            <tr>
                                <td>Tahun</td>
                                <td>:</td>
                                <td style={{ color: "#000000", fontWeight: "bold"}}>{book.tahun_terbit}</td>
                            </tr>
                            <tr>
                                <td>ISBN</td>
                                <td>:</td>
                                <td style={{ color: "#000000", fontWeight: "bold"}}>{book.isbn}</td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td>:</td>
                                <td style={{ color: "#000000", fontWeight: "bold"}}>{book.kategori.nama_kategori}</td>
                            </tr>
                        </table>
                        <button className={classes["button-back"]} onClick={backHandler}>Back</button>
                        {/* button ini belum jalan seperti semestinya */}
                    <button className={classes["button-borrow"]} onClick={backHandler}>Pinjam Buku</button>
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