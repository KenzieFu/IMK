
import "./App.css"
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RootLayout } from './pages/Root';

import {StudentPage} from './pages/StudentPage'
import { LibraryPage } from "./pages/LibraryPage";
import  BookDetail, { loader } from './pages/BookDetails'
import Contact from "./pages/ContactPage";
import { CartProvider } from 'react-use-cart'


import { lazy } from "react";
import { UserPage, action } from "./pages/Admin/UserPage";
import ErrorPage from "./pages/ErrorPage";
import { StudentPage as StudentAdminPage } from "./pages/Admin/StudentPage";

import { loader as booksLoader } from "./pages/LibraryPage";
import {loader as bookLoader} from "./pages/BookDetails"
import { loader as usersLoader } from "./pages/Admin/UserPage";
import {ErrorPage as ErrorAdminPage}  from "./pages/Admin/ErrorPage";
import { action as deleteUserAction } from "./pages/Admin/UserPage";
import { element } from "prop-types";
import { DetailUser } from "./pages/Admin/DetailUser";
import { loader as userLoader } from "./pages/Admin/DetailUser";
import { EditUser } from "./pages/Admin/EditUser";
import { action as editUserAction } from "./components/admin/dashboard/UserForm";
import { useSelector } from "react-redux";
import { loader as studentLoader } from "./pages/StudentPage";
import { BookTablePage } from "./pages/Admin/BookTablePage";

import { Registrasi } from './pages/FormRegistrasi/Registrasi'
import { DataSiswa } from './pages/FormRegistrasi/DataPribadiSiswaForm'
import { DataKesehatan } from "./pages/FormRegistrasi/DataKesehatanSiswaForm";
import { DataPendidikan } from "./pages/FormRegistrasi/DataPendidikanSiswa";
import { DataAyah } from "./pages/FormRegistrasi/DataAyah";
import { DataIbu } from "./pages/FormRegistrasi/DataIbu";
import { DataWali } from "./pages/FormRegistrasi/DataWali";
import { KonfirmasiData } from "./pages/FormRegistrasi/KonfirmasiData";
import { PetugasPage } from "./pages/PetugasPage";
import { PetugasAuth } from "./components/auth/PetugasAuth";


//Student Loader

//Calender (Event)
import { loader as userCalenderLoader } from "./pages/EventPage";

//Student Action
import { action as eventAction } from "./pages/EventPage";

//Admin loader

// Books
import { loader as adminBooksLoader } from "./pages/Admin/BookTablePage"; //books
import { loader as adminBookLoader } from "./pages/Admin/DetailBuku";

//Students
import { loader as adminStudentLoader } from "./pages/Admin/StudentPage";
import { loader as studentDetailLoader } from "./pages/Admin/DetailStudentPage"
//Buku Pinjam
import { loader as adminPinjamLoader } from "./pages/Admin/DaftarBukuPinjamPage";
import { loader as adminPinjamDetailLoader } from "./pages/Admin/DetailPinjam";

//Buku Pinjam
import { loader as adminPengembalianLoader } from "./pages/Admin/DaftarPengembalianBukuPage";
//Calender
import { loader as adminEventLoader } from "./pages/Admin/AdminEventPage";
//booking
import { loader as adminBookingLoader } from './pages/Admin/DaftarBookingBuku'
//log
import  {loader as logbukuloader } from './pages/Admin/Log/LogBuku'
import { loader as logbukuperpusloader } from './pages/Admin/Log/LogBukuPerpus'
import { loader as loaderbukuajaranbaru } from './pages/Admin/Log/LogBukuAjaranBaru'
import { loader as logpemesananloader } from './pages/Admin/Log/LogPemesanan'

//create pinjam

import {loader as adminCreatePinjam} from "./components/admin/dashboard/CreatePinjam"
//Petugas Loader
//Absensi
import { loader as petugasAbsensiLoader } from "./pages/Petugas/AbsensiPage";
import { loader as petugasCreateAbsensiLoader } from "./pages/Petugas/CreateAbsensi";
//Pinjam Booking BUku
import { loader as petugasDetailSiswaLoader } from "./pages/Petugas/DetailPerpusSiswa";

//All LogoutAction
import { action as logoutAction } from "./pages/Logout";

//Admin Action

