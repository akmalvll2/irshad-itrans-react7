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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const EmployeeEdit = ({ visible, setVisible, employeedata, employeeid, updatedemployee }) => {
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

  useEffect(() => {
    const selectedEmployee = employeedata.find((fil) => fil.staff_id === employeeid)
    if (selectedEmployee) {
      setupdateddata({
        staffid: selectedEmployee?.staff_id,
        staffname: selectedEmployee?.staff_name,
        staffemail: selectedEmployee?.staff_email,
      })
    }
  }, [employeeid])
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
                      name="employeename"
                      className="mb-3"
                      label="Name"
                      defaultValue={val.staff_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="employeeemail"
                      className="mb-3"
                      label="Email"
                      defaultValue={val.staff_email}
                      onChange={onChangeHandle}
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
}

export default EmployeeEdit
