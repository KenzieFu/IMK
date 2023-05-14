import { useRef, useState } from 'react'
import { Paginate } from './Paginate/Paginate'
import classes from "./EventSection.module.css"
import { useSelector } from 'react-redux'
import { EventForm } from './Event/EventForm'
import { Form, useSubmit } from 'react-router-dom'
export const EventSection = ({selectedDate,currentDate,onPageHandler,currentIndex,updateListHandler}) => {
  const submit=useSubmit();
  
const user=useSelector(state=>state.auth)
const [showCreate,setShowCreate]=useState(false);
const [showEdit,setShowEdit]=useState(false);
console.log(currentDate);

const showHandler=()=>{
 setShowCreate(prev=>!prev);
 
}
const showEditHandler=()=>{
 setShowEdit(prev=>!prev);
 
}

const deleteHandler=(e,id)=>{
  submit(e.currentTarget,{method:"DELETE"});
  deleteUpdateList();
  onPageHandler(1);

}


const deleteUpdateList=()=>{
  const updatedList=selectedDate.filter((item,index)=>index !=currentIndex);
  updateListHandler(updatedList);
} 

const updatedEventHandler=(updatedEvents)=>{
  
  const currentEventIndex=selectedDate.findIndex((item)=>item.id_event === updatedEvents.id_event);
  const updatedLists=selectedDate;
  updatedLists[currentEventIndex]=updatedEvents;

updateListHandler(updatedLists);
}



let display=selectedDate.map((item,index)=>{if(index === currentIndex)return(


<>
  <div style={{ display:"flex", justifyContent:"space-between" }}>
    <div></div>
    {user.isAuth &&<div>
      {user.user?.id_akun ===item.id_akun &&
          <button onClick={showEditHandler}>Edit</button>
      }
      {user.user?.id_akun ===item.id_akun && 
      <Form method='Delete'>
        <input type="text" name='id_event' value={selectedDate[currentIndex].id_event} />
        <button type='submit' onClick={(e)=>deleteHandler(e)}>Delete</button>
      </Form>
      }
    </div>}
  </div>

  <div>
    <div>{item.tipe} -- {item.title_event}</div>
    <div>{item.content_event}</div>
    <div>{item.tanggal_event}</div>
    <div>{item.status}</div>
  </div>
</>




)}

);




return (
<div className={classes["box-section"]}>
{ !showCreate && !showEdit && <>

  {selectedDate.length !=0 &&
  <>

    {display}
    <div style={{ display:"flex",justifyContent:"space-between" }}>
      <div>
        <Paginate items={selectedDate} itemsPerPage={1} onPageChange={onPageHandler} />
      </div>
      <div>
        {user.isAuth && currentDate &&
        <button onClick={showHandler}>Create Event</button>}
      </div>

    </div>
  </>
  }
  {
  selectedDate.length === 0 &&

  <>
    <div>
      <span>{currentDate.day}</span>
      <span>{currentDate.month}</span>
      <span>{currentDate.year}</span>
      {user.isAuth && currentDate.length != 0 && <button onClick={showHandler}>CreateEvent</button>}
    </div>
  </>
  }
  </>}
  {showCreate && !showEdit && <EventForm label="Create" method="POST" currentDate={currentDate} onClose={showHandler}>
      <input type="hidden" name='type' value="create" />

      <input type="hidden" name='id_akun'  value={user.user.id_akun} />
      <input type="hidden" name='status' value="Privat"/>
      <input type="hidden" name='tipe' value="Siswa"/>
    </EventForm>}
  {!showCreate && showEdit && <EventForm label="Save" changeList={updatedEventHandler} event={selectedDate[currentIndex]} method="PUT" currentDate={currentDate} onClose={showEditHandler}>
 
      <input type="hidden" name='id_akun'  value={user.user.id_akun} />
      <input type="hidden" name='id_event'  value={selectedDate[currentIndex].id_event} />
    </EventForm>}

</div>
)
}