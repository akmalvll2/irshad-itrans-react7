import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CTooltip,
  CWidgetStatsF,
  CImage,
  CCardImage,
  CAvatar,
  CBadge,
  CContainer,
  CCardFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSave,
  cilTrash,
  cilMagnifyingGlass,
  cilPencil,
  cilSettings,
} from '@coreui/icons'

const EmployeeChart = ({
  employeelist,
  setToggleCreateEmployee,
  deleteEmployee,
  setToggleDetailEmployee,
  viewEmployee,
  setToggleEditEmployee,
  editEmployee,
  id,
}) => {
  const buildTree = (employees, managerId) => {
    const subordinates = employees.filter((employee) => employee.manager_id === managerId)
    if (subordinates.length === 0) {
      return [] // Terminate recursion if there are no subordinates
    }
    return subordinates.map((subordinate) => ({
      label: subordinate.staff_name,
      image: subordinate.staff_image,
      staff_id: subordinate.staff_id,
      children: buildTree(employees, subordinate.staff_id), // Recursively build tree for subordinates
    }))
  }

  const rootEmployees = employeelist?.filter(
    (employee) =>
      employee.manager_id === 0 || !employeelist.some((e) => e.staff_id === employee.manager_id),
  ) // Assuming employees without supervisors are root employees
  const treeData = rootEmployees?.map((employee) => ({
    label: employee.staff_name,
    image: employee.staff_image,
    staff_id: employee.staff_id,
    children: buildTree(employeelist, employee.staff_id),
  }))

  const renderTreeNodes = (nodes) => {
    return nodes.map((node, key) => (
      <TreeNode
        key={key}
        label={
          <CContainer>
            <CCard className="d-inline-block m-0">
              <CCardBody className=" d-flex flex-column justify-content-center align-items-center p-0">
                <CButton
                  color="secondary"
                  variant="outline"
                  onClick={() => {
                    setToggleDetailEmployee(true)
                    viewEmployee(node.staff_id)
                  }}
                >
                  <CAvatar size="lg" src={node.image} />
                  {node.label}
                </CButton>
              </CCardBody>
            </CCard>
          </CContainer>
        }
      >
        {node.children.length > 0 ? renderTreeNodes(node.children) : null}
      </TreeNode>
    ))
  }
  return (
    <CTable small responsive borderless>
      <CTableBody>
        <CTableRow>
          <CTableDataCell>
            {treeData?.map((node, key) => (
              <Tree
                key={key}
                lineWidth={'2px'}
                lineColor={'gray'}
                lineBorderRadius={'10px'}
                label={
                  <CContainer>
                    <CCard className="d-inline-block m-0">
                      <CCardBody className=" d-flex flex-column justify-content-center align-items-center p-0">
                        <CButton
                          color="secondary"
                          variant="outline"
                          onClick={() => {
                            setToggleDetailEmployee(true)
                            viewEmployee(node.staff_id)
                          }}
                        >
                          <CAvatar size="lg" src={node.image} />
                          {node.label}
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </CContainer>
                }
              >
                {renderTreeNodes(node.children)}
              </Tree>
            ))}
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )
}

EmployeeChart.propTypes = {
  employeelist: PropTypes.array.isRequired,
  setToggleCreateEmployee: PropTypes.func.isRequired,
  setToggleDetailEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  viewEmployee: PropTypes.func.isRequired,
  setToggleEditEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.func,
  id: PropTypes.number,
}

export default EmployeeChart
