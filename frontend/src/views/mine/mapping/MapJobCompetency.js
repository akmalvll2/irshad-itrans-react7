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
} from '@coreui/react'

const MapJobCompetency = ({ positiondata, competencydata }) => {
  const [isPosSelected, setIsPosSelected] = useState(false)
  const [tableRows, setTableRows] = useState([{ competency: null, expectedLevel: null }])

  const handleSelectPosition = () => {
    setIsPosSelected(true)
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
      <CCard>
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
          }}
        >
          <center>
            <h6>POSITION TO COMPETENCY MAPPING</h6>
          </center>
        </CCardHeader>
        <CCardBody>
          <CFormSelect size="sm" onChange={() => handleSelectPosition()}>
            <option>..Select Position..</option>
            {positiondata?.map((val, key) => {
              return (
                <option key={key} value={val.position_id}>
                  {val.position_name}
                </option>
              )
            })}
          </CFormSelect>
          {isPosSelected ? (
            <>
              {/*<CForm>
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
                  <CTableRow>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect size="sm">
                        <option>..Competency..</option>
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
                      <CFormSelect size="sm">
                        <option>..Expected Level..</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="secondary">
                        Remove
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <CButtonGroup>
                <CButton size="sm" color="secondary">
                  Add More
                </CButton>
                <CButton size="sm">Save</CButton>
              </CButtonGroup>
                      </CForm>*/}
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
                            Remove
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CButtonGroup>
                  <CButton size="sm" color="secondary" onClick={handleAddMore}>
                    Add More
                  </CButton>
                  <CButton size="sm">Save</CButton>
                </CButtonGroup>
              </CForm>
            </>
          ) : (
            ''
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

MapJobCompetency.propTypes = {
  positiondata: PropTypes.array.isRequired,
  competencydata: PropTypes.array.isRequired,
}

export default MapJobCompetency
