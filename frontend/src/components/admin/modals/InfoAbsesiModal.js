import Modal from '../../../UI/Modal'
import React from 'react'
import { Form, json, redirect, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router-dom'

export const InfoAbsensiModal = (props) => {
  const current=new Date().toLocaleTimeString;




  return (
    <Modal onClose={props.onClose}>
           <div>
                <div>
                    Nama :Kenzie 
                    NISN:211402139
                </div>
                <div>
                    Memasuki perpustakaan
                    <span>{current}</span>
                    </div>
                <button onClick={props.onClose}>Close</button>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eos inventore at earum molestias exercitationem sed consequuntur dolorum, delectus provident excepturi tempore facilis eveniet laborum incidunt accusamus neque veniam iste!</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quas dolor aspernatur aliquid provident! Ratione incidunt quia dolores quos culpa velit! Nam vel ab pariatur dolore itaque doloribus ducimus rem.
                Saepe dolore nulla maiores laboriosam exercitationem pariatur adipisci, molestiae incidunt blanditiis aspernatur porro ratione quos excepturi nihil est illum eveniet doloremque ipsum voluptatibus voluptatem labore sequi eaque repellat? Sit, facilis!
                Nesciunt deserunt illo ratione eligendi quas voluptate consectetur officiis, quod tenetur ipsum explicabo pariatur facere rem exercitationem vitae cupiditate, earum iure quis ducimus adipisci consequuntur! Aut dolorem nobis vero provident.
                Dicta, aliquam autem laudantium neque alias architecto asperiores eos ad quos odit distinctio ratione voluptas quisquam cupiditate pariatur eveniet voluptates totam error iste expedita ut itaque mollitia. Nulla, in a?
                Quod dolore possimus recusandae nulla nobis exercitationem veniam alias officiis adipisci nisi obcaecati a numquam dolores deserunt nam doloremque, debitis aut maxime praesentium modi porro, tempore facilis tempora doloribus. Cumque?</div>
           </div>
     
    </Modal>
  )
}

