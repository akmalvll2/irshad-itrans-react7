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

const EmployeeDetail = ({
  visible,
  setVisible,
  employeedata,
  viewEmployee,
  deleteEmployee,
  setToggleEditEmployee,
  editEmployee,
  departmentdata,
  positiondata,
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
          <CModalTitle id="StaticBackdropExampleLabel">Employee Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {employeedata
            ?.filter((fil) => fil.staff_id === viewEmployee)
            .map((val, key) => {
              return (
                <div key={key}>
                  <CTable small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Name:</CTableDataCell>
                        <CTableDataCell>{val.staff_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Email:</CTableDataCell>
                        <CTableDataCell>{val.staff_email}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Designation:</CTableDataCell>
                        <CTableDataCell>
                          {
                            positiondata.find((fil) => fil.position_id === val.position_id)
                              ?.position_name
                          }
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Department:</CTableDataCell>
                        <CTableDataCell>
                          {
                            departmentdata.find((fil) => fil.department_id === val.department_id)
                              ?.department_name
                          }
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Superior:</CTableDataCell>
                        <CTableDataCell>
                          {employeedata.find((fil) => fil.staff_id === val.manager_id)?.staff_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Role:</CTableDataCell>
                        <CTableDataCell>{val.staff_role}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Staff Number:</CTableDataCell>
                        <CTableDataCell>{val.staff_id_number}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Date of Report Duty:</CTableDataCell>
                        <CTableDataCell>{Date(val.staff_organization_register)}</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <span className=" text-black-50">
                    Registered in the system on {Date(val.staff_system_register)}
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
                editEmployee(viewEmployee)
                setToggleEditEmployee(true)
              }}
            >
              <CIcon icon={cilPencil} /> Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                deleteEmployee(viewEmployee)
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

EmployeeDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  employeedata: PropTypes.array.isRequired,
  viewEmployee: PropTypes.number,
  deleteEmployee: PropTypes.func.isRequired,
  setToggleEditEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.func,
  departmentdata: PropTypes.array.isRequired,
  positiondata: PropTypes.array.isRequired,
}

export default EmployeeDetail
