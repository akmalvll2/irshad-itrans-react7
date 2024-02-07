import React, { useEffect, useState } from 'react'
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

const MapJobCompetency = ({
  visible,
  setVisible,
  positiondata,
  competencydata,
  positionid,
  positioncompetencydata,
  createnewjobcompetency,
  deleteJobCompetency,
}) => {
  const [tableRows, setTableRows] = useState([
    { positionid: positionid, competencyid: null, expectedlevel: null },
  ])
  const selectedPosition = positiondata?.filter((fil) => fil.position_id === positionid)

  const handleAddMore = () => {
    if (tableRows.length < competencydata.length) {
      setTableRows([
        ...tableRows,
        { positionid: positionid, competencyid: null, expectedlevel: null },
      ])
    }
  }

  const handleRemove = (index) => {
    if (tableRows.length === 1) {
      return
    }

    const updatedRows = [...tableRows]
    updatedRows.splice(index, 1)
    setTableRows(updatedRows)
  }

  const handleCompetencyChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].competencyid = value
    setTableRows(updatedRows)
  }

  const handleExpectedLevelChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].expectedlevel = value
    setTableRows(updatedRows)
  }

  const handleSubmit = () => {
    try {
      tableRows?.forEach((val) => {
        createnewjobcompetency(val)
      })
      alert(' Successfully mapped ')
      setVisible(!visible)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTableRows([{ positionid: positionid, competencyid: null, expectedlevel: null }])
  }, [positionid])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">
            Position Competency Mapping <br /> ({' '}
            <span className="text-black-50">{selectedPosition[0]?.position_name}</span> )
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <>
              <CRow>
                <CCol>
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
                      {positioncompetencydata
                        ?.filter((i) => i.position_id === positionid)
                        .map((val, key) => {
                          return (
                            <CTableRow key={key}>
                              <CTableDataCell>{key + 1}</CTableDataCell>
                              <CTableDataCell>{val.competency_name}</CTableDataCell>
                              <CTableDataCell>
                                {val.position_competency_expected_level}
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  size="sm"
                                  color="secondary"
                                  onClick={() => deleteJobCompetency(val.position_competency_id)}
                                >
                                  Delete
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                      {tableRows.map((row, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            {index +
                              1 +
                              positioncompetencydata.filter((i) => i.position_id === positionid)
                                .length}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormSelect
                              size="sm"
                              defaultValue={''}
                              onChange={(e) => handleCompetencyChange(index, e.target.value)}
                              required
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
                              defaultValue={''}
                              onChange={(e) => handleExpectedLevelChange(index, e.target.value)}
                              required
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
                            <CButton
                              size="sm"
                              color="secondary"
                              onClick={() => handleRemove(index)}
                            >
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
                </CCol>
              </CRow>
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
  positionid: PropTypes.number,
  positioncompetencydata: PropTypes.array.isRequired,
  createnewjobcompetency: PropTypes.func.isRequired,
  deleteJobCompetency: PropTypes.func.isRequired,
}

export default MapJobCompetency
