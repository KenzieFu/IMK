import React, { useState } from 'react'
import { Form, Link, useSubmit } from 'react-router-dom'
import Select from 'react-select'
export const FormAbsensi = ({students}) => {
  const [currentStudent,setCurrentStudent]=useState(0)
  const submit =useSubmit();
  const changeStudent=(index)=>{
    setCurrentStudent(index);
  }
  console.log(currentStudent)
  let current=students.find(x=>x.nisn === currentStudent.value);
  let value=students.map(item=>{
    return{value:item.nisn, label:`${item.nisn} --- ${item.nama_lengkap}`}
  })

  const submitHandler=(e)=>{
    submit(null,{method:"POST"})
  }
  
  return (
    <>
        <Form>

            <div style={{ display:"flex"}}>
              <div>
              <label htmlFor="nisn">Siswa</label>
            <Select required id='nisn' name='nisn' options={value} onChange={changeStudent}/>
              </div>
              { current &&
                  <div>
                  Name:{current?.nama_lengkap} 
                  NISN:{current?.nisn}
                  Jenis Kelamin:{current?.jenis_kelamin}
                  Tanggal Lahir:{current?.tanggal_lahir}
                </div>
              }
            </div>

            <div>
              <Link to="..">Back</Link>
              <button>Create</button></div>
            
        </Form>
    </>
  )
}
