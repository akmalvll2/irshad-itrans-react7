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
import file from '../../../assets/template/competency-template.xlsx'

import packageJson from '../../../../package.json'
const { config } = packageJson

const ImportCompetency = ({ visible, setVisible }) => {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false)

  const handleImport = async (e) => {
    e.preventDefault()
    try {
      setLoad(true)
      for (var x = 0; x < data.length; x++) {
        const compName = data[x].competency_name
        const compDesc = data[x].competency_description
        const compGroup = data[x].competency_cluster
        const compInd1 = data[x].competency_indicator1
        const compInd2 = data[x].competency_indicator2
        const compInd3 = data[x].competency_indicator3
        const compInd4 = data[x].competency_indicator4
        const compLvl1 = data[x].competency_level1
        const compLvl2 = data[x].competency_level2
        const compLvl3 = data[x].competency_level3
        const compLvl4 = data[x].competency_level4
        const compLvl5 = data[x].competency_level5
        await axios.post(`${config.REACT_APP_API_ENDPOINT}/addcompetency`, {
          compName,
          compDesc,
          compGroup,
          compInd1,
          compInd2,
          compInd3,
          compInd4,
          compLvl1,
          compLvl2,
          compLvl3,
          compLvl4,
          compLvl5,
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      alert('Successfully Import Competency')
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
        <CModalHeader>IMPORT DATA (COMPETENCY)</CModalHeader>
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
            <a href={file} download={'Competency Template'}>
              Download Template
            </a>
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

ImportCompetency.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}

export default ImportCompetency
