import React from 'react'
import Person from './person'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardImage,
  CCardText,
  CButton,
} from '@coreui/react'
import { useState, useEffect } from 'react'
import supabase from 'src/components/helpers/supabase'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const AllPerson = () => {
  const [tableData, setTableData] = useState([])
  const [dataChange, dataChanged] = useState(0)

  useEffect(() => {
    supabase
      .from('person')
      .select('*')
      .then(({ data }) => setTableData(data))
  }, [dataChange])

  async function deleteData(val_id) {
    await supabase
      .from('person')
      .delete()
      .match({ person_id: val_id })
      .then(dataChanged(dataChange + 1))
  }

  return (
    <>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Form Tambah Tim</strong>
          </CCardHeader>
          <CCardBody>
            <Person />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Data Tim 1</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {tableData.map((data) => (
                <>
                  <CCol md={6} xs={12}>
                    <CCard className="mb-3" style={({ maxWidth: '100%' }, { maxHeight: '100%' })}>
                      <CRow className="g-0">
                        <CCol md={4}>
                          <CCardImage
                            style={({ maxWidth: '100%' }, { maxHeight: '100%' })}
                            className="rounded"
                            // src={'assets/images/' + data.foto}
                            src={data.foto}
                          />
                        </CCol>
                        <CCol md={8}>
                          <CCardBody>
                            <CButton
                              id={data.person_id}
                              name="btnDelete"
                              style={{ float: 'right' }}
                              color="danger"
                              onClick={(e) => deleteData(e.target.id)}
                            >
                              <CIcon icon={icon.cilTrash} style={{ color: 'white' }} size="sm" />
                            </CButton>
                            <CCardText className="float-left">
                              <b>
                                {data.nama_lengkap}
                                <br />
                                <small>{data.nim}</small>
                              </b>
                            </CCardText>
                            <CCardText>
                              <small>
                                Domisili : {data.alamat}
                                <br />
                                Instagram : @{data.ig_acc}
                                <br />
                                Hobi : {data.hobi.join(',')}
                                <br />
                                Quotes :
                                <b>
                                  <i> {data.quotes} </i>
                                </b>
                              </small>
                            </CCardText>
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                </>
              ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default AllPerson
