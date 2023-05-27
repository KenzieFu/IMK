import React, { Component } from "react";

import classes from "./ContactPage.module.css"
import { Fragment } from "react";
import { Sidebar } from "../UI/Sidebar";
import { useSelector } from "react-redux";

import { Form, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";

const { useState } = React;


const Contact = (props) => {
const isAuth = useSelector((state)=>state.auth.isAuth);
const submit =useSubmit()
const submitHandler=(e)=>{
    submit(e.currentTarget,{method:"POST"})

    document.getElementById("formpesan").reset()
    notify()
}
const notify = () => toast.success('Pesan berhasil ditambahkan', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});


const gagal = () => toast.warning('Pesan Gagal Ditambahkan', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});
    return (
        <Fragment>

                    <div className={classes.main}>
                    {isAuth &&<Sidebar />}
                {!isAuth && <div></div>}
                        <div className={classes['content-form']}>
                            <div className={classes['contactus']}>
                            <h1>Hubungi Kami</h1>
                            <p>Our friendly team would love to hear from you!</p>
                            </div>
                            <Form id="formpesan" method="POST">
                                <div className={classes['content-input']}>
                                    <label htmlFor='nama'>Nama Lengkap</label>
                                    <input required name="nama" type="text" placeholder="Nama Lengkap"></input>
                                </div>             
                                <div className={classes['content-input']}>
                                    <label htmlFor='email'>Email</label>
                                    <input pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required name="email" type="email" placeholder="nama@mail.com"></input>
                                </div>
                                <div className={classes['content-input']}>
                                    <label htmlFor='no_HP'>Nomor HP/ WhatsApp</label>
                                    <input required name="no_HP" type="number" placeholder="(08)-123456789"></input>
                                </div>
                                <div className={classes['content-input']}>
                                    <label htmlFor='subject'>Subjek</label>
                                    <input required name="subjek" type="text" placeholder="Perihal"></input>
                                </div>
                                <div className={classes['content-input']}>
                                    <label htmlFor='pesan'>Pesan</label>
                                    <textarea name="pesan" rows="6"></textarea>
                                </div>
                                <button type="submit" onClick={(e)=>submitHandler(e)} className={classes['kirimbutton']}>Kirim Pesan</button>
                            </Form >
                        </div>
                        <div className={classes['maps']}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15928.549808925341!2d98.6774323!3d3.5557885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303130140e390193%3A0xca430cedd941f45f!2sMethodist%20Charles%20Wesley!5e0!3m2!1sen!2sid!4v1681642945352!5m2!1sen!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div className={classes.main2}>
                        <div className={classes['main2con']}>
                        <div style={{paddingLeft:"3vw"}}>
                        <span style={{fontSize:"1.25vw" }}> Lokasi Kami </span>
                        <h1> Kunjungi Sekolah Kami </h1>
                        <span> Jam kerja : 7:30 AM - 15:00 PM</span>
                        </div>
                        </div>
                        <div className={classes['main2con2']} style={{paddingLeft:"3vw"}}>
                        <h2> Email </h2>
                        <span> info@methodistcw.sch.id</span>
                        <span> methodistcw@gmail.com</span>
                        <br></br>
                        <h2>Phone</h2>
                        <span>(061) – 4277 1542</span>
                        <span>0878 6912 3707 (WA)</span>
                        <br></br>
                        <h2> Lokasi </h2>
                        <span> Komplek CBD. Polonia Blok CC No.108Jl. </span>
                        <span>Padang Golf (dalam) Medan – Sumatera Utara 20157</span>
                        </div>
                        <div className={classes['main2con2']}>
                        <div className={classes['minilogo']}></div>
                        </div>
                    </div>




{/* 
                    <div className={classes.card}>
                        <div className={classes.grid}>
                            <div className={classes.info}>
                                <p>Lokasi Sekolah</p>
                                <h1>SMP/SMA/SMK Swasta Methodist Charles Wesley Medan</h1>
                                <p>Komplek CBD. Polonia Blok CC No.108</p>
                                <p>Jl. Padang Golf (dalam)</p>
                                <p>Medan – Sumatera Utara 20157, Indonesia</p>
                                <div className={classes.grid_info}>
                                    <div className={classes.grid_info}>
                                        <div> Email</div>
                                        <div>:info@methodistcw.sch.id
                                        </div>
                                        <div></div>
                                        <div>:methodistcw@gmail.com
                                        </div>
                                    </div>
                                    <div className={classes.grid_info}>
                                        <div> Phone</div>
                                        <div>:(061) – 4277 1542</div>
                                    </div> 
                                    <div className={classes.grid_info}>
                                        <div> Website</div>
                                        <div>
                                            <a href="https://methodistcw.sch.i">:https://methodistcw.sch.i</a>
                                        </div>
                                    </div>
                                    <div className={classes.grid_info}>
                                        <div> Fast Response</div>
                                        <div>:0878 6912 3707 (WA)
                                        </div>
                                        <div></div>
                                        <div>:0813 7724 1686</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.kepsek}>
                                <img src="../assets/kepsek.png"/>
                            </div>
                        </div>
                    </div> */}

        </Fragment>
    )
}

export default Contact



export const action = async({request})=>{
 
    const formData=await request.formData();
    console.log(formData.get("nama"));
    const value={
        nama:formData.get("nama"),
        email:formData.get('email'),
        no_HP:formData.get("no_HP"),
        subjek:formData.get('subjek'),
        pesan:formData.get('pesan')
    }
    console.log(value)
    const response=await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/pesan-masuk",
    {
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            'Authorization':"Bearer"
        },
        body:JSON.stringify(value)
    });
    return response
}