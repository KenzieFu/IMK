import React, {  useState } from 'react'

const useInput=(validateValue)=> {
    const [enteredValue,setEnteredValue]=useState('');
    const [isTouched,setIsTouched]=useState(false);
    let errorMessage;
    
    const errorHandler=(err)=>{
        errorMessage=err;
    }
    const valueIsValid=validateValue(enteredValue,errorHandler) ?? false;
 
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler=(event)=>{
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler=(event)=>{
        setIsTouched(true);
    }

    const inputReset=()=>{
        setEnteredValue("");
    }

    

    return{
        value:enteredValue,
        hasError,
        valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        errMsg:errorMessage,
        inputReset
    }
}

export default useInput
