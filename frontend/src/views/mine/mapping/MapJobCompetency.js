import React, { useState } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CTooltip,
  CWidgetStatsF,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const MapJobCompetency = ({ visible, setVisible, positiondata, competencydata }) => {
  const [selectedPosition, setSelectedPosition] = useState('')
  const [tableRows, setTableRows] = useState([{ competency: null, expectedLevel: null }])

  const handleSelectPosition = (e) => {
    setSelectedPosition(e.target.value)
  }

  const handleAddMore = () => {
    setTableRows([...tableRows, { competency: null, expectedLevel: null }])
  }

  const handleRemove = (index) => {
    const updatedRows = [...tableRows]
    updatedRows.splice(index, 1)
    setTableRows(updatedRows)
  }

  const handleCompetencyChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].competency = value
    setTableRows(updatedRows)
  }

  const handleExpectedLevelChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].expectedLevel = value
    setTableRows(updatedRows)
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CForm>
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">Position Competency Mapping</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <>
              <CForm>
                <CTable small responsive borderless>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Competency</CTableHeaderCell>
                      <CTableHeaderCell>Expected Level</CTableHeaderCell>
                      <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tableRows.map((row, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>
                          <CFormSelect
                            size="sm"
                            value={row.competency}
                            onChange={(e) => handleCompetencyChange(index, e.target.value)}
                          >
                            <option value={''}>..Competency..</option>
                            {competencydata?.map((val, key) => {
                              return (
                                <option key={key} value={val.competency_id}>
                                  {val.competency_name}
                                </option>
                              )
                            })}
                          </CFormSelect>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormSelect
                            size="sm"
                            value={row.expectedLevel}
                            onChange={(e) => handleExpectedLevelChange(index, e.target.value)}
                          >
                            <option value={''}>..Expected Level..</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </CFormSelect>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton size="sm" color="secondary" onClick={() => handleRemove(index)}>
                            <CIcon size="sm" icon={cilMinus} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CButtonGroup>
                  <CButton size="sm" color="secondary" onClick={handleAddMore}>
                    <CIcon size="sm" icon={cilPlus} />
                  </CButton>
                </CButtonGroup>
              </CForm>
            </>
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

MapJobCompetency.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  positiondata: PropTypes.array.isRequired,
  competencydata: PropTypes.array.isRequired,
}

export default MapJobCompetency
