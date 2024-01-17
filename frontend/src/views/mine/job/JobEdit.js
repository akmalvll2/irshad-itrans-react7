import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const JobEdit = ({ visible, setVisible, jobdata, jobid, updatedjob }) => {
  const [updateddata, setupdateddata] = useState({
    jobid: '',
    jobname: '',
    jobgrade: '',
    jobdescription: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updatedjob(updateddata)
    setVisible(!visible)
  }

  useEffect(() => {
    const selectedJob = jobdata.find((fil) => fil.position_id === jobid)
    if (selectedJob) {
      setupdateddata({
        jobid: selectedJob?.position_id,
        jobname: selectedJob?.position_name,
        jobgrade: selectedJob?.position_grade,
        jobdescription: selectedJob?.department_description,
      })
    }
  }, [jobid])
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CForm onSubmit={onSubmitHandle}>
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">Department Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {jobdata
              ?.filter((fil) => fil.position_id === jobid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CFormInput
                      type="text"
                      name="jobname"
                      className="mb-3"
                      label="Position Title"
                      defaultValue={val.position_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="jobgrade"
                      className="mb-3"
                      label="Grade"
                      defaultValue={val.position_grade}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="jobdescription"
                      className="mb-3"
                      label="Description"
                      defaultValue={val.position_description}
                      onChange={onChangeHandle}
                      required
                    />
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

JobEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  jobdata: PropTypes.array.isRequired,
  jobid: PropTypes.number,
  updatedjob: PropTypes.func.isRequired,
}

export default JobEdit
