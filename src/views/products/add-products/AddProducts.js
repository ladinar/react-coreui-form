import { useState, useEffect, React } from 'react'
import Select from 'react-select'
import supabase from 'src/components/helpers/supabase'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormCheck,
} from '@coreui/react'

export const defaultForm = {
  nim: '',
  nama: '',
  gender: '',
  hobi: [],
  komentar: '',
  gmaps: [],
  alamat: '',
}

export const defaultHobby = [
  { value: 0, label: 'Membaca Buku' },
  { value: 1, label: 'Menonton Film' },
  { value: 2, label: 'Coding' },
  { value: 4, label: 'Traveling' },
  { value: 5, label: 'Olahraga' },
  { value: 6, label: 'Food Traveler' },
]

const CustomStyles = () => {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const gmaps = [coords.latitude, coords.longitude]
        setForm({ ...form, gmaps })
      })
    } else {
      setForm({ ...form, gmaps: [0, 0] })
    }
  }, [form])
  function setHobi(arr) {
    const hobi = arr.map((item) => item.label)
    setForm({ ...form, hobi })
  }

  const submitForm = async (data) => {
    await supabase
      .from('mahasiswa')
      .insert([form])
      .then(({ success }) => {
        window.location.reload()
      })
  }

  function resetForm() {
    document.getElementsByName('gender').forEach((el) => {
      el.checked = false
    })
    setForm(defaultForm)
  }

  // const [nama, setNama] = useState('')
  // const [nim, setNim] = useState('')
  // const [gender, setGender] = useState('')
  // const [hobi, setHobi] = useState('')
  // const [komentar, setKomentar] = useState('')
  // const history = useHistory()

  // const saveProduct = async (e) => {
  //   e.preventDefault()
  //   await axios
  //     .post('http://my-json-server.typicode.com/RizalChamad/reactjs-redux/products', {
  //       productName: e.productName,
  //       buyingPrice: e.buyingPrice,
  //       sellingPrice: e.sellingPrice,
  //       descProduct: e.descProduct,
  //     })
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //   history.push('/products')
  // }

  // const [validated, setValidated] = useState(false)
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //   setValidated(true)
  // }
  return (
    <CForm className="row g-3 needs-validation" onSubmit={submitForm}>
      <CCol md={6}>
        <CFormLabel htmlFor="validationProductName">Nama Lengkap</CFormLabel>
        <CFormInput
          placeholder="Isi dengan Nama Lengkap"
          type="text"
          id="validationProductName"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          required
        />
        <CFormFeedback invalid>Isi terlebih dahulu nama lengkap!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationProductName">NIM</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Isi dengan NIM anda"
          id="validationProductNim"
          value={form.nim}
          onChange={(e) => setForm({ ...form, nim: e.target.value })}
          required
        />
        <CFormFeedback invalid>Isi terlebih dahulu NIM!</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationBuyingPrice">Jenis Kelamin</CFormLabel>
        <CFormCheck
          type="radio"
          name="gender"
          id="flexRadioDefault1"
          label="Wanita"
          value="Wanita"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        />
        <CFormCheck
          type="radio"
          name="gender"
          id="flexRadioDefault2"
          label="Pria"
          value="Pria"
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        />
        <CFormFeedback invalid>Isi terlebih dahulu Jenis Kelamin!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationDescription">Alamat</CFormLabel>
        <CFormTextarea
          id="validationAlamat"
          placeholder="Isi Alamat anda dengan benar"
          value={form.alamat}
          onChange={(e) => setForm({ ...form, alamat: e.target.value })}
          required
        ></CFormTextarea>
        <CFormFeedback invalid>Please enter an address!</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationDescription">Hobi</CFormLabel>
        <Select
          isMulti
          placeholder="Pilih hobi..."
          onChange={(hobi) => setHobi(hobi)}
          name="hobby"
          inputId="genre-select"
          options={defaultHobby}
          className="select-container w-full mb-2"
          classNamePrefix="select"
        />
        <CFormFeedback invalid>Pilih terlebih dahulu Hobi</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationDescription">Komentar</CFormLabel>
        <CFormTextarea
          id="validationDescription"
          placeholder="Isi komentar dengan bahasa yang baik dan benar"
          value={form.komentar}
          onChange={(e) => setForm({ ...form, komentar: e.target.value })}
          required
        ></CFormTextarea>
        <CFormFeedback invalid>Please enter the comments!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton
          style={myComponentStyle}
          // disabled={isLoading}
          color="primary"
          type="submit"
        >
          Submit
        </CButton>
        <CButton color="light" onClick={() => resetForm()}>
          Reset
        </CButton>
      </CCol>
    </CForm>
  )
}

const myComponentStyle = {
  marginRight: '5px',
}

const AddProducts = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <strong>Tambah Mahasiswa</strong>
        <CCard className="mb-4">
          <CCardBody>{CustomStyles()}</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddProducts
