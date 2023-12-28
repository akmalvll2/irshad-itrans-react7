import {
  CCard,
  CCardBody,
  CCardImage,
  CCardImageOverlay,
  CCardTitle,
  CButton,
  CButtonGroup,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { cilPeople, cilOptions, cilPrint } from '@coreui/icons'
import { useReactToPrint } from 'react-to-print'
import { userType } from 'src/userType'

import img2 from '../../../assets/images/4.png'

import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment'
import ImportDepartment from './ImportDepartment'

import packageJson from '../../../../package.json'
const { config } = packageJson

const TableDepartment = () => {
  const componentRef = useRef()
  const [visible, setVisible] = useState(false)
  const [visiblei, setVisiblei] = useState(false)
  const [visibleImport, setVisibleImport] = useState(false)
  const [departmentid, setDepartmentid] = useState()
  const [departmentname, setDepartmentname] = useState()

  const [department, setDepartment] = useState([])

  const fetchDepartment = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`).then((response) => {
        setDepartment(response.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    let confirmdelete = window.confirm('Delete this department?')
    if (confirmdelete) {
      try {
        const deptId = e.target.value
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/deletedepartment`, { deptId })
          .then((response) => {
            if (response.data) {
              alert(response.data)
            } else {
              alert('Deletion error')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'employee_data',
  })

  useEffect(() => {
    fetchDepartment()
  }, [])
  return (
    <>
      <CCard>
        <CCardImage fluid thumbnail src={img2} height="100" />
        <CCardImageOverlay>
          <center>
            <CCardTitle>DEPARTMENT TABLE</CCardTitle>
          </center>
          <CButtonGroup className="float-end">
            {userType?.data[0].type === 'admin' ? (
              <>
                <CButton color="dark" onClick={() => setVisible(!visible)}>
                  Add
                </CButton>
                <CButton color="dark" onClick={() => setVisibleImport(!visibleImport)}>
                  Import
                </CButton>
              </>
            ) : (
              ''
            )}
            <CButton color="dark" onClick={handlePrint}>
              <CIcon icon={cilPrint} />
            </CButton>
          </CButtonGroup>
        </CCardImageOverlay>
        <CCardBody style={{ overflow: 'auto' }}>
          <CRow>
            <CCol lg={3}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilPeople} height={24} />}
                title="total department"
                value={department?.length}
              />
            </CCol>
          </CRow>
          <CTable
            striped
            hover
            bordered
            style={{ overflow: 'hidden', fontSize: '13px' }}
            ref={componentRef}
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>NO.</CTableHeaderCell>
                <CTableHeaderCell>DEPARTMENT</CTableHeaderCell>
                <CTableHeaderCell>NO OF STAFF</CTableHeaderCell>
                {userType?.data[0].type === 'admin' ? <CTableHeaderCell></CTableHeaderCell> : ''}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {department?.map((val, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableDataCell className="text-uppercase">{key + 1}</CTableDataCell>
                    <CTableDataCell className="text-uppercase">
                      {val.department_name}
                    </CTableDataCell>
                    <CTableDataCell className="text-uppercase">{val.deptcount}</CTableDataCell>
                    {userType?.data[0].type === 'admin' ? (
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="transparent" caret={false} size="sm">
                            <CIcon icon={cilOptions} height={18} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>
                              <CButton
                                style={{ width: '100%' }}
                                color="transparent"
                                onClick={(e) => {
                                  setVisiblei(!visiblei)
                                  setDepartmentid(val.department_id)
                                  setDepartmentname(val.department_name)
                                }}
                                value={val.department_id}
                              >
                                Edit
                              </CButton>
                            </CDropdownItem>
                            <CDropdownItem>
                              <CButton
                                style={{ width: '100%' }}
                                color="transparent"
                                onClick={handleDelete}
                                value={val.department_id}
                              >
                                Delete
                              </CButton>
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    ) : (
                      ''
                    )}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <AddDepartment visible={visible} setVisible={setVisible} />
      <EditDepartment
        visiblei={visiblei}
        setVisiblei={setVisiblei}
        departmentid={departmentid}
        departmentname={departmentname}
      />
      <ImportDepartment visible={visibleImport} setVisible={setVisibleImport} />
    </>
  )
}

export default TableDepartment
