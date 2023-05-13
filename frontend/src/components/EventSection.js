import { useState } from 'react'
import { Paginate } from './Paginate/Paginate'
import classes from "./EventSection.module.css"
import { useSelector } from 'react-redux'
import { EventForm } from './Event/EventForm'
export const EventSection = ({selectedDate,currentDate,onPageHandler,currentIndex}) => {
const user=useSelector(state=>state.auth)
const [showCreate,setShowCreate]=useState(false);

const showHandler=()=>{
 setShowCreate(prev=>!prev);
 console.log(showCreate)
}

let display=selectedDate.map((item,index)=>{if(index === currentIndex)return(


<>
  <div style={{ display:"flex", justifyContent:"space-between" }}>
    <div></div>
    {user.isAuth &&<div>
      {user.user?.id_akun ===item.id_akun && <span>Edit</span>}
      {user.user?.id_akun ===item.id_akun && <span>Delete</span>}
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
{ !showCreate && <>

  {selectedDate.length !=0 &&
  <>

    {display}
    <div style={{ display:"flex",justifyContent:"space-between" }}>
      <div>
        <Paginate items={selectedDate} itemsPerPage={1} onPageChange={onPageHandler} />
      </div>
      <div>
        {user.isAuth &&
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
      <button onClick={showHandler}>CreateEvent</button>
    </div>
  </>
  }
  </>}
  {showCreate && <EventForm/>}

</div>
)
}