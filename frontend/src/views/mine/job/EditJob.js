import React, { useState } from 'react'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CFormInput,
  CButton,
  CForm,
  CSpinner,
} from '@coreui/react'
import PropTypes from 'prop-types'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EditJob = ({ visiblei, setVisiblei, job, setJob }) => {
  const [editJobLoad, setEditJobLoad] = useState(false)
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    var newJob = { ...job }
    newJob = { ...newJob, [name]: value }
    setJob(newJob)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setEditJobLoad(true)
      console.log(job)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/editposition`, { job })
        .then((response) => {
          if (response) {
            alert(response.data)
          } else {
            alert('Error editing job profile')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setEditJobLoad(false)
      setVisiblei(!visiblei)
    }
  }
  return (
    <>
      <div>
        <CModal visible={visiblei} onClose={() => setVisiblei(false)} backdrop="static">
          <CModalHeader>Edit Job Profile</CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                size="sm"
                type="text"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Job Title"
                name="job_title"
                defaultValue={job?.job_title}
                onChange={handleChange}
                required
              />
              <CFormInput
                size="sm"
                type="text"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Job Grade"
                name="job_grade"
                defaultValue={job?.job_grade}
                onChange={handleChange}
                required
              />
              <CFormInput
                size="sm"
                type="textarea"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Job Description"
                name="job_scope"
                defaultValue={job?.job_scope}
                onChange={handleChange}
                required
              />
              <CButton color="dark" type="submit" disabled={editJobLoad ? true : false}>
                {editJobLoad ? <CSpinner color="secondary" size="sm" /> : 'Submit'}
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </div>
    </>
  )
}

EditJob.propTypes = {
  visiblei: PropTypes.bool,
  setVisiblei: PropTypes.bool,
  job: PropTypes.array,
  setJob: PropTypes.array,
}

export default EditJob
