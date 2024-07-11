import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usePDF } from 'react-to-pdf'
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
  CBadge,
  CCardFooter,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const MapTrainingCompetency = ({
  visible,
  setVisible,
  competencydata,
  trainingdata,
  trainingCompetencyData,
  trainingId,
  createtrainingcompetency,
  deletetrainingcompetency,
}) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const { toPDF, targetRef } = usePDF({
    filename: `TrainingMap.pdf`,
  })
  const [tableRows, setTableRows] = useState([
    { trainingid: trainingId, competencyid: null, relevantlevel: null },
  ])
  const selectedTraining = trainingdata?.find((fil) => fil.training_id === trainingId)

  const handleAddMore = () => {
    if (tableRows.length < competencydata.length) {
      setTableRows([
        ...tableRows,
        { trainingid: trainingId, competencyid: null, relevantlevel: null },
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
    updatedRows[index].competencyid = parseInt(value)
    setTableRows(updatedRows)
  }

  const handleRelevantLevelChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].relevantlevel = parseInt(value)
    setTableRows(updatedRows)
  }

  const handleSubmit = () => {
    try {
      tableRows?.forEach((val) => {
        createtrainingcompetency(tableRows)
      })
      //alert(' Successfully mapped ')
      //setVisible(!visible)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTableRows([{ trainingid: trainingId, competencyid: null, relevantlevel: null }])
  }, [trainingId])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>
            <span className="text-primary">Training</span> to{' '}
            <span className="text-primary">Competency</span> Mapping
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>
            <CCard>
              <CCardHeader>
                {toggleEdit ? (
                  <CButtonGroup>
                    <CButton
                      size="sm"
                      color="secondary"
                      type="button"
                      onClick={() => setToggleEdit(false)}
                    >
                      Cancel
                    </CButton>
                    <CButton size="sm" color="primary" type="submit">
                      Save
                    </CButton>
                  </CButtonGroup>
                ) : (
                  <CButtonGroup>
                    <CButton
                      size="sm"
                      color="primary"
                      type="button"
                      onClick={() => setToggleEdit(true)}
                    >
                      Edit
                    </CButton>
                    <CButton
                      className="float-end"
                      size="sm"
                      color="secondary"
                      variant="outline"
                      onClick={toPDF}
                    >
                      Save PDF
                    </CButton>
                  </CButtonGroup>
                )}
              </CCardHeader>
              <CCardBody ref={targetRef}>
                <CRow>
                  <CCol md={2}>
                    <b>Training :</b>
                  </CCol>
                  <CCol md={10}>{selectedTraining?.training_name}</CCol>
                </CRow>
                <CRow>
                  <CCol md={2}>
                    <b>Group :</b>
                  </CCol>
                  <CCol md={10}>
                    <CBadge color={selectedTraining?.cluster_color}>
                      {selectedTraining?.cluster_name}
                    </CBadge>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={2}>
                    <b>Description :</b>
                  </CCol>
                  <CCol md={10}>{selectedTraining?.training_description}</CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CTable small responsive bordered className="my-2">
                      <CTableHead color="secondary">
                        <CTableRow>
                          <CTableHeaderCell>#</CTableHeaderCell>
                          <CTableHeaderCell>Competency</CTableHeaderCell>
                          <CTableHeaderCell>Relevant Level</CTableHeaderCell>
                          {toggleEdit ? <CTableHeaderCell>Action</CTableHeaderCell> : null}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {trainingCompetencyData?.filter((i) => i.training_id === trainingId)
                          .length > 0 ? (
                          trainingCompetencyData
                            ?.filter((i) => i.training_id === trainingId)
                            .map((val, key) => (
                              <CTableRow key={key}>
                                <CTableDataCell>{key + 1}</CTableDataCell>
                                <CTableDataCell>{val.competency_name}</CTableDataCell>
                                <CTableDataCell>{val.training_competency_level}</CTableDataCell>
                                {toggleEdit ? (
                                  <CTableDataCell>
                                    <CButton
                                      size="sm"
                                      color="danger"
                                      variant="outline"
                                      onClick={() =>
                                        deletetrainingcompetency(val.training_competency_id)
                                      }
                                    >
                                      Delete
                                    </CButton>
                                  </CTableDataCell>
                                ) : null}
                              </CTableRow>
                            ))
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan={3} className="text-danger">
                              No Competency Mapped
                            </CTableDataCell>
                          </CTableRow>
                        )}
                        {toggleEdit
                          ? tableRows.map((row, index) => (
                              <CTableRow key={index}>
                                <CTableDataCell>
                                  {index +
                                    1 +
                                    trainingCompetencyData?.filter(
                                      (i) => i.training_id === trainingId,
                                    ).length}
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
                                    onChange={(e) =>
                                      handleRelevantLevelChange(index, e.target.value)
                                    }
                                    required
                                  >
                                    <option value={''}>..Relevant Level..</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                  </CFormSelect>
                                </CTableDataCell>
                                {toggleEdit ? (
                                  <CTableDataCell>
                                    <CButton
                                      size="sm"
                                      color="secondary"
                                      onClick={() => handleRemove(index)}
                                    >
                                      <CIcon size="sm" icon={cilMinus} />
                                    </CButton>
                                  </CTableDataCell>
                                ) : null}
                              </CTableRow>
                            ))
                          : null}
                      </CTableBody>
                    </CTable>
                    {toggleEdit ? (
                      <CButtonGroup>
                        <CButton size="sm" color="secondary" onClick={handleAddMore}>
                          <CIcon size="sm" icon={cilPlus} />
                        </CButton>
                      </CButtonGroup>
                    ) : null}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

MapTrainingCompetency.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  competencydata: PropTypes.array.isRequired,
  trainingdata: PropTypes.array.isRequired,
  trainingCompetencyData: PropTypes.array.isRequired,
  trainingId: PropTypes.number,
  createtrainingcompetency: PropTypes.func,
  deletetrainingcompetency: PropTypes.func,
}

export default MapTrainingCompetency