//Buku
import { action as adminDeleteBookAction } from "./pages/Admin/BookTablePage";
//Siswa
import { action as adminDeleteStudentAction } from "./pages/Admin/StudentPage";
//Buku Pinjam
//Delete
import { action as adminDeletePinjamAction } from "./pages/Admin/DaftarBukuPinjamPage";
//Calender
import { action as adminEventAction } from "./pages/Admin/AdminEventPage";
//Delete booking
import { action as adminDeleteBookingAction } from "./pages/Admin/DaftarBookingBuku"
//Edit stok
import { action as editStokAction } from "./pages/Admin/DetailBuku";

//Petugas Action
//Scan Masuk
import { action as petugascreateAttendanceAction } from "./pages/Petugas/ScanPage";
//Scan Keluar
import { action as petugasKeluarAttendanceAction } from "./pages/Petugas/ScanKeluarPage";
//Input Masuk
import { action as enterPetugasAction } from "./pages/Petugas/CreateAbsensi";

//Scan Siswa
import { action as enterSiswaAction } from "./pages/Petugas/ScanSiswa";

//Keluar Manual
import { action as enterManualPetugasAction } from "./pages/Petugas/AbsensiPage";

//Action Batalin Pemesanan (siswa)
import { action as batalPesananAction } from "./pages/StudentPage";

//Action EditBuku admin
import { action as adminBookAction } from "./components/admin/dashboard/BookForm";

//Action Create Pesan
import { action as contactAction } from "./pages/ContactPage";
//Action editSIswa
import { action as editSiswa } from "./components/admin/dashboard/StudentForm"

//import Petugas batalPesanan
import { action as batalPesanPetugasAction } from "./pages/Petugas/DetailPerpusSiswa";

import { DetailBuku } from "./pages/Admin/DetailBuku";
import { DetailStudentPage } from "./pages/Admin/DetailStudentPage";
import { EditStudentPage } from "./pages/Admin/EditStudentPage";
import { CreateSiswa } from "./pages/Admin/CreateSiswa";
import { DaftarBukuPinjamPage } from "./pages/Admin/DaftarBukuPinjamPage";
import { DetailPinjam } from "./pages/Admin/DetailPinjam";
import { EditPinjam } from "./pages/Admin/EditPinjam";
import { DaftarPengembalianBukuPage } from "./pages/Admin/DaftarPengembalianBukuPage";
import { CreatePinjam } from "./components/admin/dashboard/CreatePinjam";
import { DetailPengembalianBuku } from "./pages/Admin/DetailPengembalianBuku";
import { EditPengembalianBuku } from "./pages/Admin/EditPengembalianBuku";
import { CreateBuku } from "./pages/Admin/CreateBuku";
import { EditBuku } from "./pages/Admin/EditBuku";
import { EventPage } from "./pages/EventPage";
import { AdminEventPage } from "./pages/Admin/AdminEventPage";
import { StudentAuth } from "./components/auth/StudentAuth";
import { AdminAuth } from "./components/auth/AdminAuth";
import { PetugasRoot } from "./layouts/PetugasRoot";
import { ScanPage } from "./pages/Petugas/ScanPage";
import { AbsensiPage } from "./pages/Petugas/AbsensiPage";
import { ScanKeluarPage } from "./pages/Petugas/ScanKeluarPage";
import { CreateAbsensi } from "./pages/Petugas/CreateAbsensi";
import { DaftarBookingBuku } from "./pages/Admin/DaftarBookingBuku";
import { tokenLoader } from "./components/util/auth";
import { GuestMode } from "./components/auth/GuestMode";
import { BarcodeReaderPage } from "./pages/Petugas/BarcodeReaderPage";
import { ScanQrSiswa } from "./components/QRcode/ScanQrSiswa";
import { ScanSiswa } from "./pages/Petugas/ScanSiswa";
import { DetailPerpusSiswa } from "./pages/Petugas/DetailPerpusSiswa";
import { LogBuku } from "./pages/Admin/Log/LogBuku";
import { LogBukuPerpus } from "./pages/Admin/Log/LogBukuPerpus";
import { LogBukuAjaranBaru } from "./pages/Admin/Log/LogBukuAjaranBaru";
import { LogPemesanan } from "./pages/Admin/Log/LogPemesanan";


