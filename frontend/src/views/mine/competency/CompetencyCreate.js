import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CAlert,
  CFormSelect,
  CFormLabel,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const CompetencyCreate = ({ visible, setVisible, createCompetency, clusterlist }) => {
  const [competencyData, setCompetencyData] = useState({})
  const [tableRows, setTableRows] = useState([])

  const handleAddMore = () => {
    if (tableRows.length < 10) {
      setTableRows([...tableRows, { indicatordescription: null }])
    }
  }

  const handleRemove = (index) => {
    if (tableRows.length === 0) {
      return
    }

    const updatedRows = [...tableRows]
    updatedRows.splice(index, 1)
    setTableRows(updatedRows)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCompetencyData({ ...competencyData, [name]: value })
  }

  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target
    const newArray = [...tableRows]
    newArray[index] = { ...newArray[index], [name]: value }
    setTableRows(newArray)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createCompetency(competencyData, tableRows)
    setVisible(!visible)
  }
  return (
    <>
      <CModal
        backdrop="static"
        size="lg"
        visible={visible}
        onClose={() => {
          setVisible(false)
          setTableRows([])
        }}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CForm onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">New Competency</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {clusterlist.length > 0 ? (
              <>
                <CRow>
                  <CCol>
                    <CFormInput
                      type="text"
                      name="competencyname"
                      className="mb-3"
                      label="Competency Name"
                      placeholder="eg. Organizational Awareness"
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel>Group</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      size="sm"
                      name="clusterid"
                      onChange={handleInputChange}
                    >
                      <option>..Choose Group</option>
                      {clusterlist?.map((val, key) => {
                        return (
                          <option key={key} value={val.cluster_id}>
                            {val.cluster_name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormInput
                      type="text"
                      name="competencydescription"
                      className="mb-3"
                      label="Competency Description"
                      placeholder="eg. Level of awareness on organization vision, mission and objective"
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel>Competency Indicator</CFormLabel>
                    <br />
                    {tableRows.length > 0 ? (
                      <CTable small responsive bordered>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>No</CTableHeaderCell>
                            <CTableHeaderCell>Indicator</CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {tableRows.map((row, index) => {
                            return (
                              <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>
                                  <CFormInput
                                    type="text"
                                    name={'indicatordescription'}
                                    className="mb-0"
                                    //label="Competency Indicator 1"
                                    placeholder="eg. Aware of organizational knowledge"
                                    onChange={(e) => handleInputChange2(e, index)}
                                  />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CButton
                                    size="sm"
                                    color="secondary"
                                    onClick={() => handleRemove(index)}
                                  >
                                    <CIcon icon={cilMinus} />
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                        </CTableBody>
                      </CTable>
                    ) : (
                      <CAlert color="info">Click + button to add any indicator(s)</CAlert>
                    )}

                    <CButton size="sm" color="secondary" onClick={() => handleAddMore()}>
                      <CIcon icon={cilPlus} />
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : (
              <>
                <CAlert color="danger">
                  No cluster data available. Insert cluster data in the settings.
                </CAlert>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="primary"
              type="submit"
              disabled={clusterlist.length > 0 ? false : true}
            >
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

CompetencyCreate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  createCompetency: PropTypes.func.isRequired,
  clusterlist: PropTypes.array.isRequired,
}

export default CompetencyCreate
