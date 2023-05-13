import React from 'react'
import { Input } from '../../UI/Input'
import { Form } from 'react-router-dom'
export const EventForm = () => {
  return (
    <>
        <Form>
            <Input name="title_event" label="Judul Event" id="judul" type="text"/>
            <Input name="title_event" label="Judul Event" id="judul" type="text"/>
        </Form>
    </>
  )
}