/****Layouts Admin*****/
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("./pages/Admin/Starter.js"));
const About = lazy(() => import("./pages/Admin/About.js"));
const Alerts = lazy(() => import("./UI/admin/Alerts.js"));
const Badges = lazy(() => import("./UI/admin/Badges.js"));
const Buttons = lazy(() => import("./UI/admin/Buttons.js"));
const Cards = lazy(() => import("./UI/admin/Cards.js"));
const Grid = lazy(() => import("./UI/admin/Grid.js"));
const Tables = lazy(() => import("./UI/admin/Tables"));
const Forms = lazy(() => import("./UI/admin/Forms"));
const Breadcrumbs = lazy(() => import("./UI/admin/Breadcrumbs"));

function App() {
const studentId=useSelector(state=>state.auth.user)
  const studId=studentId?studentId?.user?.id_siswa:null;
  console.log(studId)


  const router=createBrowserRouter([
    { path: "/",
      id:"root",
      element: <RootLayout/>,
      errorElement:<ErrorPage/>,
      loader:tokenLoader,
      children:[
       {index:true ,element:<HomePage/>},
       {path:"student",
       id:"pinjam-kembali-booking-buku",
        element:<StudentAuth><CartProvider><StudentPage/></CartProvider></StudentAuth>,
         loader:(s)=>studentLoader(studId),
         action:batalPesananAction
      },
       {path:"library",
        children:[
          {index:true,
            id:'books',
          element:<GuestMode><LibraryPage/></GuestMode>,
          loader:booksLoader
        },
        {path:":bookId",
          id:"book-detail",
          element:<GuestMode><BookDetail/></GuestMode>,
          loader:bookLoader }

        ]},
       {path:"contactUs", element:<GuestMode><Contact/></GuestMode>,action:contactAction},
       {path:"logout", action:logoutAction},
       {path:"calender",
        id:"event-calender",
        loader:userCalenderLoader,
        children:[
          {index:true,
           element:<StudentAuth><EventPage/></StudentAuth>,
           action:eventAction}
        ]}
      ]
    },
    {
      path:"/admin",
      id:"root-admin",
      element:<AdminAuth><FullLayout/></AdminAuth>,
      errorElement:<ErrorAdminPage/>,
      children:[
        {index:true,element:<Starter/>},

        {path:"user",
          children:[
          {index:true,
            id:"admin-akun",
            element:<UserPage/>,
            loader:usersLoader,
            action:deleteUserAction

           },
           {path:":idAkun",
           id:"detail-akun",
           loader:userLoader,
           children:[
            {
              index:true,
              element:<DetailUser/>,

            },
            {
              path:"edit",
              action:editUserAction,
              element:<EditUser/>

            }
           ]}
        ]
         },

         {
          path:"books",
          children:[
            {index:true,
             id:"admin-buku",
             element:<BookTablePage/>,
             loader:adminBooksLoader,
             action:adminDeleteBookAction
             },
             {
              path:"create",
              element:<CreateBuku/>
             },
             {
              path:":bookId",
              id:"admin-detail-buku",
              loader:adminBookLoader,

              children:[
                {
                  index:true,
                  element:<DetailBuku/>,
                  action:editStokAction
                },
                {
                  path:"edit",
                  element:<EditBuku/>,
                  action:adminBookAction,

                }
            ]
             }
          ]
         },
         {
          path:"students",
          children:[
            {index:true,
             id:"admin-siswa",
             element:<StudentAdminPage/>,
             loader:adminStudentLoader,
             action:adminDeleteStudentAction
             },
             { path: "registrasi", element: <Registrasi />,
             children: [
               { path: "data-pribadi", element: <DataSiswa /> },
               { path: "data-kesehatan", element: <DataKesehatan /> },
               { path: "data-pendidikan", element: <DataPendidikan /> },
               { path: "data-ayah", element: <DataAyah /> },
               { path: "data-ibu", element: <DataIbu /> },
               { path: "data-wali", element: <DataWali /> },
               { path: "konfirmasi-data", element: <KonfirmasiData /> },
             ] },
             {
              path:":idSiswa",
              id:"detail-siswa",
              loader:studentDetailLoader,
              children:[
                {
                  index:true,
                  element:<DetailStudentPage/>,
                },
                {
                  path:"edit",
                  element:<EditStudentPage/>,
                  action:editSiswa,
                }
              ]
             },

          ]
         },
         {
          path:"borrowed-books",
          children:[
            {index:true,
             id:"admin-peminjaman",
             element:<DaftarBukuPinjamPage/>,
             loader:adminPinjamLoader,
             action:adminDeletePinjamAction
            },
            {
              path:"create",
              element:<CreatePinjam/>,
              loader:adminCreatePinjam,

            },
            {
              path:":pinjamId",
              id:"admin-detail-pinjam",
              loader:adminPinjamDetailLoader,
              children:[
                {
                  index:true,
                  element:<DetailPinjam/>,

                },
                {
                  path:"edit",
                  element:<EditPinjam/>
                }
              ]
             }
          ]
         },
          {
          path:"returned-books",
          children:[
            {index:true,
             id:"admin-pengembalian",
             element:<DaftarPengembalianBukuPage/>,
             loader:adminPengembalianLoader,
            },
            {
              path:":idPengembalian",
              id:"detail-pengembalian",
              children:[
                {
                  index:true,
                  element:<DetailPengembalianBuku/>
                },
                {
                  path:"edit",
                  element:<EditPengembalianBuku/>
                }
              ]
             }
          ]
         },
         {
          path:"booked-books",
          children:[
            {index:true,
             id:"admin-booking",
             element:<DaftarBookingBuku/>,
             loader:adminBookingLoader,
             action: adminDeleteBookingAction
            },
            // {
            //   path:":idPengembalian",
            //   id:"detail-pengembalian",
            //   children:[
            //     {
            //       index:true,
            //       element:<DetailPengembalianBuku/>
            //     },
            //     {
            //       path:"edit",
            //       element:<EditPengembalianBuku/>
            //     }
            //   ]
            //  }

          ]
         },
         {path:"calender",
          id:"admin-calender",
          loader:adminEventLoader,
        children:[
          {index:true,
           element:<AdminEventPage/>,
           action:adminEventAction}
        ]},
        {
          path:"log-buku",
          id:"admin-log-buku",
          loader:logbukuloader,
          index:true,
          element:<LogBuku/>,
         },
         {
          path:"log-buku-perpus",
          id:"admin-log-buku-perpus",
          loader:logbukuperpusloader,
          index:true,
          element:<LogBukuPerpus/>,
         },
         {
          path:"log-buku-thn-ajaran-baru",
          id:"admin-log-buku-thn-ajaran-baru",
          loader:loaderbukuajaranbaru,
          index:true,
          element:<LogBukuAjaranBaru/>,
         },
         {
          path:"log-pemesanan-buku",
          id:"admin-log-pemesanan",
          loader:logpemesananloader,
          index:true,
          element:<LogPemesanan/>,
         },




        /* { path: "about", exact: true, element: <About /> },
      { path: "alerts", exact: true, element: <Alerts /> },
      { path: "badges", exact: true, element: <Badges /> },
      { path: "buttons", exact: true, element: <Buttons /> },
      { path: "cards", exact: true, element: <Cards /> },
      { path: "grid", exact: true, element: <Grid /> },
      { path: "table", exact: true, element: <Tables /> },
      { path: "forms", exact: true, element: <Forms /> },
      { path: "breadcrumbs", exact: true, element: <Breadcrumbs /> }, */
      ]
    },
    {
      path:"/petugas",
      element:  <PetugasAuth><PetugasRoot/></PetugasAuth>  ,
      children:[
        {index:true,element:<PetugasPage/>},
        {path:"scan",
        element:<ScanPage/>,
        id:"scan-masuk",
        action:petugascreateAttendanceAction},
        {path:"scan-keluar",
        id:"scan-keluar",
        element:<ScanKeluarPage/>,
        action:petugasKeluarAttendanceAction},
        {path:"absensi",
         id:"petugas-absensi",

        children:[
          {index:"true",
          element:<AbsensiPage/>,
          loader:petugasAbsensiLoader,
          action:enterManualPetugasAction,
          },{
            path:"create",
            id:"create-absensi",
            element:<CreateAbsensi/>,
            loader:petugasCreateAbsensiLoader,
            action:enterPetugasAction,

          }
        ]},
        {path:"siswa",
          children:[
            {index:"true",element:<ScanSiswa/>,action:enterSiswaAction},
            {path:":idSiswa",element:<DetailPerpusSiswa/>,id:"petugas-pinjam-kembali-booking-buku",loader:petugasDetailSiswaLoader,action:batalPesanPetugasAction}
          ]}
      ]
    }

  ]);


  return (
    <>

    <RouterProvider  router={router}/>

    </>

  );
}

export default App;
