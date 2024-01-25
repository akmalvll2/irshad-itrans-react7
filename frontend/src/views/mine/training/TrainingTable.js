import React from 'react'
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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const TrainingTable = ({
  traininglist,
  setToggleCreateTraining,
  deleteTraining,
  setToggleDetailTraining,
  viewTraining,
  setToggleEditTraining,
  editTraining,
}) => {
  return (
    <>
      <div>
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
              <h4>TRAINING</h4>
            </center>
            <CButtonGroup className="float-end">
              <CButton size="sm" color="secondary" onClick={() => setToggleCreateTraining(true)}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CButton size="sm" color="secondary">
                <CIcon icon={cilSave} />
              </CButton>
            </CButtonGroup>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL TRAINING"
                  value={traininglist.length}
                />
              </CCol>
            </CRow>
            {traininglist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Training</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {traininglist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.training_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleDetailTraining(true)
                                viewTraining(val.training_id)
                              }}
                            >
                              <CIcon icon={cilMagnifyingGlass} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleEditTraining(true)
                                editTraining(val.training_id)
                              }}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              variant="outline"
                              onClick={() => deleteTraining(val.training_id)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="danger">
                No training data available.
                <CButton color="link" onClick={() => setToggleCreateTraining(true)}>
                  Add training
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

TrainingTable.propTypes = {
  traininglist: PropTypes.array.isRequired,
  setToggleCreateTraining: PropTypes.func.isRequired,
  setToggleDetailTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  viewTraining: PropTypes.func.isRequired,
  setToggleEditTraining: PropTypes.func.isRequired,
  editTraining: PropTypes.func,
}

export default TrainingTable
