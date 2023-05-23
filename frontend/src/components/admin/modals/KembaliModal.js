import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'

export const KembaliModal = (props) => {
  const location=useLocation();
  const navigate=useNavigate();
  const navigation = useNavigation()
  const submit =useSubmit();

  const isSubmitting = navigation.state === "submitting";

const startDeleteHandler=async(e)=>{

  submit(e.currentTarget,{method:"post"});
  props.onClose();

}

  return (
    <Modal>
           <Form method='post'>
           <input hidden type="number" id='id' name='id' value={props.id} />
           <div>Apa Anda Yakin ?</div>
           <div style={{ display:"flex" }}>
             <div disabled={isSubmitting} onClick={props.onClose}>Cancel</div>
             <button disabled={isSubmitting} onClick={(e)=>startDeleteHandler(e)} >{isSubmitting?"Loading...":"Yakin"}</button>
           </div>
         </Form>


    </Modal>
  )
}








