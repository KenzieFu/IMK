import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';
import { Badge, Popover, Whisper } from "rsuite"
import Calendar from 'rsuite/Calendar';
import 'rsuite/dist/rsuite.min.css';


export const EventCalender = ({pickDateHandler,pickCurrentDate,events,reset}) => {
 const userId= useSelector(state=>state.auth.user);
 
 const studId=userId?userId?.id_akun:null; 
 console.log(studId);
  const clickHandler=(date)=>{
    reset();
    const d=date.getDate();
    const m=date.getMonth();
    const y=date.getFullYear();
    const events =getTodoList(date)
    const dates={
      day:d,
      month:m,
      year:y
    }
  
    pickDateHandler(events); 
    pickCurrentDate(dates);
  }

  const checkData=(date1,date2)=>{
    const date=new Date(date1.tanggal_event);
    
    return userId.hak_akses==="Siswa"?(
      ((date.getDate() === date2.getDate()) && (date.getMonth() === date2.getMonth()) && (date.getFullYear() === date2.getFullYear()))
      &&
      (
        (date1.status ==="Publik" || (date1.status==="Privat" && (date1.id_akun!=null && date1.id_akun ===studId))) && date1.tipe ==="Siswa"
      )

    ):userId.hak_akses === "Guru"?(
      ((date.getDate() === date2.getDate()) && (date.getMonth() === date2.getMonth()) && (date.getFullYear() === date2.getFullYear()))
      &&
      (
        (date1.status ==="Publik" || (date1.status==="Privat" && (date1.id_akun!=null && date1.id_akun ===studId))) && date1.tipe ==="Guru"
      )

    )
    :((date.getDate() === date2.getDate()) && (date.getMonth() === date2.getMonth()) && (date.getFullYear() === date2.getFullYear()));

  }

    function getTodoList(date) {
        let items=events.filter((event)=>checkData(event,date))
        return items;
      }


    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 1);
    
        if (list.length) {
          const moreCount = list.length - displayList.length;
          const moreItem = (
            <li >
              <Whisper
                placement="top"
                trigger="click"
                speaker={
                  <Popover>
                    {list.map((item, index) => (
                      <p key={index}>
                        <b>{item.time}</b> - {item.title}
                      </p>
                    ))}
                  </Popover>
                }
              >
                <a>{moreCount} more</a>
              </Whisper>
            </li>
          );
    
          return (
            <ul style={{ listStyle:"none" }} className="calendar-todo-list">
              {displayList.map((item, index) => (
                <li  key={index}>
                  <Badge /> <b>{item.time}</b> - {item.title}
                </li>
              ))}
              {moreCount ? moreItem : null}
            </ul>
          );
        }
    
        return null;
      }
    
      return(
        <>
            <Calendar style={{ borderColor:"red",border:"solid 5px",borderRadius:"20px" }} onSelect={clickHandler} bordered={true}  renderCell={renderCell} />
        </>
      )
      
      
  
}
