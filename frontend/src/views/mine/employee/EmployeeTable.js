import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { CCol, CFormInput, CRow, CWidgetStatsF } from '@coreui/react'
import {
  CCardImage,
  CCardImageOverlay,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CBadge,
  CButtonGroup,
  CButton,
  CCard,
  CCardTitle,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CSpinner,
  CFormSelect,
  CForm,
  CCardHeader,
} from '@coreui/react'
import { cilUser, cilOptions, cilPrint, cilArrowThickBottom } from '@coreui/icons'
import { useReactToPrint } from 'react-to-print'
import img2 from '../../../assets/images/4.png'
import { userType } from 'src/userType'

import AddEmployee from './AddEmployee'
import UploadEmployee from './UploadEmployee'
import EditEmployee from './EditEmployee'
import AssignEmployee from './AssignEmployee'
import EmailNotification from './EmailNotification'
import ImportEmployee from './ImportEmployee'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EmployeeTable = () => {
  const [isLoading, setIsLoading] = useState(false)
  const componentRef = useRef()
  const [visible, setVisible] = useState(false)
  const [visiblei, setVisiblei] = useState(false)
  const [visiblex, setVisiblex] = useState(false)
  const [assignVisible, setAssignVisible] = useState(false)
  const [importVisible, setImportVisible] = useState(false)
  const [mailVisible, setMailVisible] = useState(false)
  const [employee, setEmployee] = useState([])
  const [department, setDepartment] = useState([])
  const [position, setPosition] = useState([])
  const [filteredEmployee, setFilteredEmployee] = useState([])
  const [searchQuery, setSearchQuery] = useState()
  const [isSearch, setIsSearch] = useState()
  const [editEmployee, setEditEmployee] = useState([])
  const [setting, setSetting] = useState([])
  const completeStat = employee?.filter((employees) => employees.stat > 0).length
  const incompleteStat = employee?.filter((employees) => employees.stat < 1).length
  const completeStat2 = employee?.filter((employees) => employees.stat2 > 0).length
  const incompleteStat2 = employee?.filter((employees) => employees.stat2 < 1).length

  const getBadge = (status) => {
    if (status > 0) {
      return 'Complete'
    } else {
      return 'Incomplete'
    }
  }
  const getBadgeColor = (status) => {
    if (status > 0) {
      return 'success'
    } else {
      return 'danger'
    }
  }
  const getBadgeColor2 = (status) => {
    if (status === 'user') {
      return 'secondary'
    } else {
      return 'info'
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearch(true)
    var { value } = e.target
    setSearchQuery(value)
    const newFilteredEmployee = employee?.filter(
      (item) =>
        item.departmentname?.toLowerCase().includes(value.toLowerCase()) ||
        item.staff_name?.toLowerCase().includes(value.toLowerCase()) ||
        item.jobTitle?.toLowerCase().includes(value.toLowerCase()) ||
        item.staff_id?.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredEmployee(newFilteredEmployee)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setIsSearch(false)
    var { value } = e.target
    if (value === 'all') {
      value = ''
    }
    setSearchQuery(value)
    const newFilteredEmployee = employee?.filter(
      (item) =>
        item.departmentname?.toLowerCase().includes(value.toLowerCase()) ||
        item.staff_name?.toLowerCase().includes(value.toLowerCase()) ||
        item.jobTitle?.toLowerCase().includes(value.toLowerCase()) ||
        item.staff_id?.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredEmployee(newFilteredEmployee)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    let confirmdelete = window.confirm('Confirm Delete?')
    if (confirmdelete) {
      try {
        const staffId = e.target.value
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/deleteemployee`, { staffId })
          .then((response) => {
            if (response.data) {
              alert('Staff has been removed from the system')
              window.location.reload()
            } else {
              alert('Deletion error')
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'employee_data',
  })

  const handleEmailReminder = async (e) => {
    e.preventDefault()
    let confirmremind = window.confirm('Send Temporary Password Reminder?')
    if (confirmremind) {
      try {
        const id = e.target.value
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/mailpassword`, { id })
          .then((response) => {
            if (response) {
              console.log(response)
            } else {
              console.log('Error sending password mail reminder')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }
  const fetchEmployee = async () => {
    try {
      setIsLoading(true)
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        setEmployee(response.data)
        setFilteredEmployee(response.data)
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/department`).then((response) => {
        setDepartment(response.data)
      })
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/position`).then((response) => {
        setPosition(response.data)
      })
    } catch (error) {
      //console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const fetchSetting = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/appname`).then((response) => {
        if (response) {
          setSetting(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchEmployee()
    fetchSetting()
  }, [])
  return (
    <>
      <CCard>
        {/*<CCardImage fluid thumbnail src={img2} height="100" />
        <CCardImageOverlay>
          <center>
            <CCardTitle>EMPLOYEE TABLE</CCardTitle>
          </center>
          {userType?.data[0].type === 'admin' ? (
            <CButtonGroup className="float-end">
              <CButton color="dark" onClick={() => setMailVisible(!mailVisible)}>
                Email
              </CButton>
              <CButton color="dark" onClick={() => setVisible(!visible)}>
                Add
              </CButton>
              <CButton color="dark" onClick={() => setVisiblei(!visiblei)} accept={'.csv'}>
                Import
          </CButton>
              <CButton color="dark" onClick={handlePrint}>
                <CIcon icon={cilPrint} />
              </CButton>
            </CButtonGroup>
          ) : (
            ''
          )}
        </CCardImageOverlay>*/}
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <center>
            <CCardTitle>EMPLOYEE TABLE</CCardTitle>
          </center>
          {userType?.data[0].type === 'admin' ? (
            <CButtonGroup className="float-end">
              {/*<CButton color="dark" onClick={() => setMailVisible(!mailVisible)}>
                Email
          </CButton>*/}
              <CButton color="dark" onClick={() => setVisible(!visible)}>
                Add
              </CButton>
              <CButton color="dark" onClick={() => setImportVisible(!importVisible)}>
                Import
              </CButton>
              <CButton color="dark" onClick={handlePrint}>
                <CIcon icon={cilPrint} />
              </CButton>
            </CButtonGroup>
          ) : (
            ''
          )}
        </CCardHeader>
        <CCardBody>
          {isLoading ? (
            <CSpinner component="span" size="lg" color="dark" aria-hidden="true" />
          ) : (
            <div>
              <CRow>
                <CCol lg={3}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="primary"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="total staff"
                    value={employee?.length}
                  />
                </CCol>
                {/*<CCol lg={3}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="success"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="Self Complete"
                    value={completeStat}
                  />
                </CCol>
                <CCol lg={3}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="Self InComplete"
                    value={incompleteStat}
                  />
                </CCol>
                <CCol lg={3}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="success"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="Superior Complete"
                    value={completeStat2}
                  />
                </CCol>
                <CCol lg={3}>
                  <CWidgetStatsF
                    className="mb-3"
                    color="danger"
                    icon={<CIcon icon={cilUser} height={24} />}
                    title="Superior InComplete"
                    value={incompleteStat2}
                  />
          </CCol>*/}
              </CRow>
              <CRow>
                <CCol>
                  <CFormInput
                    size="sm"
                    type="text"
                    id="floatingInput"
                    floatingClassName="mb-3"
                    floatingLabel="Search ID , Name , Position , Department"
                    placeholder="Search"
                    defaultValue={isSearch ? '' : ''}
                    onChange={handleSearch}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol width="50">
                  <CAccordion>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader>Filter</CAccordionHeader>
                      <CAccordionBody>
                        <CFormSelect
                          size="sm"
                          id="floatingInput"
                          className="mb-3"
                          label="Department"
                          name="department"
                          onChange={handleFilter}
                        >
                          <option value="all" selected={isSearch}>
                            (All)
                          </option>
                          {department?.map((val, key) => {
                            return (
                              <option key={key} value={val.department_name}>
                                {val.department_name}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
                </CCol>
              </CRow>
              <br />
              <CTable
                striped
                hover
                bordered
                responsive
                style={{ overflow: 'hidden', fontSize: '13px' }}
                ref={componentRef}
              >
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell rowSpan={2}>NO.</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>ID</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>NAME</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>POSITION</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>DEPARTMENT</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>SUPERIOR</CTableHeaderCell>
                    {/*<CTableHeaderCell colSpan={2}>CGA STATUS</CTableHeaderCell>*/}
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                  {/*<CTableRow>
                    <CTableHeaderCell>SELF</CTableHeaderCell>
                    <CTableHeaderCell>SUPERIOR</CTableHeaderCell>
                        </CTableRow>*/}
                </CTableHead>
                <CTableBody>
                  {filteredEmployee?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell className="text-uppercase">{key + 1}</CTableDataCell>
                        <CTableDataCell className="text-uppercase">{val.staff_id}</CTableDataCell>
                        <CTableDataCell className="text-uppercase">
                          <span>{val.staff_name}</span>
                          <span style={{ margin: '1rem' }}>
                            <CBadge size="sm" color={getBadgeColor2(val.type)}>
                              {val.type}
                            </CBadge>
                          </span>
                        </CTableDataCell>
                        <CTableDataCell className="text-uppercase">{val.jobTitle}</CTableDataCell>
                        <CTableDataCell className="text-uppercase">
                          {val.departmentname}
                        </CTableDataCell>
                        <CTableDataCell className="text-uppercase">
                          {employee
                            ?.filter((idx) => idx.staff_id === val.reporting_to)
                            .map((item) => item.staff_name)}
                        </CTableDataCell>
                        {/*<CTableDataCell>
                          <CBadge color={getBadgeColor(val.stat)}>{getBadge(val.stat)}</CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={getBadgeColor(val.stat2)}>{getBadge(val.stat2)}</CBadge>
                          </CTableDataCell>*/}
                        {userType?.data[0].type === 'admin' ? (
                          <CTableDataCell>
                            <CDropdown placement="auto">
                              <CDropdownToggle color="transparent" caret={false} size="sm">
                                <CIcon icon={cilOptions} height={18} />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem>
                                  <CButton
                                    style={{ width: '100%' }}
                                    color="transparent"
                                    onClick={(e) => {
                                      setEditEmployee(filteredEmployee[key])
                                      setVisiblex(!visiblex)
                                    }}
                                    value={val.staff_id}
                                  >
                                    Edit
                                  </CButton>
                                </CDropdownItem>
                                {setting[0]?.setting_app_survey_2 === 1 &&
                                setting[0]?.setting_app_survey_3 === 1 ? (
                                  <CDropdownItem>
                                    <CButton
                                      style={{ width: '100%' }}
                                      color="transparent"
                                      onClick={(e) => {
                                        setEditEmployee(filteredEmployee[key])
                                        setAssignVisible(!assignVisible)
                                      }}
                                      value={val.staff_id}
                                    >
                                      Assign Reviewer
                                    </CButton>
                                  </CDropdownItem>
                                ) : (
                                  ''
                                )}
                                <CDropdownItem>
                                  <CButton
                                    style={{ width: '100%' }}
                                    color="transparent"
                                    onClick={handleEmailReminder}
                                    value={val.staff_id}
                                  >
                                    Send Password Reminder
                                  </CButton>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <CButton
                                    style={{ width: '100%' }}
                                    color="transparent"
                                    onClick={handleDelete}
                                    value={val.staff_id}
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
            </div>
          )}
        </CCardBody>
      </CCard>
      <UploadEmployee visiblei={visiblei} setVisiblei={setVisiblei} />
      <AddEmployee visible={visible} setVisible={setVisible} />
      <EditEmployee
        visible={visiblex}
        setVisible={setVisiblex}
        employee={editEmployee}
        setEmployee={setEditEmployee}
      />
      <EmailNotification visible={mailVisible} setVisible={setMailVisible} receiver={employee} />
      <AssignEmployee
        visible={assignVisible}
        setVisible={setAssignVisible}
        employee={employee}
        activeEmployee={editEmployee}
        setActiveEmployee={setEditEmployee}
      />
      <ImportEmployee visible={importVisible} setVisible={setImportVisible} />
    </>
  )
}

export default EmployeeTable
