import React, { Suspense, useEffect } from 'react'
import classes from './HomePage.module.css'
import { Info } from '../components/Info'
import { Navigate, redirect, useLoaderData, useLocation } from 'react-router-dom'
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
    const  authenticate=useSelector(state=>state.auth)
    if(authenticate?.isAuth && authenticate?.user?.hak_akses==="Siswa")
        return <Navigate to="/student"  />
    else if(authenticate?.isAuth && authenticate?.user?.hak_akses==="Admin")
    {
        if(authenticate.user?.hak_akses==="Admin" && authenticate.isAuth)
        return <Navigate to="/admin"/>
    }
    else if(authenticate?.isAuth && authenticate?.user?.hak_akses==="Petugas")
    {
        if(authenticate.user?.hak_akses==="Petugas" && authenticate.isAuth)
        return <Navigate to="/petugas"/>
    }

   
  
  return (
    <div className={classes.all}>
        <div className={classes.main}>
            <div className={classes['main-left']}>
                <div className={classes.quote}>
                    <span>The fear of the Lord is the beginning of knowledge</span>
                    <span>Proverbs 1:7a</span>
                   {/*  {location.state && <h2>Halo</h2>} */}
                </div>
                <div className={classes['overflow-hidden']}>
                <div className={classes['drop-in']}>
                <h1 style={{ display:"flex",flexWrap:"wrap",fontSize:"3vw", width:"80%", lineHeight:"4vw"}}>
                   <span>Welcome to</span>
                   <span>Methodist Charles Wesley</span>
                </h1>
                </div>
                </div>
                <div className={classes['overflow-hidden']}>
                <div className={classes['drop-in-2']} style={{ display:"flex",fontSize:"1.11vw", flexDirection:"column", marginBottom:"4vw", marginTop:"1vw" }}>
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
                <button className={classes["main-button2"]}> Hubungi Kami <i class="fa fa-phone" aria-hidden="true"></i> </button>
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

            {/* <div className={classes["pengumuman"]}>
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
            </div> */}

            {/* <div className={classes.pengumuman}>
                <div className={classes["vids"]}>
                </div>  
    </div> */}

    <div className={classes["faq"]}>
        <div className={classes["faq-item"]}>
            <input className={classes["faq-input"]} type="checkbox" id="faq_1"></input>
            <div className={classes["faq-down"]}>
            <label className={classes["faq-title"]} for="faq_1">Pendaftaran tahun ajaran 2023 </label>
            <span ><i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
            </div>
            <div className={classes["faq-text"]}>
                    <hr></hr>
                <span>Methodist Charles Wesley adalah sekolah kristen swasta khusus untuk murid SMP dan SMA. </span>
                 <span> Kami juga menyediakan pendidikan SMK bagi murid-murid yang berminat untuk mendalami keahlian musik. </span>
                <span>Untuk informasi lebih lanjut, silahkan hubungi kami lewat Whatsapp - <a href="https://wa.me/6287869123707"><b>0878 6912 3707</b></a>
                </span>
            </div>
        </div>

        <div className={classes["faq-item"]}>
            <input className={classes["faq-input"]} type="checkbox" id="faq_2"></input>
            <div className={classes["faq-down"]}>
            <label className={classes["faq-title"]} for="faq_2">Pembelian Buku Pelajaran</label>
            <span ><i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
            </div>
            <div className={classes["faq-text"]}>
            <hr></hr>
                <span> Salam Sejahtera untuk kita semua,
                Berikut ini disampaikan <b> Jadwal Pembelian Buku T.P. 2022/2023 </b>
                </span>
                <span>Jadwal Pembelian: <b>06 - 09 Juli 2022</b>
                <br></br>Batas Pembayaran sampai <b>09 Juli 2022</b> melalui Virtual Account.</span>
                <span>Pengambilan Buku Pelajaran akan diinformasikan di Grup kelas
                <br></br> Untuk informasi lebih lanjut dapat menghubungi wali kelas atau whatsapp sekolah.
                </span>
            </div>
        </div>

        <div className={classes["faq-item"]}>
            <input className={classes["faq-input"]} type="checkbox" id="faq_3"></input>
            <div className={classes["faq-down"]}>
            <label className={classes["faq-title"]} for="faq_3">Pengumuman T.P. 2022/2023</label>
            <span ><i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
            </div>
            <div className={classes["faq-text"]}>
            <hr></hr>
                <span>Salam Sejahtera bagi kita semua. </span>
                 Ada beberapa hal yang perlu kami infokan sehubungan dengan kegiatan belajar mengajar.
                <ol>
                    <li>Kegiatan Belajar Mengajar Semester Ganjil T.P. 2022-2023 dimulai pada tanggal <b>14 Juli 2022.</b></li>
                    <li>Pengambilan Buku Pelajaran <b>11-13 Juli 2022</b> di Lantai 1.</li>
                    <li>Masa Pengenalan Lingkungan Sekolah (MPLS) tanggal <b>14 Juli 2022</b> pukul 07.50-10.00.</li>
                    <li>Simulasi pembelajaran tanggal <b>15 Juli 2022</b> pukul 07.50-12.40.</li>
                    <li>Pembelajaran dilaksanakan secara penuh dengan tatap muka di sekolah mulai tanggal <b>18 Juli 2022</b> pukul 07.50-14.00</li>
                    <li>Untuk informasi lebih lanjut, kami informasikan melalui Group kelas.</li>
                </ol>
                <span>
                    Terima Kasih atas pehatian dan kerjasamanya.
                    <br></br> Methodist Charles Wesley
                </span>
            </div>
        </div>
  
        <div className={classes["faq-item"]}>
            <input className={classes["faq-input"]} type="checkbox" id="faq_4"></input>
            <div className={classes["faq-down"]}>
            <label className={classes["faq-title"]} for="faq_4">Ujian Sekolah SMP IX</label>
            <span ><i class="fa fa-angle-double-down" aria-hidden="true"></i></span>
            </div>
            <div className={classes["faq-text"]}>
            <hr></hr>
                <span>Ujian Sekolah SMP Swasta MCW T.P. 2022/2023</span>
                <span>Jadwal Ujian: <b>8 - 13 Mei 2023 </b></span>
                Ruangan Ujian: <b>P1 - P3 | Lantai 2</b>
                <span>Pengumuman Kelulusan: <b>8 Juni 2023</b></span>
            </div>
        </div>
            
                {/* <div className={classes["dropdown"]}>
                    <ul className={classes["dropprimary"]}>
                        <li>
                        <a>Pendaftaran tahun ajaran 2023</a>
                            <ul className={classes["dropsub"]}>
                                <li>
                                    <span>Methodist Charles Wesley adalah sekolah kristen swasta khusus untuk murid SMP dan SMA.
                                        Kami juga menyediakan pendidikan SMK bagi murid-murid yang berminat untuk mendalami keahlian musik. </span>

                                    <span>Untuk informasi lebih lanjut, silahkan hubungi kami lewat Whatsapp <a href="">0878 6912 3707</a></span>
                                </li>
                            </ul>
                        </li>

                        <li>
                        <a>Ujian Sekolah SMP IX</a>
                            <ul className={classes["dropsub"]}>
                                <li>
                                    <h1>
                                    <span>Ujian Sekolah SMP Swasta MCW</span>
                                    <br></nr>Tahun Pelajaran 2022/2023
                                    </h1>
                                    <span>Jadwal Ujian: 8 - 13 Mei 2023
                                    <br></br>Ruangan Ujian: P1 - P3 | Lantai 2 
                                    <br></br>Pengumuman Kelulusan: 8 Juni 2023</span>

                                </li>
                            </ul>
                        </li>
                        <li>
                        <a>Pembelian Buku Pelajaran</a>
                            <ul className={classes["dropsub"]}>
                                <li>
                                    <span> Salam Sejahtera untuk kita semua,
                                        <b> Berikut ini disampaikan Jadwal Pembelian Buku T.P. 2022/2023 </b>
                                    </span>

                                    <span>Jadwal Pembelian: <b>06 - 09 Juli 2022</b>
                                    <br></br>Batas Pembayaran sampai <b>09 Juli 2022</b> melalui Virtual Account.</span>

                                    <span>Pengambilan Buku Pelajaran akan diinformasikan di Grup kelas
                                        <br></br> Untuk informasi lebih lanjut dapat menghubungi wali kelas atau whatsapp sekolah.
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li>
                        <a>Pengumuman T.P. 2022/2023</a>
                            <ul className={classes["dropsub"]}>
                                <li>
                                    <span>Salam Sejahtera bagi kita semua. </span>
                                        <br></br> Ada beberapa hal yang perlu kami infokan sehubungan dengan kegiatan belajar mengajar.
                                        <ol>
                                            <li>Kegiatan Belajar Mengajar Semester Ganjil T.P. 2022-2023 dimulai pada tanggal 14 Juli 2022.</li>
                                            <li>Pengambilan Buku Pelajaran 11-13 Juli 2022 di Lantai 1.</li>
                                            <li>Masa Pengenalan Lingkungan Sekolah (MPLS) tanggal 14 Juli 2022 pukul 07.50-10.00.</li>
                                            <li>Simulasi pembelajaran tanggal 15 Juli 2022 pukul 07.50-12.40.</li>
                                            <li>Pembelajaran dilaksanakan secara penuh dengan tatap muka di sekolah mulai tanggal 18 Juli 2022 pukul 07.50-14.00</li>
                                            <li>Untuk informasi lebih lanjut, kami informasikan melalui Group kelas.</li>
                                        </ol>
                                        <span>
                                            Terima Kasih atas pehatian dan kerjasamanya.
                                            <br></br> Methodist Charles Wesley
                                        </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div> */}

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
