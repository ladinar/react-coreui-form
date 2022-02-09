import React from 'react'
import AddProducts from '../add-products/AddProducts'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useState, useEffect } from 'react'
import supabase from 'src/components/helpers/supabase'

const AllProducts = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    supabase
      .from('mahasiswa')
      .select('*')
      .order('updated_at', { ascending: false })
      .then(({ data }) => setTableData(data))
  })

  return (
    <>
      <CRow>
        <CCol xs={12} lg={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Form Data Mahasiswa</strong>
            </CCardHeader>
            <CCardBody>
              <AddProducts></AddProducts>
              <strong>Daftar Mahasiswa</strong>
              <div className="overflow-x-auto">
                <CTable striped responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama Lengkap</CTableHeaderCell>
                      <CTableHeaderCell scope="col">NIM</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hobi</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenis Kelamin</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Komentar</CTableHeaderCell>
                      <CTableHeaderCell scope="col">GMaps</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tableData.map((product, index) => (
                      <>
                        <CTableRow>
                          <CTableDataCell key={product.id}>{index + 1}</CTableDataCell>
                          <CTableDataCell>{product.nama}</CTableDataCell>
                          <CTableDataCell>{product.nim}</CTableDataCell>
                          <CTableDataCell>{product.alamat}</CTableDataCell>
                          <CTableDataCell className="space-x-1">
                            {product.hobi.join(',')}
                          </CTableDataCell>
                          <CTableDataCell>{product.gender}</CTableDataCell>
                          <CTableDataCell>{product.komentar}</CTableDataCell>
                          <CTableDataCell>
                            <a
                              rel="noreferrer"
                              className="link link-hover link-accent"
                              target="_blank"
                              href={'https://www.google.com/maps/place/' + product.gmaps.join(',')}
                            >
                              GMaps
                            </a>
                          </CTableDataCell>
                        </CTableRow>
                      </>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AllProducts
