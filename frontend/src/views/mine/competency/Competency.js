import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { CCol, CFormTextarea, CModalFooter, CRow, CWidgetStatsF } from '@coreui/react'
import {
  CFormSelect,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CCardImage,
  CCardImageOverlay,
  CBadge,
  CButtonGroup,
  CButton,
  CCard,
  CCardTitle,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { cilArrowCircleTop, cilPrint, cilOptions } from '@coreui/icons'
import img2 from '../../../assets/images/4.png'
import { userType } from 'src/userType'

import packageJson from '../../../../package.json'
const { config } = packageJson

const Competency = () => {
  return (
    <>
      <div>Competency</div>
    </>
  )
}

export default Competency
