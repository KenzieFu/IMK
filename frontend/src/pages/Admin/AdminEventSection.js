import { useRef, useState } from 'react'
import { Paginate } from '../../components/Paginate/Paginate'
import classes from "./AdminEventSection.module.css"
import { useSelector } from 'react-redux'
import { Form, useSubmit } from 'react-router-dom'
import { EventForm } from '../../components/Event/EventForm'
import { date } from 'yup'
import { format } from 'date-fns';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
export const AdminEventSection = ({selectedDate,currentDate,onPageHandler,currentIndex,updateListHandler}) => {
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

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggleDropdown = () => {
  setDropdownOpen(!dropdownOpen);
};

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
<div className={classes['container']}>
<div className={classes['left']}>
    <div className={classes['bungkus']}>
    <div className={classes['garis']}></div>
    <div className= {classes.title_item}>{item.tipe} -- {item.title_event}</div> </div>
    <div className= {classes.details}>Details</div>
    <div className= {classes.content_event}><i class="fa fa-bars" aria-hidden="true"></i>{item.content_event}</div>
    <div className= {classes.calendar}><i class="fa fa-calendar-check-o" aria-hidden="true"></i> {item.tanggal_event}</div>
    <div className= {classes.status}>{item.status}</div>
  </div> 
  <div className={classes['right']}>
  <div className={classes['downdown']}>
  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className={classes['dropdown2']}>
            <i class="fa fa-pencil" aria-hidden="true"></i> Aksi
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={showEditHandler} className="box-menu">
                Edit
              </DropdownItem>
              {user.isAuth && user.user?.hak_akses ==="Admin" &&
              <Form method='Delete'>
              <input
              type="text" name='id_event' value={selectedDate[currentIndex].id_event} hidden />
              {/* <button type='submit' onClick={(e)=>deleteHandler(e)}></button> */}
              <DropdownItem onClick={(e)=>deleteHandler(e)} className="box-menu">
                Delete
              </DropdownItem>
              </Form>}
              <DropdownItem onClick={showHandler} className="box-menu">
                Create
              </DropdownItem>
              {/* <DropdownItem onClick={() => setSearchBased("kasir")} className="box-menu">
                Kasir
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
          </div>
          </div>
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
      <div >
        <Paginate style={{backgroundColor:"transparent"}} items={selectedDate} itemsPerPage={1} onPageChange={onPageHandler} />
      </div>
      {/* <div>
        {user.isAuth && currentDate &&
        <button onClick={showHandler}></button>}
      </div> */}
  </>
  }
  {
  selectedDate.length === 0 &&

  <>
    <div>
      {/* <span>{currentDate.day}</span>
      <span>{currentDate.month}</span>
      <span>{currentDate.year}</span> */}
      {user.isAuth && currentDate.length != 0 && <button className={classes['crtbut']} onClick={showHandler}>CreateEvent</button>}
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