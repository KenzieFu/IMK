import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'
import classes from '../../../pages/Admin/adminbatch.module.css';

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
           <Form method='post' className={classes['form']}>
            <div className={classes['alert-grup']}>
           <input hidden type="number" id='id' name='id' value={props.id} />
           <div style={{marginLeft: "115px"}}>Buku akan dikembalikan, apakah anda yakin ?</div>
           <div className={classes['batchbut1']}>
             <div disabled={isSubmitting} onClick={props.onClose} className={classes['modbut-cel']}>Batalkan</div>
             <button disabled={isSubmitting} onClick={(e)=>startDeleteHandler(e)} className={classes['modbut-del']} >{isSubmitting?"Loading...":"Yakin"}</button>
           </div>
            </div>
         </Form>


    </Modal>
  )
}








