import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CSpinner,
} from '@coreui/react'
import * as XLSX from 'xlsx'
import file from '../../../assets/template/employee-template.xlsx'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ImportEmployee = ({ visible, setVisible }) => {
  const [data, setData] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [positionData, setPositionData] = useState([])
  const [load, setLoad] = useState(false)
  const [progress, setProgress] = useState(0)

  function updateProgress(newProgress) {
    setProgress(newProgress)
  }

  function startTask() {
    // Simulated task that takes 5 seconds
    const totalTime = 5000 // 5 seconds
    const interval = 100 // Update progress every 100ms

    let currentTime = 0

    const taskInterval = setInterval(() => {
      currentTime += interval
      const newProgress = (currentTime / totalTime) * 100

      if (newProgress >= 100) {
        clearInterval(taskInterval) // Stop the timer when done
      }

      updateProgress(newProgress)
    }, interval)
  }

  const fetchEmployee = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setEmployeeData(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDepartment = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`).then((response) => {
        if (response) {
          setDepartmentData(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPosition = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`).then((response) => {
        if (response) {
          setPositionData(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleImport = async (e) => {
    e.preventDefault()
    try {
      setLoad(true)
      startTask()
      console.log(
        departmentData?.find((item) =>
          item.department_name
            .toString()
            .toLowerCase()
            .includes(data[2]?.department.toString().toLowerCase()),
        )?.department_id,
      )
      for (let x = 0; x < data.length; x++) {
        const employeeId = data[x].staff_id
        const employeeName = data[x].staff_name
        const employeeEmail = data[x].staff_email
        const employeeDepartment = departmentData?.find((item) =>
          item.department_name
            .toString()
            .toLowerCase()
            .includes(data[x]?.department.toString().toLowerCase()),
        )?.department_id
        const jobId = positionData?.find((item) =>
          item.job_title
            .toString()
            .toLowerCase()
            .includes(data[x]?.position.toString().toLowerCase()),
        )?.job_id
        const dateJoin = excelDate(data[x].date_join)
        const reporting = data?.find((item) =>
          item.staff_name
            .toString()
            .toLowerCase()
            .includes(data[x]?.reporting_to.toString().toLowerCase()),
        )?.staff_id
        const employeeType = 'user'
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/addemployee`, {
            employeeId,
            employeeName,
            employeeEmail,
            employeeDepartment,
            jobId,
            dateJoin,
            reporting,
            employeeType,
          })
          .then((response) => {
            if (response.data) {
              console.log(response.data)
            } else {
              console.log(response.err)
            }
          })
      }
    } catch (err) {
      console.log(err)
    } finally {
      alert('Successfully Import Employee')
      setLoad(false)
      setData([])
      setVisible(!visible)
    }
  }

  const excelDate = (excelSerialNumber) => {
    var newDate = new Date((excelSerialNumber - 1) * 24 * 60 * 60 * 1000)
    newDate = newDate.toISOString().split('T')[0]
    return newDate
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const binaryData = event.target.result
        const workbook = XLSX.read(binaryData, { type: 'binary' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        // Assuming the first row contains headers
        const headers = excelData[0]

        // Initialize an array to store objects with header names as attributes
        const formattedData = []

        // Start from the second row (index 1) to skip the headers row
        for (let i = 1; i < excelData.length; i++) {
          const row = excelData[i]
          const rowData = {}

          for (let j = 0; j < headers.length; j++) {
            const header = headers[j]
            rowData[header] = row[j]
          }

          formattedData.push(rowData)
        }

        setData(formattedData)
      }

      reader.readAsBinaryString(file)
    }
  }

  useEffect(() => {
    fetchEmployee()
    fetchDepartment()
    fetchPosition()
  }, [])
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>IMPORT DATA (EMPLOYEE)</CModalHeader>
        <CModalBody>
          <CFormInput type="file" accept=".xlsx" id="csvFile" onChange={handleFileUpload} />
          <div
            style={{
              backgroundColor: 'gray',
              margin: '1rem',
              padding: '1rem',
              color: 'white',
            }}
          >
            <h6>Important Note : </h6>
            <ul>
              <li>Fill in all the required data inside the excel template</li>
              <li>Red title are REQUIRED while orange title are OPTIONAL</li>
              <li>
                Do not change any of the template header. Just remove example data and insert your
                data
              </li>
            </ul>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleImport} disabled={load ? true : false}>
            {load ? (
              <>
                <CSpinner component="span" size="sm" color="light" aria-hidden="true" />
              </>
            ) : (
              'Upload'
            )}
          </CButton>
          <CButton color="link">
            <a href={file} download={'Employee Template'}>
              Download Template
            </a>
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ImportEmployee.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default ImportEmployee
