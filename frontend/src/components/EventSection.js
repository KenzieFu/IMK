import React from 'react'

export const EventSection = ({selectedDate,currentDate}) => {
  let display=selectedDate.map((item)=><span>{item.time} -- {item.title}</span>)
  return (
    <>
    {selectedDate.length !=0 &&
      <div>
      <span>{currentDate.day}</span>
      {display}
     
  </div>
    }
    {
      selectedDate.length === 0 &&

      <>
        <div>
          <span>{currentDate.day}</span>
        </div>
      </>
    }
      
    </>
  )
}
