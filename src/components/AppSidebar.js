import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar } from '@coreui/react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    ></CSidebar>
  )
}

export default React.memo(AppSidebar)
