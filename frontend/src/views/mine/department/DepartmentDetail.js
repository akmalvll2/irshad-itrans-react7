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

const DepartmentDetail = ({
  visible,
  setVisible,
  departmentdata,
  viewDepartment,
  deleteDepartment,
  setToggleEditDepartment,
  editDepartment,
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
          <CModalTitle id="StaticBackdropExampleLabel">Department Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {departmentdata
            ?.filter((fil) => fil.department_id === viewDepartment)
            .map((val, key) => {
              return (
                <CTable key={key} small bordered stripedColumns>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>Name:</CTableDataCell>
                      <CTableDataCell>{val.department_name}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>Description:</CTableDataCell>
                      <CTableDataCell>{val.department_description}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>Registered in the system:</CTableDataCell>
                      <CTableDataCell>{val.department_system_register}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              )
            })}
        </CModalBody>
        <CModalFooter>
          <CButtonGroup>
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                editDepartment(viewDepartment)
                setToggleEditDepartment(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteDepartment(viewDepartment)
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

DepartmentDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  departmentdata: PropTypes.array.isRequired,
  viewDepartment: PropTypes.number,
  deleteDepartment: PropTypes.func.isRequired,
  setToggleEditDepartment: PropTypes.func.isRequired,
  editDepartment: PropTypes.func,
}

export default DepartmentDetail