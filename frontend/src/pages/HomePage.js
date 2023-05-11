import React, { Suspense, useEffect } from 'react'
import classes from './HomePage.module.css'
import { Info } from '../components/Info'
import { redirect, useLoaderData, useLocation } from 'react-router-dom'
import { Await } from 'react-router-dom'
import { Dam } from './Dam'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DUMMY_info=[
    {id:"1",img:"./assets/info1.png",title:"Pendaftaran Tahun Ajaran 2023/2024",content:"If you need any further information, please feel free to contact us at 0878 6912 3707 ",button:"Register"},
    {id:"2",img:"./assets/info2.png",title:"Jadwal Pembelian Buku T.P. 2022/2023",content:"If you need any further information, please feel free to contact us at 0878 6912 3707 ",button:"More Info"},
    {id:"3", img:"./assets/info3.png", title:"Situs Perpustakaan Methodist Charles Wesley",content:"Peminjaman buku perpustakaan offline & online melalui website. ", button:"Website"}
]

let infos=DUMMY_info.map((info)=><Info img={info.img} title={info.title} content={info.content} button={info.button} />)



export const HomePage = () => {
    const navigate=useNavigate()
    /* const isAuthen=useSelector((state)=>state.auth.isAuth); */

    
   /*  const location = useLocation();
    console.log(location);*/
    const  authenticate=useSelector(state=>state.auth.isAuth)
    useEffect(()=>{
        if(authenticate)
        {
            navigate("/student")
        }
            
    },[authenticate])

   
  
  return (
    <div>
        <div className={classes.main}>
            <div className={classes['main-left']}>
                <div className={classes.quote}>
                    <span>The fear of the Lord is the beginning of knowledge</span>
                    <span>Proverbs 1:7a</span>
                   {/*  {location.state && <h2>Halo</h2>} */}
                </div>
                <div className={classes['overflow-hidden']}>
                <div className={classes['drop-in']}>
                <h1 style={{ display:"flex",flexWrap:"wrap",fontSize:"3vw", width:"80%"}}>
                   <span>Welcome to</span>
                   <span>Methodist Charles Wesley</span>
                </h1>
                </div>
                </div>
                <div className={classes['overflow-hidden']}>
                <div className={classes['drop-in-2']} style={{ display:"flex",fontSize:"1.11vw", flexDirection:"column", marginBottom:"4vw" }}>
                    <span>Komplek CBD. Polonia Blok CC No.108Jl. Padang Golf (dalam)</span>
                    <span>Medan – Sumatera Utara 20157 Indonesia</span>
                </div>
                </div>
                <button className={classes["main-button"]}>Get Started</button>
            </div>
        </div>


        <div className={classes.extrain}>
            <div className={classes['visimisi']}>
                <span> Visi dan Misi </span>
                <span>Methodist Charles Wesley</span>
            </div>   

            <div className={classes['quotevm']}>
           Our vision is to be a benchmark institution in terms of spirituality, leadership, and entrepreneurship. 
            Our mission is to strive and develop each student to their maximum potential: intellectually, physically, emotionally, morally, and socially. 
            </div>
            <div className={classes['buttons']}>
                <button className={classes["main-button2"]}>Hubungi Kami <i class="fa fa-phone" aria-hidden="true"></i> </button>
            <div className={classes['anotherbutton']}>
                <button className={classes["main-button3"]}><i class="fa fa-play" aria-hidden="true"></i></button>
                <h1 className={classes['ttgkami']}>
                <span> Tentang Kami</span>
            </h1>
            </div>
            </div>
        </div>

        {/* PHOTOS */}
        <div className={classes.midcontent}>
            <div className={classes['ml-content']}>
            </div>

            <div className={classes['mm-content']}>
            </div>

            <div className={classes['mr-content']}>
            </div>

            <div className={classes['mf-content']}>
            </div>
        </div>


        <div className={classes.qrcontent}>
            <div className={classes['qrtcontent']}>
            <div className={classes['complimentary']}>
            <div className={classes['qrinfo']}>
                    <h1 className={classes['qrh1']}> Program Kami <i class="fa fa-graduation-cap" aria-hidden="true"></i></h1>
                    <span style={{fontSize:"1.2vw"}}>Program-program yang tersedia pada sekolah kami.</span>
                    <div className={classes['line']}></div>
                </div>
                <div className={classes['qrinfo2']}>
                <div className={classes['qrpart1']}>
                <img className={classes["studentimg"]} src='./assets/student.png'/>
                    <span className={classes['span1']}>SMP</span>
                    <span>Learn more <i class="fa fa-star" aria-hidden="true"></i></span>
                </div>

                <div className={classes['qrpart1']}>
                <img className={classes["studentimg"]} src='./assets/student2.png'/>
                    <span className={classes['span1']}>SMA</span>
                    <span>Learn more <i class="fa fa-star" aria-hidden="true"></i></span>
                </div>

                <div className={classes['qrpart1']}>
                <img className={classes["studentimg"]} src='./assets/student3.png'/>
                    <span className={classes['span1']}>SMK</span>
                    <span>Learn more <i class="fa fa-star" aria-hidden="true"></i></span>
                </div>
                </div>
            </div>
            </div>

            <div className={classes["pengumuman"]}>
                <div>
                    <h1 className={classes["right-content_h2"]}>Pengumuman T.P. 2022/2023</h1>
                    <p className={classes["right-content_p"]}>Salam Sejahtera bagi kita semua.Ada beberapa hal yang perlu kami infokan sehubungan dengan 
                        kegiatan belajar mengajar:
                        <ol className={classes["right-content_ol"]}>
                            <li>Kegiatan Belajar Mengajar Semester Ganjil T.P. 2022 – 2023 dimulai pada tanggal 14 Juli 2022.</li>
                            <li>Pengambilan Buku Pelajaran 11 – 13 Juli 2022 di Lantai 1.</li>
                            <li>Masa Pengenalan Lingkungan Sekolah (MPLS) tanggal 14 Juli 2022 pukul 07.50 – 10.00.</li>
                            <li>Simulasi pembelajaran tanggal 15 Juli 2022 pukul 07.50 – 12.40.</li>
                            <li>Pembelajaran dilaksanakan secara penuh dengan tatap muka di sekolah mulai tanggal 18 Juli 2022</li>
                            <li>Untuk informasi lebih lanjut, kami informasikan melalui Group kelas.</li>
                        </ol>

                        Terima Kasih atas perhatian dan kerjasamanya.Methodist Charles Wesley
                    </p>
                </div>
                <div>Image</div>
            </div>
        </div>

        {/* <div className={classes.newcontent}>
            <div className={classes["sim"]}>
                
            </div>
        </div>

        <div className={classes.content} >
            <div className={classes["left-content"]}>
                {infos}
            </div>
            <div className={classes["right-content"]}>
                <div>Image</div>
                <div>
                    <h1 className={classes["right-content_h2"]}>Pengumuman T.P. 2022/2023</h1>
                    <p className={classes["right-content_p"]}>Salam Sejahtera bagi kita semua.Ada beberapa hal yang perlu kami infokan sehubungan dengan 
                        kegiatan belajar mengajar:
                        <ol className={classes["right-content_ol"]}>
                            <li>Kegiatan Belajar Mengajar Semester Ganjil T.P. 2022 – 2023 dimulai pada tanggal 14 Juli 2022.</li>
                            <li>Pengambilan Buku Pelajaran 11 – 13 Juli 2022 di Lantai 1.</li>
                            <li>Masa Pengenalan Lingkungan Sekolah (MPLS) tanggal 14 Juli 2022 pukul 07.50 – 10.00.</li>
                            <li>Simulasi pembelajaran tanggal 15 Juli 2022 pukul 07.50 – 12.40.</li>
                            <li>Pembelajaran dilaksanakan secara penuh dengan tatap muka di sekolah mulai tanggal 18 Juli 2022</li>
                            <li>Untuk informasi lebih lanjut, kami informasikan melalui Group kelas.</li>
                        </ol>

                        Terima Kasih atas perhatian dan kerjasamanya.Methodist Charles Wesley
                    </p>
                </div>
            </div>
        </div> */}
        
    </div>
  )
}
