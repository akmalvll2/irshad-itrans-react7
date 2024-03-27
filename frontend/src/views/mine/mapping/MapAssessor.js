import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CTooltip,
  CWidgetStatsF,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CAvatar,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const MapAssessor = ({ visible, setVisible, staffid, stafflist, assessorlist }) => {
  const selectedStaff = stafflist.find((i) => i.staff_id === staffid)

  const handleSubmit = () => {
    alert('Assessor Mapping Submit Function')
  }
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">
            Assessor Mapping <br /> ({' '}
            <span className="text-black-50">{selectedStaff?.staff_name}</span> )
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert color="secondary">
            - Only subordinates or peers can be mapped through this interface <br />- Superior can
            only be changed through employee section
          </CAlert>
          {stafflist.filter((i) =>
            assessorlist.some((u) => u.assessor_id === i.staff_id && u.staff_id === staffid),
          ).length > 0 ? (
            <CTable small responsive bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>Assessor</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {stafflist
                  .filter((i) =>
                    assessorlist.some(
                      (u) => u.assessor_id === i.staff_id && u.staff_id === staffid,
                    ),
                  )
                  .map((val, key) => (
                    <CTableRow key={key}>
                      <CTableDataCell>
                        <CAvatar className="mx-2" size="sm" src={val.staff_image} />
                        {val.staff_name}
                      </CTableDataCell>
                      <CTableDataCell>
                        {
                          assessorlist.find(
                            (i) => i.staff_id === staffid && i.assessor_id === val.staff_id,
                          )?.staff_assessor_type
                        }
                      </CTableDataCell>
                      <CTableDataCell>
                        {assessorlist.filter(
                          (i) =>
                            i.staff_id === staffid &&
                            i.assessor_id === val.staff_id &&
                            i.staff_assessor_type !== 'self' &&
                            i.staff_assessor_type !== 'superior',
                        ).length > 0 ? (
                          <CButton
                            className="float-end mx-0"
                            size="sm"
                            color="danger"
                            variant="outline"
                          >
                            <CIcon icon={cilTrash} />
                            Delete
                          </CButton>
                        ) : (
                          ''
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          ) : (
            <CAlert color="danger">No Data Available</CAlert>
          )}
          <hr />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol>
                <CFormSelect className="float-start" size="sm">
                  <option value="">...Choose Staff...</option>
                  {stafflist
                    .filter(
                      (i) =>
                        !assessorlist.some(
                          (u) => u.assessor_id === i.staff_id && u.staff_id === staffid,
                        ),
                    )
                    .map((val, key) => (
                      <option key={key} value={val.staff_id}>
                        {val.staff_name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CButton className="float-start" size="sm" color="primary" type="submit">
                  <CIcon icon={cilPlus} /> Add Subordinate / Peers
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

MapAssessor.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  staffid: PropTypes.number,
  stafflist: PropTypes.array,
  assessorlist: PropTypes.array,
}

export default MapAssessor
