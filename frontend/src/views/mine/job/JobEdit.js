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
  CFormLabel,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
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
    jobcategory: '',
    jobviewdepartment: '',
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
        jobdescription: selectedJob?.position_description,
        jobcategory: selectedJob?.position_category,
        jobviewdepartment: selectedJob?.position_department_report.toString(),
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
          <CModalHeader closeButton={false}>
            <CModalTitle id="StaticBackdropExampleLabel">Position Edit</CModalTitle>
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
                    <CFormSelect
                      label="Category"
                      name="jobcategory"
                      onChange={onChangeHandle}
                      defaultValue={val.position_category}
                      required
                    >
                      <option value="">..Category..</option>
                      <option value="Top Management">Top Management</option>
                      <option value="Senior Management">Senior Management</option>
                      <option value="Middle Management">Middle Management</option>
                      <option value="Individual Contributor">Individual Contributor</option>
                      <option value="Support Staff">Support Staff</option>
                    </CFormSelect>
                    <CFormLabel className="mt-2">Can View Department Report ?</CFormLabel>
                    <CFormCheck
                      type="radio"
                      name="jobviewdepartment"
                      onChange={onChangeHandle}
                      label="No"
                      value="0"
                      defaultChecked={updateddata.jobviewdepartment === '0' ? true : false}
                      required
                    />
                    <CFormCheck
                      type="radio"
                      name="jobviewdepartment"
                      onChange={onChangeHandle}
                      label="Yes"
                      value="1"
                      defaultChecked={updateddata.jobviewdepartment === '1' ? true : false}
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
