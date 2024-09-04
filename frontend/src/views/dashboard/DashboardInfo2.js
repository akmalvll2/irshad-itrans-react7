import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// IMPORT COREUI COMPONENT
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CWidgetStatsD,
} from '@coreui/react'

import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'

const DashboardInfo2 = ({
  employeelist,
  departmentlist,
  competencylist,
  traininglist,
  joblist,
}) => {
  return (
    <div>
      <CWidgetStatsD
        className="mb-3"
        icon={<CIcon className="my-4 text-white" icon={cilBuilding} height={52} />}
        chart={
          <CChartLine
            className="position-absolute w-100 h-100"
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  backgroundColor: 'rgba(0,0,0,.1)',
                  borderColor: 'rgba(200,200,200,.55)',
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: [65, 59, 84, 84, 51, 55, 40],
                  fill: true,
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            }}
          />
        }
        style={{ '--cui-card-cap-bg': '#001F60' }}
        values={[
          { title: 'STAFF', value: employeelist?.length },
          { title: 'DEPARTMENT', value: departmentlist?.length },
          { title: 'COMPETENCY', value: competencylist?.length },
          { title: 'TRAINING', value: traininglist?.length },
          { title: 'POSITION', value: joblist?.length },
        ]}
      />
    </div>
  )
}

DashboardInfo2.propTypes = {
  employeelist: PropTypes.array.isRequired,
  departmentlist: PropTypes.array.isRequired,
  competencylist: PropTypes.array.isRequired,
  traininglist: PropTypes.array.isRequired,
  joblist: PropTypes.array.isRequired,
}

export default DashboardInfo2
