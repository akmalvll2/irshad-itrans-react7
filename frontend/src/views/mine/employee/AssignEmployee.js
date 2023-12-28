import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  CForm,
  CFormSelect,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CButton,
  CSpinner,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const AssignEmployee = ({ visible, setVisible, employee, activeEmployee, setActiveEmployee }) => {
  const [setting, setSetting] = useState([])
  const [loadConfirm, setLoadConfirm] = useState(false)

  const handleChange = async (e) => {
    const { name, value } = e.target
    var newEmployee = { ...activeEmployee }
    newEmployee = { ...activeEmployee, [name]: value }
    setActiveEmployee(newEmployee)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoadConfirm(true)
      console.log(activeEmployee)
      const employee = activeEmployee
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/editemployee`, { employee })
        .then((response) => {
          if (response) {
            alert(response.data)
          }
        })
    } catch (err) {
      //console.log(err)
    } finally {
      setLoadConfirm(false)
      setActiveEmployee([])
      setVisible(!visible)
      window.location.reload()
    }
  }

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        await axios.get(`${config.REACT_APP_API_ENDPOINT}/appname`).then((response) => {
          if (response) {
            setSetting(response.data)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSetting()
  })

  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Assign Employee</CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              size="sm"
              type="text"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="Reviewer 1 ( Self )"
              placeholder="ID"
              defaultValue={activeEmployee?.staff_name}
              disabled
            />
            <CFormInput
              size="sm"
              type="text"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="Reviewer 2 ( Reporting to )"
              placeholder="ID"
              defaultValue={
                employee?.find((idx) => idx.staff_id === activeEmployee?.reporting_to)?.staff_name
              }
              text="Please navigate to ' Edit Tab ' to change this staff reporting"
              disabled
            />
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 3 ( Subordinate )"
              name={`reviewer_one`}
              defaultValue={activeEmployee?.reviewer_one}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 4 ( Subordinate )"
              name={`reviewer_two`}
              defaultValue={activeEmployee?.reviewer_two}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 5 ( Subordinate )"
              name={`reviewer_three`}
              defaultValue={activeEmployee?.reviewer_three}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 6 ( Peers )"
              name={`reviewer_four`}
              defaultValue={activeEmployee?.reviewer_four}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 7 ( Peers )"
              name={`reviewer_five`}
              defaultValue={activeEmployee?.reviewer_five}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reviewer 8 ( Peers )"
              name={`reviewer_six`}
              defaultValue={activeEmployee?.reviewer_six}
              onChange={handleChange}
              required
            >
              <option>..choose reviewer..</option>
              {employee?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CButton color="dark" type="submit" disabled={loadConfirm ? true : false}>
              {loadConfirm ? <CSpinner color="secondary" size="sm" /> : 'Submit'}
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

AssignEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
  employee: PropTypes.array,
  activeEmployee: PropTypes.array,
  setActiveEmployee: PropTypes.array,
}

export default AssignEmployee
