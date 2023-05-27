import React, { useState } from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import Select from "react-select";
import classes from "../../pages/Admin/adminbatch.module.css";
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";
export const FormAbsensi = ({ students, method }) => {
  const [currentStudent, setCurrentStudent] = useState(0);
  const submit = useSubmit();
  const changeStudent = (index) => {
    setCurrentStudent(index);
  };

  let current = students.find((x) => x.nisn === currentStudent.value);
  let value = students.map((item) => {
    return { value: item.nisn, label: `${item.nisn} --- ${item.nama_lengkap}` };
  });

  return (
    <>
      <Form method={method} className={classes["form"]} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className={classes["from-grup"]}>
          <FormGroup>
            <Label className={classes["label"]} for="siswa" style={{ justifyContent: "center", alignItems: "center" }}>
              Siswa
            </Label>
            <Input id="siswa" name="nisn" onChange={changeStudent} type="select" style={{ width: "350px" }}>
              {/* option looping {value} */}
              {value.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </Input>
          </FormGroup>

          {/* <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="nisn" className={classes["label"]}>
              Siswa
            </label>
            <Select required id="nisn" name="nisn" options={value} onChange={changeStudent} />
          </div>
          {current && (
            <div>
              Name:{current?.nama_lengkap}
              NISN:{current?.nisn}
              Jenis Kelamin:{current?.jenis_kelamin}
              Tanggal Lahir:{current?.tanggal_lahir}
            </div>
          )}
        </div> */}
          <div className={classes["batchbut1"]}>
            {/* <Link to="..">Back</Link> --> perubahan */}
            <Button type="button" className={classes["delbut"]} onClick={() => window.history.back()}>
              Kembali
            </Button>
            <Button type="submit" className={classes["savbut"]}>
              Tambahkan
            </Button>
          </div>
        </div>
        {/* <div>
          
          <button>Create</button>
        </div> */}
      </Form>
    </>
  );
};
