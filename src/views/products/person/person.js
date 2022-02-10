import { React, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import Select from 'react-select'
import supabase from 'src/components/helpers/supabase'

export const defaultForm = {
  nim: '',
  nama_lengkap: '',
  ig_acc: '',
  hobi: [],
  quotes: '',
  alamat: '',
  foto: '',
}

export const defaultHobby = [
  { value: 0, label: 'Membaca Buku' },
  { value: 1, label: 'Menonton Film' },
  { value: 2, label: 'Coding' },
  { value: 4, label: 'Traveling' },
  { value: 5, label: 'Olahraga' },
  { value: 6, label: 'Food Traveler' },
]

const Person = () => {
  const [formData, setForm] = useState(defaultForm)
  const [validated, setValidated] = useState(false)
  function setHobi(arr) {
    const hobby_arr = []
    arr['hobi'].forEach((arr) => {
      let item = arr.label
      hobby_arr.push(item)
    })
    setForm({ ...formData, hobi: hobby_arr })
  }

  const handleUploadFoto = async (e) => {
    let file = e.target.files[0]
    let base64 = await convertBase64(file)
    setForm({ ...formData, foto: base64 })
    console.log(base64)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    await supabase
      .from('person')
      .insert([formData])
      .then(({ success }) => {
        window.location.reload()
      })
    setValidated(true)
    console.log(event)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={(e) => handleSubmit(e)}
    >
      <CCol md={4} xs={12}>
        <CFormLabel htmlFor="validationProductName">Nama Lengkap</CFormLabel>
        <CFormInput
          placeholder="Jaonaay Wattanasin"
          type="text"
          id="validationProductName"
          onChange={(e) => setForm({ ...formData, nama_lengkap: e.target.value })}
        />
        <CFormFeedback invalid> Isi terlebih dahulu nama lengkap!</CFormFeedback>
      </CCol>
      <CCol md={4} xs={12}>
        <CFormLabel htmlFor="validationProductName">NIM</CFormLabel>
        <CFormInput
          maxLength={10}
          placeholder="2201897871"
          type="text"
          id="validationProductName"
          onChange={(e) => setForm({ ...formData, nim: e.target.value })}
          required
        />
        <CFormFeedback invalid>Isi terlebih dahulu NIM!</CFormFeedback>
      </CCol>
      <CCol md={4} xs={12} className="position-relative">
        <CFormLabel htmlFor="validationTooltipUsername">Instagram Account</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">
            <CIcon icon={icon.cibInstagram} size="xl" />
          </CInputGroupText>
          <CFormInput
            type="text"
            id="ig_acc"
            placeholder="jaonaay_"
            aria-describedby="inputGroupPrepend"
            onChange={(e) => setForm({ ...formData, ig_acc: e.target.value })}
            required
          />
          <CFormFeedback invalid>Isi terlebih dahulu akun instagram!</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol xs={12}>
        <CFormLabel htmlFor="validationDescription">Alamat</CFormLabel>
        <CFormTextarea
          id="validationDescription"
          placeholder="Bangkok, Thailand"
          onChange={(e) => setForm({ ...formData, alamat: e.target.value })}
          required
        ></CFormTextarea>
        <CFormFeedback invalid>Please enter a message in the textarea!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDescription">Hobi</CFormLabel>
        <Select
          isMulti
          placeholder="Pilih hobi..."
          onChange={(e) => setHobi({ hobi: e })}
          inputId="genre-select"
          options={defaultHobby}
          className="select-container w-full mb-2"
          classNamePrefix="select"
        />
        <CFormFeedback tooltip invalid>
          Isi terlebih dahulu akun instagram!
        </CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationFile">Upload Foto</CFormLabel>
        <CFormInput
          type="file"
          accept="image/*"
          id="validationFile"
          aria-label="file example"
          onChange={(e) => handleUploadFoto(e)}
          required
        />
        <CFormFeedback invalid>File belum ditambahkan</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CFormLabel htmlFor="validationDescription">Quotes</CFormLabel>
        <CFormTextarea
          id="validationDescription"
          placeholder="Happy Life, Happy Work"
          onChange={(e) => setForm({ ...formData, quotes: e.target.value })}
          required
        ></CFormTextarea>
        <CFormFeedback invalid>Please enter a message in the textarea!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

export default Person
