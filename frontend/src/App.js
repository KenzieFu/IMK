
import "./App.css"

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RootLayout } from './pages/Root';

import {StudentPage} from './pages/StudentPage'
import { LibraryPage } from "./pages/LibraryPage";
import  BookDetail, { loader } from './pages/BookDetails'
import Contact from "./pages/ContactPage";
import Registrasi from "./pages/FormRegistrasi/regristrationForm";

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




//Admin loader

// Books
import { loader as adminBooksLoader } from "./pages/Admin/BookTablePage"; //books
import { loader as adminBookLoader } from "./pages/Admin/DetailBuku";

//Students
import { loader as adminStudentLoader } from "./pages/Admin/StudentPage";

//Buku Pinjam
import { loader as adminPinjamLoader } from "./pages/Admin/DaftarBukuPinjamPage";

//Admin Action

//Buku
import { action as adminDeleteBookAction } from "./pages/Admin/BookTablePage";
//Siswa
import { action as adminDeleteStudentAction } from "./pages/Admin/StudentPage";
//Buku Pinjam
import { action as adminDeletePinjamAction } from "./pages/Admin/DaftarBukuPinjamPage";







import { DetailBuku } from "./pages/Admin/DetailBuku";
import { DetailStudentPage } from "./pages/Admin/DetailStudentPage";
import { EditStudentPage } from "./pages/Admin/EditStudentPage";
import { CreateSiswa } from "./pages/Admin/CreateSiswa";
import { DaftarBukuPinjamPage } from "./pages/Admin/DaftarBukuPinjamPage";
import { DetailPinjam } from "./pages/Admin/DetailPinjam";
import { EditPinjam } from "./pages/Admin/EditPinjam";
import { DaftarPengembalianBukuPage } from "./pages/Admin/DaftarPengembalianBukuPage";
import { CreatePinjam } from "./pages/Admin/CreatePinjam";
import { DetailPengembalianBuku } from "./pages/Admin/DetailPengembalianBuku";
import { EditPengembalianBuku } from "./pages/Admin/EditPengembalianBuku";
import { CreateBuku } from "./pages/Admin/CreateBuku";
import { EditBuku } from "./pages/Admin/EditBuku";
import { EventPage } from "./pages/EventPage";


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
  

  const router=createBrowserRouter([
    { path: "/",
      id:"root",
      element: <RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
       {index:true ,element:<HomePage/>},
       {path:"student",
       id:"pinjam-kembali-buku",
        element:<StudentPage/>,
         loader:(s)=>studentLoader(studId)
      },
       {path:"library", 
        children:[
          {index:true,
            id:'books',
          element:<LibraryPage/>,
          loader:booksLoader
        },
        {path:":bookId",
          id:"book-detail",
          element:<BookDetail/>,
          loader: bookLoader }

        ]},
       {path:"contactUs", element:<Contact/>},
       {path:"regis", element:<Registrasi/>},
       {path:"logout"},
       {path:"calender", element:<EventPage/>}
      ]
    },
    {
      path:"/admin",
      id:"root-admin",
      element:<FullLayout/>,
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
                  element:<DetailBuku/>
                },
                {
                  path:"edit",
                  element:<EditBuku/>
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
             {
              path:"create",
              element:<CreateSiswa/>
             },
             {
              path:":idSiswa",
              id:"detail-siswa",
              children:[
                {
                  index:true,
                  element:<DetailStudentPage/>
                },
                {
                  path:"edit",
                  element:<EditStudentPage/>
                }
              ]
             }
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
              element:<CreatePinjam/>
            },
            {
              path:":idPinjam",
              id:"detail-pinjam",
              children:[
                {
                  index:true,
                  element:<DetailPinjam/>
                },
                {
                  path:"edit",
                  element:<EditPinjam/>
                }
              ]
             }
            
          ]
         },
         /* {
          path:"returned-books",
          children:[
            {index:true,
             id:"admin-pengembalian",
             element:<DaftarPengembalianBukuPage/>,
             
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
         }, */




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
    }
   
  ]);
  

  return (
    <>
    
    <RouterProvider  router={router}/>
      
    </>
  
  );
}

export default App;
