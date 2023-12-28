import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import axios from 'axios'

import packageJson from '../../../../package.json'
const { config } = packageJson

const UploadEmployee = ({ visiblei, setVisiblei }) => {
  const [csvArray, setCsvArray] = useState([])

  const ProcessCSV = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')

    const newArray = rows.map((row) => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i]
        return obj
      }, {})
      return eachObject
    })
    setCsvArray(newArray)
  }

  const handleOnChange = (e) => {
    e.preventDefault()

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function (e) {
      const text = e.target.result
      ProcessCSV(text)
    }
    reader.readAsText(file)
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    for (var x = 0; x < csvArray.length; x++) {
      try {
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/uploademployee`, {
            employeeId: JSON.parse(JSON.stringify(csvArray[x].id)),
            employeeName: JSON.parse(JSON.stringify(csvArray[x].name)),
            employeeEmail: JSON.parse(JSON.stringify(csvArray[x].email)),
            employeeDepartment: JSON.parse(JSON.stringify(csvArray[x].department)),
            jobId: JSON.parse(JSON.stringify(csvArray[x].position)),
            dateJoin: JSON.parse(JSON.stringify(csvArray[x].date)),
            reporting: JSON.parse(JSON.stringify(csvArray[x].reporting)),
            employeeType: JSON.parse(JSON.stringify(csvArray[x].type)),
          })
          .then((response) => {
            alert(response.data)
          })
        alert('Successfully inserted this data')
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <CModal visible={visiblei} onClose={() => setVisiblei(false)} backdrop="static">
        <CModalHeader>Import CSV File (Employee)</CModalHeader>
        <CModalBody>
          <CFormInput type="file" accept=".csv" id="csvFile" onChange={handleOnChange} />
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
              <li>Please provide full DEPARTMENT NAME as per registered in the system</li>
              <li>Please provide full POSITION TITLE as per registered in the system</li>
              <li>Reporting column should be filled with supervisor ID only</li>
            </ul>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleUpload}>
            Upload
          </CButton>
          <CButton color="link">Download Template</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

UploadEmployee.propTypes = {
  visiblei: PropTypes.bool,
  setVisiblei: PropTypes.bool,
}

export default UploadEmployee
