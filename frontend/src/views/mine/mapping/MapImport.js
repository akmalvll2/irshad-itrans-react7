import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CSpinner,
  CCardHeader,
  CCardText,
  CFormInput,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus } from '@coreui/icons'
import * as XLSX from 'xlsx'
import file from '../../../assets/template/mapping-template.xlsx'
import MapTable2 from './MapTable2'
import propTypes from 'prop-types'

import packageJson from '../../../../package.json'
const { config } = packageJson

const MapImport = ({ competency, position }) => {
  const [data, setData] = useState([])
  const [loadImport, setLoadImport] = useState(false)
  const [progress, setProgress] = useState(0)

  function updateProgress(completedTasks, totalTasks) {
    const newProgress = (completedTasks / totalTasks) * 100
    setProgress(newProgress)
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

  const handleImport = async (e) => {
    e.preventDefault()
    console.log(
      position?.find((item) =>
        item.job_title
          .toString()
          .toLowerCase()
          .includes(data[0]?.position.toString().toLowerCase()),
      ).job_id,
    )
    try {
      setLoadImport(true)
      for (let x = 0; x < data.length; x++) {
        const currPost = position?.find((item) =>
          item.job_title
            .toString()
            .toLowerCase()
            .includes(data[x]?.position.toString().toLowerCase()),
        ).job_id
        const compid = competency?.find((item) =>
          item.competency_name
            .toString()
            .toLowerCase()
            .includes(data[x]?.competency.toString().toLowerCase()),
        ).competency_id
        const compreq = data[x]?.expected_level
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/updmaplist`, {
            currPost,
            compid,
            compreq,
          })
          .then((response) => {
            if (response) {
              console.log('Data successfully imported')
            }
          })
        updateProgress(x, data.length)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadImport(false)
      alert('Data successfully imported')
      setData([])
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader>
          <CCardText>Competency Mapping Import</CCardText>
        </CCardHeader>
        <CCardBody>
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
        </CCardBody>
        <CCardFooter>
          <CButton color="dark" onClick={handleImport} disabled={loadImport ? true : false}>
            {loadImport ? (
              <>
                <CSpinner component="span" size="sm" color="light" aria-hidden="true" />{' '}
                {progress.toFixed(0)} %
              </>
            ) : (
              'Upload'
            )}
          </CButton>
          <CButton color="link">
            <a href={file} download={'Mapping Template'}>
              Download Template
            </a>
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

MapImport.propTypes = {
  competency: propTypes.array,
  position: propTypes.array,
}

export default MapImport
