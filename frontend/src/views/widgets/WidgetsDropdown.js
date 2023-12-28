import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={4} lg={4}>
        <CWidgetStatsA
          className="mb-4 p-2"
          color="info"
          value={
            <>
              Executive
              <br />
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Position with highest gap rate"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
      <CCol sm={4} lg={4}>
        <CWidgetStatsA
          className="mb-4 p-2"
          color="info"
          value={
            <>
              Employability & Student Development Department
              <br />
              <span className="fs-6 fw-normal">
                (60.9% <CIcon className=" text-bg-500" icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Department with highest staff with gap"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
      <CCol sm={4} lg={4}>
        <CWidgetStatsA
          className="mb-4 p-2"
          color="info"
          value={
            <>
              Executive
              <br />
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Position with highest gap rate"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
