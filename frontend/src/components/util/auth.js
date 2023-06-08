import { redirect } from "react-router-dom";



export const getAuthToken=()=>{
    const token = localStorage.getItem('token');
   
    if(!token)
    {
        return null;
    }

    const tokenDuration= getTokenDuration();
    console.log(tokenDuration)


    if(tokenDuration < 0)
    return "EXPIRED";

    return token;
}

export const getUserCredentials=()=>{
    const user= localStorage.getItem('user');
    const parsed=JSON.parse(user);
    console.log(parsed)
    return parsed
}

export const tokenLoader=()=>{
    return getAuthToken();
}

export const checkAuthLoader=()=>{
    const token = getAuthToken();
    
    if(!token)
    {
        
        return redirect('/auth');
    }
    return null;
}

export const getTokenDuration=()=>{
    const storedExpirationDate= localStorage.getItem('expiration');
    const expirationDate= new Date(storedExpirationDate);

    const now =new Date();
    const duration = expirationDate.getTime()- now.getTime();

    return duration;
}