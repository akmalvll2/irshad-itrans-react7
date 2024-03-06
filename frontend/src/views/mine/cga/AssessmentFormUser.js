import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormSelect,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CBadge,
} from '@coreui/react'

const AssessmentFormUser = ({ visible, setVisible, stafflist, jobcompetency }) => {
  const [selectedStaff, setSelectedStaff] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Assessment Form User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormSelect
              label="Please choose assessed individual"
              size="sm"
              name="staffid"
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option>..Choose Staff..</option>
              {stafflist?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>

            {stafflist
              ?.filter((fil) => fil.staff_id.toString() === selectedStaff)
              .map((val, key) => {
                return (
                  <CTable small responsive bordered className="my-4" key={key}>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableDataCell colSpan={3}>
                          <div>
                            <b>Name :</b> {val.staff_name}
                          </div>
                          <div>
                            <b>Position :</b> {val.position_name}
                          </div>
                          <div>
                            <b>Department :</b> {val.department_name}
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableHead>
                      {key === 0 &&
                      jobcompetency?.filter((fil) => fil.position_id === val.position_id).length >
                        0 ? (
                        <CTableRow>
                          <CTableHeaderCell>No</CTableHeaderCell>
                          <CTableHeaderCell>Competency</CTableHeaderCell>
                          <CTableHeaderCell>Expected Level</CTableHeaderCell>
                        </CTableRow>
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan={3}>
                            <CAlert color="danger">No Data Available</CAlert>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableHead>
                    <CTableBody>
                      {jobcompetency
                        ?.filter((fil) => fil.position_id === val.position_id)
                        .map((val2, key2) => {
                          return (
                            <CTableRow key={key2}>
                              <CTableDataCell>{key2 + 1}</CTableDataCell>
                              <CTableDataCell>
                                {val2.competency_name}{' '}
                                <CBadge size="sm" color="info">
                                  {val2.cluster_name}
                                </CBadge>
                              </CTableDataCell>
                              <CTableDataCell>
                                {val2.position_competency_expected_level}
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                    </CTableBody>
                  </CTable>
                )
              })}
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                setVisible(false)
                setSelectedStaff('')
              }}
            >
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

AssessmentFormUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  jobcompetency: PropTypes.array,
}

export default AssessmentFormUser
