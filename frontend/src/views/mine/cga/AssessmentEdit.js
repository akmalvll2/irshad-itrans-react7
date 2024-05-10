import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CForm,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const AssessmentEdit = ({
  visible,
  setVisible,
  assessmentdata,
  assessmentid,
  updatedassessment,
}) => {
  const [updateddata, setupdateddata] = useState({
    assessmentid: '',
    assessmentname: '',
    assessmentstartdate: '',
    assessmentenddate: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    var newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updatedassessment(updateddata)
    setVisible(!visible)
  }

  useEffect(() => {
    const selectedAssessment = assessmentdata.find((fil) => fil.assessment_id === assessmentid)
    if (selectedAssessment) {
      setupdateddata({
        assessmentid: selectedAssessment?.assessment_id,
        assessmentname: selectedAssessment?.assessment_name,
        assessmentstartdate: moment(selectedAssessment?.assessment_start_date).format('YYYY-MM-DD'),
        assessmentenddate: moment(selectedAssessment?.assessment_end_date).format('YYYY-MM-DD'),
      })
    }
  }, [assessmentid])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={onSubmitHandle}>
          <CModalHeader>
            <CModalTitle>Assessment Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {assessmentdata
              ?.filter((fil) => fil.assessment_id === assessmentid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="text"
                          name="assessmentname"
                          className="mb-3"
                          label="Assessment Name"
                          defaultValue={val.assessment_name}
                          onChange={onChangeHandle}
                          required
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="date"
                          name="assessmentstartdate"
                          className="mb-3"
                          label="Start Date"
                          defaultValue={moment(val.assessment_start_date).format('YYYY-MM-DD')}
                          onChange={onChangeHandle}
                          required
                        />
                      </CCol>
                      <CCol>
                        <CFormInput
                          type="date"
                          name="assessmentenddate"
                          className="mb-3"
                          label="End Date"
                          defaultValue={moment(val.assessment_end_date).format('YYYY-MM-DD')}
                          onChange={onChangeHandle}
                          required
                        />
                      </CCol>
                    </CRow>
                  </div>
                )
              })}
          </CModalBody>
          <CModalFooter>
            <CButton size="sm" color="primary" type="submit">
              Save
            </CButton>
            <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

AssessmentEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  assessmentdata: PropTypes.array.isRequired,
  assessmentid: PropTypes.number,
  updatedassessment: PropTypes.func.isRequired,
}

export default AssessmentEdit
