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
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const AddEmployee = ({ visible, setVisible }) => {
  const [employeeid, setEmployeeid] = useState()
  const [employeename, setEmployeename] = useState()
  const [employeeEmail, setEmployeeEmail] = useState()
  const [employeedepartment, setEmployeedepartment] = useState()
  const [jobid, setJobid] = useState()
  const [datejoin, setDatejoin] = useState()
  const [reporting, setReporting] = useState('000')
  const [peers, setPeers] = useState('000')
  const [employeetype, setEmployeetype] = useState('user')

  const [setting, setSetting] = useState([])

  const [jobList, setJobList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [departmentList, setDepartmentList] = useState([])

  const handleSubmit = async (e) => {
    if (
      employeeid &&
      employeename &&
      employeeEmail &&
      employeedepartment &&
      jobid &&
      datejoin &&
      reporting &&
      peers &&
      employeetype
    ) {
      try {
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/addemployee`, {
            employeeId: employeeid,
            employeeName: employeename,
            employeeEmail: employeeEmail,
            employeeDepartment: employeedepartment,
            jobId: jobid,
            dateJoin: datejoin,
            reporting: reporting,
            peers: peers,
            employeeType: employeetype,
          })
          .then((response) => {
            alert(response.data)
          })
        setVisible(false)
        window.location.reload()
      } catch (error) {
        //console.log(error)
      }
    } else {
      alert('Please complete all required information')
    }
  }

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const res = await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`)
        setJobList(res.data)
      } catch (error) {
        //console.log(error)
      }
    }
    fetchPosition()
    const fetchReporting = async () => {
      try {
        const res = await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`)
        setEmployeeList(res.data)
      } catch (error) {
        //console.log(error)
      }
    }
    fetchReporting()

    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`)
        setDepartmentList(res.data)
      } catch (error) {
        //console.log(error)
      }
    }
    fetchDepartment()

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
  }, [])

  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Add New Employee</CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              size="sm"
              type="text"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="ID"
              placeholder="ITS001"
              onChange={(e) => setEmployeeid(e.target.value)}
              required
            />
            <CFormInput
              size="sm"
              type="text"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="Name"
              placeholder="Amir"
              onChange={(e) => setEmployeename(e.target.value)}
              required
            />
            <CFormInput
              size="sm"
              type="email"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="Email"
              placeholder="user@testmail.com"
              onChange={(e) => setEmployeeEmail(e.target.value)}
              required
            />
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Position"
              onChange={(e) => setJobid(e.target.value)}
              required
            >
              <option>..choose position...</option>
              {jobList?.map((val, key) => {
                return (
                  <option key={key} value={val.job_id}>
                    {val.job_title}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Department"
              onChange={(e) => setEmployeedepartment(e.target.value)}
              required
            >
              <option>..choose department..</option>
              {departmentList?.map((val, key) => {
                return (
                  <option key={key} value={val.department_id}>
                    {val.department_name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Reporting"
              onChange={(e) => setReporting(e.target.value)}
              required
            >
              <option>..choose reporting..</option>
              {employeeList?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>
            {/*<CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Peers (for third accessor)"
              onChange={(e) => setPeers(e.target.value)}
              required
            >
              <option>..choose peers..</option>
              {employeeList?.map((val, key) => {
                return (
                  <option key={key} value={val.staff_id}>
                    {val.staff_name}
                  </option>
                )
              })}
            </CFormSelect>*/}
            <CFormSelect
              size="sm"
              id="floatingInput"
              className="mb-3"
              label="Type"
              defaultValue={'user'}
              options={[
                { label: 'user', value: 'user' },
                { label: 'admin', value: 'admin' },
              ]}
              onChange={(e) => setEmployeetype(e.target.value)}
              required
            />
            <CFormInput
              size="sm"
              type="date"
              id="floatingInput"
              floatingClassName="mb-3"
              floatingLabel="Date Join"
              onChange={(e) => setDatejoin(e.target.value)}
              required
            />
            <CButton color="dark" type="submit">
              Submit
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

AddEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default AddEmployee
