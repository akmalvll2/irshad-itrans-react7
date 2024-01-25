import React, { useState, useEffect } from 'react'
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
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CFormCheck,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const EmployeeEdit = ({
  visible,
  setVisible,
  employeedata,
  employeeid,
  updatedemployee,
  departmentdata,
  positiondata,
}) => {
  const [updateddata, setupdateddata] = useState({
    employeeid: '',
    employeename: '',
    employeeemail: '',
    departmentid: '',
    positionid: '',
    managerid: '',
    employeerole: '',
    employeeidnumber: '',
    employeejoindate: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updatedemployee(updateddata)
    setVisible(!visible)
  }

  const fetchDate = (cga) => {
    const date = new Date(cga)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const newDate = `${year}-${month}-${day}`

    return newDate
  }

  useEffect(() => {
    const selectedEmployee = employeedata.find((fil) => fil.staff_id === employeeid)
    if (selectedEmployee) {
      setupdateddata({
        employeeid: selectedEmployee?.staff_id,
        employeename: selectedEmployee?.staff_name,
        employeeemail: selectedEmployee?.staff_email,
        departmentid: selectedEmployee?.department_id,
        positionid: selectedEmployee?.position_id,
        managerid: selectedEmployee?.manager_id,
        employeerole: selectedEmployee?.staff_role,
        employeeidnumber: selectedEmployee?.staff_id_number,
        employeejoindate: selectedEmployee?.staff_organization_register,
      })
    }
  }, [employeeid])
  console.log(updateddata)
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CForm onSubmit={onSubmitHandle}>
          <CModalHeader>
            <CModalTitle>Department Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {employeedata
              ?.filter((fil) => fil.staff_id === employeeid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="employeename"
                      className="mb-3"
                      label="Name"
                      defaultValue={val.staff_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="email"
                      size="sm"
                      name="employeeemail"
                      className="mb-3"
                      label="Email"
                      defaultValue={val.staff_email}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormLabel>Department</CFormLabel>
                    <CFormSelect
                      aria-label="Department"
                      size="sm"
                      name="departmentid"
                      onChange={onChangeHandle}
                    >
                      <option>..Department..</option>
                      {departmentdata?.map((val2, key2) => {
                        return (
                          <option
                            key={key2}
                            value={val2.department_id}
                            selected={val2.department_id === val.department_id ? true : false}
                          >
                            {val2.department_name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormLabel>Designation</CFormLabel>
                    <CFormSelect
                      aria-label="Position"
                      size="sm"
                      name="positionid"
                      onChange={onChangeHandle}
                    >
                      <option>..Designation..</option>
                      {positiondata?.map((val2, key2) => {
                        return (
                          <option
                            key={key2}
                            value={val2.position_id}
                            selected={val2.position_id === val.position_id ? true : false}
                          >
                            {val2.position_name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormLabel>Superior</CFormLabel>
                    <CFormSelect
                      aria-label="Superior"
                      size="sm"
                      name="managerid"
                      onChange={onChangeHandle}
                      disabled={val.manager_id === 0 ? true : false}
                    >
                      <option>..Superior..</option>
                      {employeedata
                        ?.filter((fil) => fil.staff_id !== val.staff_id)
                        .map((val2, key2) => {
                          return (
                            <option
                              key={key2}
                              value={val2.staff_id}
                              selected={val2.staff_id === val.manager_id ? true : false}
                            >
                              {val2.staff_name}
                            </option>
                          )
                        })}
                      {val.manager_id === 0 ? <option selected>No Superior</option> : ''}
                    </CFormSelect>
                    <CFormLabel>Role</CFormLabel>
                    <CFormCheck
                      type="radio"
                      name="employeerole"
                      label="User"
                      value="user"
                      onChange={onChangeHandle}
                      //checked={updateddata.employeerole === 'user'}
                      defaultChecked={updateddata.employeerole === 'user' ? true : false}
                    />
                    <CFormCheck
                      type="radio"
                      name="employeerole"
                      label="Admin"
                      value="admin"
                      onChange={onChangeHandle}
                      //checked={updateddata.employeerole === 'admin'}
                      defaultChecked={updateddata.employeerole === 'admin' ? true : false}
                    />
                    <CFormInput
                      type="date"
                      size="sm"
                      name="employeejoindate"
                      className="mb-3"
                      label="Date of Report Duty"
                      onChange={onChangeHandle}
                      defaultValue={fetchDate(val.staff_organization_register)}
                      required
                    />
                  </div>
                )
              })}
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

EmployeeEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  employeedata: PropTypes.array.isRequired,
  employeeid: PropTypes.number,
  updatedemployee: PropTypes.func.isRequired,
  departmentdata: PropTypes.array.isRequired,
  positiondata: PropTypes.array.isRequired,
}

export default EmployeeEdit
