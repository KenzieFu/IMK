import React, { useRef } from 'react'
import { Input } from '../../UI/Input'
import { Form, useSubmit } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const EventForm = ({onClose,currentDate,method,children,event,changeList,label}) => {
  const submit=useSubmit();

  const month =currentDate.month+1;
  
  const convertDate=`${currentDate.year}-${('0'+month).slice(-2)}-${('0'+currentDate.day).slice(-2)}`
 const formData=useRef();
  const submitHandler=(e)=>{
 
    submit(e.currentTarget,{method:method});
    if(method ==="PUT")
    {
  
      const {title_event,content_event,tanggal_event}=formData.current;
    const updatedEvents={
      title_event:title_event.value,
      content_event:content_event.value,
      tanggal_event:tanggal_event.value,
      id_akun:event.id_akun,
      status:"Privat",
      tipe:"Siswa",
      id_event:event.id_event
    };
    console.log(updatedEvents)
    
      changeList(updatedEvents);
      console.log("updated")
    }
    onClose();
    
  }
  
  return (
    <>
        <Form ref={formData} method={method}>
            {children}
          
            <Input name="title_event" label="Judul Event" id="judul" type="text"  defaultValue={event?event.title_event:""}/>
            <Input name="content_event"  label="Deskripsi Event" id="desc" type="textarea"  defaultValue={event?event.content_event:""}/>
            <Input type="date" label="Tanggal Event"  id="date" name="tanggal_event" addAttribute={{ value:convertDate }} />
            <button onClick={onClose}>Cancel</button>
            <button onClick={(e)=>submitHandler(e)}>{label}</button>
        </Form>
        
    </>
  )
}
