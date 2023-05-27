import React, { useRef } from 'react'
import { Input } from '../../UI/Input'
import { Form, useSubmit } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classes from "./EventForm.module.css"
import { Label } from "reactstrap";
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
            <div className={classes['form']}>
              <div className={classes['form-grup']}>
            <Label for="judul">Judul Event</Label>          
            <Input  name="title_event" id="judul" type="text"  defaultValue={event?event.title_event:""}/>
            <Label for="desc">Deskripsi Event</Label> 
            <textarea className={classes['textarea1']} name="content_event" id="desc" rows={10} cols={5} defaultValue={event?event.content_event:""}/>
            <Label for="date">Tanggal Event</Label> 
            <Input type="date" id="date" name="tanggal_event" addAttribute={{ value:convertDate }} />
            </div> </div>
            <div className={classes['batchbut1']} > 
            <button className={classes['delbut']} onClick={onClose}>Cancel</button>
            <button className={classes['savbut']} onClick={(e)=>submitHandler(e)}>{label}</button>
            </div> 
        </Form>
        
    </>
  )
}
