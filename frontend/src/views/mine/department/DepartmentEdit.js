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

const DepartmentEdit = ({
  visible,
  setVisible,
  departmentdata,
  departmentid,
  updateddepartment,
}) => {
  const [updateddata, setupdateddata] = useState({
    departmentid: '',
    departmentname: '',
    departmentdescription: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updateddepartment(updateddata)
    setVisible(!visible)
  }

  useEffect(() => {
    const selectedDepartment = departmentdata.find((fil) => fil.department_id === departmentid)
    if (selectedDepartment) {
      setupdateddata({
        departmentid: selectedDepartment?.department_id,
        departmentname: selectedDepartment?.department_name,
        departmentdescription: selectedDepartment?.department_description,
      })
    }
  }, [departmentid])
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
            <CModalTitle id="StaticBackdropExampleLabel">Department Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {departmentdata
              ?.filter((fil) => fil.department_id === departmentid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CFormInput
                      type="text"
                      name="departmentname"
                      className="mb-3"
                      label="Department Name"
                      defaultValue={val.department_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="departmentdescription"
                      className="mb-3"
                      label="Department Description"
                      defaultValue={val.department_description}
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

DepartmentEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  departmentdata: PropTypes.array.isRequired,
  departmentid: PropTypes.number,
  updateddepartment: PropTypes.func.isRequired,
}

export default DepartmentEdit
