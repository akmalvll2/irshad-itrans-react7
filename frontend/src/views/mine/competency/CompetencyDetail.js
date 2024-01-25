import React from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const CompetencyDetail = ({
  visible,
  setVisible,
  competencydata,
  viewCompetency,
  deleteCompetency,
  setToggleEditCompetency,
  editCompetency,
  clusterdata,
}) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Competency Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {competencydata
            ?.filter((fil) => fil.competency_id === viewCompetency)
            .map((val, key) => {
              return (
                <>
                  <CTable key={key} small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Name:</CTableDataCell>
                        <CTableDataCell>{val.competency_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Group:</CTableDataCell>
                        <CTableDataCell>
                          {clusterdata?.find((fi) => fi.cluster_id === val.cluster_id).cluster_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Description:</CTableDataCell>
                        <CTableDataCell>{val.competency_description}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Indicator 1:</CTableDataCell>
                        <CTableDataCell>{val.competency_indicator1}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Indicator 2:</CTableDataCell>
                        <CTableDataCell>{val.competency_indicator2}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Indicator 3:</CTableDataCell>
                        <CTableDataCell>{val.competency_indicator3}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Indicator 4:</CTableDataCell>
                        <CTableDataCell>{val.competency_indicator4}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <span className="text-black-50">
                    Registered in the system on {Date(val.competency_system_register)}
                  </span>
                </>
              )
            })}
        </CModalBody>
        <CModalFooter>
          <CButtonGroup>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                editCompetency(viewCompetency)
                setToggleEditCompetency(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteCompetency(viewCompetency)
                setVisible(!visible)
              }}
            >
              <CIcon icon={cilTrash} /> Delete
            </CButton>
          </CButtonGroup>
          <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

CompetencyDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  competencydata: PropTypes.array.isRequired,
  viewCompetency: PropTypes.number,
  deleteCompetency: PropTypes.func.isRequired,
  setToggleEditCompetency: PropTypes.func.isRequired,
  editCompetency: PropTypes.func,
  clusterdata: PropTypes.array.isRequired,
}

export default CompetencyDetail
