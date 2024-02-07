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
import { cilTrash, cilPencil } from '@coreui/icons'

const JobDetail = ({
  visible,
  setVisible,
  jobdata,
  viewJob,
  deleteJob,
  setToggleEditJob,
  editJob,
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
          <CModalTitle id="StaticBackdropExampleLabel">Position Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {jobdata
            ?.filter((fil) => fil.position_id === viewJob)
            .map((val, key) => {
              return (
                <div key={key}>
                  <CTable small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Title:</CTableDataCell>
                        <CTableDataCell>{val.position_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Grade:</CTableDataCell>
                        <CTableDataCell>{val.position_grade}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Description:</CTableDataCell>
                        <CTableDataCell>{val.position_description}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <span className=" text-black-50">
                    Registered in the system on {Date(val.position_system_register)}
                  </span>
                </div>
              )
            })}
        </CModalBody>
        <CModalFooter>
          <CButtonGroup>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                editJob(viewJob)
                setToggleEditJob(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteJob(viewJob)
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

JobDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  jobdata: PropTypes.array.isRequired,
  viewJob: PropTypes.number,
  deleteJob: PropTypes.func.isRequired,
  setToggleEditJob: PropTypes.func.isRequired,
  editJob: PropTypes.func,
}

export default JobDetail
