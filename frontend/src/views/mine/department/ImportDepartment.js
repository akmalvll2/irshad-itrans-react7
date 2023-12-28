import React, { useState } from 'react'
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
import file from '../../../assets/template/department-template.xlsx'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ImportDepartment = ({ visible, setVisible }) => {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false)

  const handleImport = async (e) => {
    e.preventDefault()
    try {
      setLoad(true)
      for (var x = 0; x < data.length; x++) {
        const departmentName = data[x].department_name
        await axios.post(`${config.REACT_APP_API_ENDPOINT}/adddepartment`, { departmentName })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
      setData([])
      setVisible(!visible)
    }
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
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>IMPORT DATA (DEPARTMENT)</CModalHeader>
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
                Do not change any of the template origin. Just remove example data and insert your
                data
              </li>
            </ul>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleImport} disabled={load ? true : false}>
            {load ? (
              <CSpinner component="span" size="sm" color="light" aria-hidden="true" />
            ) : (
              'Upload'
            )}
          </CButton>
          <CButton color="link">
            <a href={file} download={'Department Template'}>
              Download Template
            </a>
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ImportDepartment.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default ImportDepartment
