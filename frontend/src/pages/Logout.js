import { redirect } from "react-router-dom";
import { json } from "react-router-dom";




export const action=async({ params, request })=>{

    /* const response= await fetch("http://localhost:8080/auth/logout",
    method); */
    const method=request.method;
    const response = await fetch("http://localhost:8080/auth/logout", {
        method: method,
        headers:{
          "Authorization":"Bearer"
        },
      });


    if(!response.ok)
    {
        throw json(
            { message: 'Gagal Logout.' },
            {
              status: 500,
            }
          );
    }
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    return response;
}