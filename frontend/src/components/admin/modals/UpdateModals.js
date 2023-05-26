import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'

export const UpdateModal = (props) => {
  const location=useLocation();
  const navigate=useNavigate();
  const navigation = useNavigation()
  const submit =useSubmit();

  const isSubmitting = navigation.state === "submitting";

const startUpdateHandler=async(e)=>{

  props.onUpdate()
  props.onClose()
}

  return (
    <Modal>
           <div>Apa Anda Yakin ?</div>
           <div style={{ display:"flex" }}>
             <div disabled={isSubmitting} onClick={props.onClose}>Cancel</div>
             <button disabled={isSubmitting} onClick={(e)=>startUpdateHandler(e)} >{isSubmitting?"Loading...":"Yakin"}</button>
           </div>

    </Modal>
  )
}








