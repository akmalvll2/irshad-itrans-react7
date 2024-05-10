import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
  CImage,
  CRow,
  CCol,
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
    employeeimage: '',
    departmentid: '',
    positionid: '',
    managerid: '',
    employeerole: '',
    employeeidnumber: '',
    employeejoindate: '',
  })

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const onChangeHandle = async (e) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      var file = e.target.files[0]
      file = await convertFileToBase64(file)
      const newObject = { ...updateddata, [name]: file }
      setupdateddata(newObject)
      return
    }
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
        employeeimage: selectedEmployee?.staff_image,
        departmentid: selectedEmployee?.department_id,
        positionid: selectedEmployee?.position_id,
        managerid: selectedEmployee?.manager_id,
        employeerole: selectedEmployee?.staff_role,
        employeeidnumber: selectedEmployee?.staff_id_number,
        employeejoindate: moment(selectedEmployee?.staff_organization_register).format(
          'YYYY-MM-DD',
        ),
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
            <CModalTitle>Employee Edit</CModalTitle>
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
                    <CRow>
                      <CCol lg={2}>
                        <CImage fluid src={val.staff_image} />
                      </CCol>
                      <CCol lg={10}>
                        <CFormInput
                          type="file"
                          size="sm"
                          accept="image/jpg"
                          name="employeeimage"
                          className="mb-3"
                          label="Employee Image"
                          onChange={onChangeHandle}
                        />
                      </CCol>
                    </CRow>

                    <CFormLabel>Department</CFormLabel>
                    <CFormSelect
                      aria-label="Department"
                      size="sm"
                      name="departmentid"
                      onChange={onChangeHandle}
                      defaultValue={val.department_id}
                    >
                      <option>..Department..</option>
                      {departmentdata?.map((val2, key2) => {
                        return (
                          <option key={key2} value={val2.department_id}>
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
                      defaultValue={val.position_id}
                    >
                      <option>..Designation..</option>
                      {positiondata?.map((val2, key2) => {
                        return (
                          <option key={key2} value={val2.position_id}>
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
                      defaultValue={val.manager_id === 0 ? 0 : val.manager_id}
                      disabled={val.manager_id === 0 ? true : false}
                    >
                      <option>..Superior..</option>
                      {employeedata
                        ?.filter((fil) => fil.staff_id !== val.staff_id)
                        .map((val2, key2) => {
                          return (
                            <option key={key2} value={val2.staff_id}>
                              {val2.staff_name}
                            </option>
                          )
                        })}
                      {val.manager_id === 0 ? <option value="0">No Superior</option> : ''}
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
