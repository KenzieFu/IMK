import { useAppState } from "../../hooks/save-input";
import { Sidebar } from "../../UI/Sidebar";
import React from "react";
import { useForm } from "react-hook-form";
import classes from './regristrationForm.module.css'
import { Link } from "react-router-dom";
import Stepper from 'react-stepper-horizontal'
import ConfirmModal from "./modal/confirm_submit";
import { useState } from "react";
import SubmittedModal from "./modal/submited_modal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const KonfirmasiData = () => {

    const notify = () => toast.success('Data calon siswa telah disubmit!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const {state} = useAppState();
    const { steps } = useAppState();
    const {ada_wali} = useAppState()
    const navigate = useNavigate();

    const activeStep = 6


    const [showConfirm, setShowConfirm] = useState(false);

  const closeConfirmModal = () => {
    setShowConfirm(false);
  }

  const showConfirmModal = () => {
    setShowConfirm(true);
  }

  let url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/calon-siswa';

 const [isSubmitted, setIsSubmitted] = useState(false)

    const formSubmitHandler = async () => {
        setShowConfirm(false)
        try {
            // const formDataToSend = new FormData();
            // nisn', state.nisn);
            // nama_lengkap', state.nama_siswa);
            // jenis_kelamin', state.kelamin);
            // tanggal_lahir', state.tglLahir);
            // tempat_lahir', state.tptLahir);
            // kelas', state.diterima);
            // agama', state.agama);
            // alamat', state.alamat_rumah);
            // nomor_telepon', state.no_HP_siswa);
            // email', state.email_siswa);

            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Authorization":"Bearer"
              },
              body: JSON.stringify({
                dataCalonSiswa: {

                nama_calon: state.nama_siswa,
                nik_calon: state.nik_siswa,
                no_akte_lahir: state.no_akteLahir,
                tempat_lahir: state.tptLahir,
                tanggal_lahir: state.tglLahir,
                alamat: state.alamat_rumah,
                gender: state.kelamin,
                agama: state.agama,
                warga_negara: state.warga_negara,
                anak_ke: state.anak_ke,
                jlh_saudara_kandung: state.jmlh_saudara,
                no_hp: state.no_HP_siswa,
                email: state.email_siswa,
            },
            dataOrtuAyah: {
                tipe: "Ayah",
                nama_lengkap: state.nama_ayah,
                nik: state.nik_ayah,
                tempat_lahir: state.tpt_lahir_ayah,
                tanggal_lahir: state.tgl_lahir_ayah,
                agama: state.agama_ayah,
                pendidikan_terakhir: state.pendidikan_ayah,
                pekerjaan: state.pekerjaan_ayah,
                penghasilan_per_bulan: state.penghasilan_ayah,
                alamat: state.alamat_rumah,
                no_hp: state.no_HP_ayah,
                email: state.email_ayah,
                status:state.status_ayah
            },
            dataOrtuIbu: {
                tipe: "Ibu",
                nama_lengkap: state.nama_ibu,
                nik: state.nik_ibu,
                tempat_lahir: state.tpt_lahir_ibu,
                tanggal_lahir: state.tgl_lahir_ibu,
                agama: state.agama_ibu,
                pendidikan_terakhir: state.pendidikan_ibu,
                pekerjaan: state.pekerjaan_ibu,
                penghasilan_per_bulan: state.penghasilan_ibu,
                alamat: state.alamat_rumah,
                no_hp: state.no_HP_ibu,
                email: state.email_ibu,
                status:state.status_ibu
            },
            dataOrtuWali: {
                tipe: "Wali",
                nama_lengkap: state.nama_wali,
                nik: state.nik_wali,
                tempat_lahir: state.tpt_lahir_wali,
                tanggal_lahir: state.tgl_lahir_wali,
                agama: state.agama_wali,
                pendidikan_terakhir: state.pendidikan_wali,
                pekerjaan: state.pekerjaan_wali,
                penghasilan_per_bulan: state.penghasilan_wali,
                alamat: state.alamat_rumah,
                no_hp: state.no_HP_wali,
                email: state.email_wali,
            },
            keteranganKesehatan: {
                golongan_darah: state.goldar,
                berat_badan: state.berat_badan,
                tinggi_badan: state.tinggi_badan,
                penyakit_dulu: state.penyakit,
                cacat_jasmani: state.cacat_jasmani
            },
            keteranganPendidikan: {
                nisn: state.nisn,
                nama_sekolah_sebelumnya: state.sklh_lama,
                diterima_di_kelas: state.diterima,
                no_ijazah: state.no_ijazah,
                tgl_ijazah: state.tgl_ijazah
            }

        })

            });

            const createdData = await response.json();
            console.log('Data created:', createdData);
            navigate("/admin/students")
            notify()

          } catch (error) {
            console.error('Error creating data:', error);
          }

            console.log(state.nisn)

    }

    const closeSubmitModal = () => {
      /*   navigate('../..') */
       setIsSubmitted(false);
      }

    return (
        <React.Fragment>
            <div className={classes.content}>
                <div className={classes.content_inner}>
                <Stepper
                    steps={steps}
                    activeStep={activeStep} />
                    <form onSubmit={formSubmitHandler}>
                        <div>
                            <h3>Konfirmasi Data</h3>
                        </div>
                        <fieldset>
                            <legend><h4>Data Siswa</h4></legend>
                           <table>
                            <tr>
                                <td>Nama Lengkap Siswa</td>
                                <td>: {state.nama_siswa}</td>
                            </tr>
                            <tr>
                                <td>NIK Siswa</td>
                                <td>: {state.nik_siswa}</td>
                            </tr>
                            <tr>
                                <td>No Akte Lahir</td>
                                <td>: {state.no_akteLahir}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>: {state.agama}</td>
                            </tr>
                            <tr>
                                <td>Tempat, tanggal lahir</td>
                                <td>: {state.tptLahir}, {state.tglLahir}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>: {state.kelamin}</td>
                            </tr>
                            <tr>
                                <td>Warga Negara</td>
                                <td>: {state.warga_negara}</td>
                            </tr>
                            <tr>
                                <td>Anak Ke-</td>
                                <td>: {state.anak_ke}</td>
                            </tr>
                            <tr>
                                <td>Jumlah Saudara Kandung</td>
                                <td>: {state.jmlh_saudara}</td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>: {state.alamat_rumah}</td>
                            </tr>
                            <tr>
                                <td>No.HP/Whatsapp</td>
                                <td>: {state.no_HP_siswa}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: {state.email_siswa}</td>
                            </tr>
                           </table>
                           <legend > <Link to="../data-pribadi">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>
                        </fieldset>
                        <fieldset>
                            <legend><h4>Data Kesehatan Siswa</h4></legend>
                           <table>
                            <tr>
                                <td>Golongan Darah</td>
                                <td>: {state.goldar}</td>
                            </tr>
                            <tr>
                                <td>Berak Badan</td>
                                <td>: {state.berat_badan} kg</td>
                            </tr>
                            <tr>
                                <td>Tinggi Badan</td>
                                <td>: {state.tinggi_badan} cm</td>
                            </tr>
                            <tr>
                                <td>Penyakit yang pernah diderita</td>
                                <td>: {state.penyakit}</td>
                            </tr>
                            <tr>
                                <td>Cacat Jasmani</td>
                                <td>: {state.cacat}</td>
                            </tr>
                           </table>
                           <legend > <Link to="../data-kesehatan">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>
                        </fieldset>
                        <fieldset>
                            <legend><h4>Data Pendidikan Siswa</h4></legend>
                           <table>
                            <tr>
                                <td>NISN Siswa</td>
                                <td>: {state.nisn}</td>
                            </tr>
                            <tr>
                                <td>Nama Sekolah Lama</td>
                                <td>: {state.sklh_lama}</td>
                            </tr>
                            <tr>
                                <td>Diterima di sekolah ini di kelas</td>
                                <td>: {state.diterima}</td>
                            </tr>
                            <tr>
                                <td>No. Ijazah Terakhir</td>
                                <td>: {state.no_ijazah}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Penerbitan Ijazah Terakhir</td>
                                <td>: {state.tgl_ijazah}</td>
                            </tr>
                           </table>
                           <legend > <Link to="../data-pendidikan">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>

                        </fieldset>
                        <fieldset>
                            <legend><h4>Data Ayah Kandung</h4></legend>
                           <table>
                            <tr>
                                <td>Nama Ayah</td>
                                <td>: {state.nama_ayah}</td>
                            </tr>
                            <tr>
                                <td>NIK Ayah</td>
                                <td>: {state.nik_ayah}</td>
                            </tr>
                            <tr>
                                <td>Tempat, tanggal lahir</td>
                                <td>: {state.tpt_lahir_ayah}, {state.tgl_lahir_ayah}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>: {state.agama_ayah}</td>
                            </tr>
                            <tr>
                                <td>Warga Negara</td>
                                <td>: {state.warga_negara_ayah}</td>
                            </tr>
                            <tr>
                                <td>Pendidikan</td>
                                <td>: {state.pendidikan_ayah}</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>: {state.pekerjaan_ayah}</td>
                            </tr>
                            <tr>
                                <td>Penghasilan per-bulan Ayah</td>
                                <td>: {state.penghasilan_ayah}</td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>: {state.alamat_ayah}</td>
                            </tr>

                            <tr>
                                <td>No.HP/Whatsapp</td>
                                <td>: {state.no_HP_ayah}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: {state.email_ayah}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: {state.status_ayah}</td>
                            </tr>
                           </table>
                           <legend > <Link to="../data-ayah">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>
                        </fieldset>
                        <fieldset>
                            <legend><h4>Data Ibu Kandung</h4></legend>
                           <table>
                            <tr>
                                <td>Nama Ibu</td>
                                <td>: {state.nama_ibu}</td>
                            </tr>
                            <tr>
                                <td>NIK Ibu</td>
                                <td>: {state.nik_ibu}</td>
                            </tr>
                            <tr>
                                <td>Tempat, tanggal lahir</td>
                                <td>: {state.tpt_lahir_ibu}, {state.tgl_lahir_ibu}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>: {state.agama_ibu}</td>
                            </tr>
                            <tr>
                                <td>Warga Negara</td>
                                <td>: {state.warga_negara_ibu}</td>
                            </tr>
                            <tr>
                                <td>Pendidikan</td>
                                <td>: {state.pendidikan_ibu}</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>: {state.pekerjaan_ibu}</td>
                            </tr>
                            <tr>
                                <td>Penghasilan per-bulan ibu</td>
                                <td>: {state.penghasilan_ibu}</td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>: {state.alamat_ibu}</td>
                            </tr>

                            <tr>
                                <td>No.HP/Whatsapp</td>
                                <td>: {state.no_HP_ibu}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: {state.email_ibu}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>: {state.status_ibu}</td>
                            </tr>
                           </table>
                           <legend > <Link to="../data-ibu">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>
                        </fieldset>

                        <fieldset>
                        <legend><h4>Data Wali</h4></legend>

                            {
                            !ada_wali &&
                                <>
                           <table>
                            <tr>
                                <td>Nama Wali</td>
                                <td>: {state.nama_wali}</td>
                            </tr>
                            <tr>
                                <td>NIK Wali</td>
                                <td>: {state.nik_wali}</td>
                            </tr>
                            <tr>
                                <td>Tempat, tanggal lahir</td>
                                <td>: {state.tpt_lahir_wali}, {state.tgl_lahir_wali}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>: {state.agama_wali}</td>
                            </tr>
                            <tr>
                                <td>Warga Negara</td>
                                <td>: {state.warga_negara_wali}</td>
                            </tr>
                            <tr>
                                <td>Pendidikan</td>
                                <td>: {state.pendidikan_wali}</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>: {state.pekerjaan_wali}</td>
                            </tr>
                            <tr>
                                <td>Penghasilan per-bulan wali</td>
                                <td>: {state.penghasilan_wali}</td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>: {state.alamat_wali}</td>
                            </tr>

                            <tr>
                                <td>No.HP/Whatsapp</td>
                                <td>: {state.no_HP_wali}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: {state.email_wali}</td>
                            </tr>
                           </table>
                           </>
                        }
                        {ada_wali && <h3>Tidak ada wali</h3>}
                        <legend > <Link to="../data-wali">
                            <div className={classes.button_edit}>
                            <button className={classes.edit} type="button">
                                   Edit
                            </button>
                            </div>
                            </Link></legend>
                        </fieldset>

                        <div className={classes.button} style={{marginTop:"20px"}}>
                        <Link to="../data-wali">
                            <button className={classes.cancel} type="button">
                                    {"<"} Sebelumnya
                            </button>
                            </Link>
                            <button className={classes.submit} type="button" onClick={showConfirmModal}>Konfirmasi</button>
                            {showConfirm && <ConfirmModal onConfirm={formSubmitHandler} onClose={closeConfirmModal}/>}
                            {isSubmitted && <SubmittedModal onClose={closeSubmitModal}/>}
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}