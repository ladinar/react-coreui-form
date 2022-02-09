import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderNav, CNavLink, CNavItem } from '@coreui/react'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/products/all-products" component={NavLink} activeClassName="active">
              Data Mahasiswa Kelas MDCA
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
