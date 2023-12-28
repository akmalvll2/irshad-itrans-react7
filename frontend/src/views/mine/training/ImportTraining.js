import React from 'react'
import PropTypes from 'prop-types'
import {
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
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
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ImportTraining = ({ visiblei, setVisiblei }) => {
  return (
    <div>
      <CModal visible={visiblei} onClose={() => setVisiblei(false)} backdrop="static">
        <CModalHeader>Import CSV File (Training)</CModalHeader>
        <CModalBody>
          <CFormInput type="file" />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark">Upload</CButton>
          <CButton color="link">Download Template</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

ImportTraining.propTypes = {
  visiblei: PropTypes.bool,
  setVisiblei: PropTypes.bool,
}

export default ImportTraining
