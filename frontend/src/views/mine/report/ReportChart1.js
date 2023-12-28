import { CCard, CCardBody } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import React from 'react'

const ReportChart1 = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CChart
            type="pie"
            data={{
              labels: [
                'Organizational Awareness Training',
                'Communication Training',
                'Team Building',
                'Project Management Course',
                'Programming Course',
              ],
              datasets: [
                {
                  backgroundColor: ['#00188C', '#2F46B9', '#95A5F5', '#E3E6F2', 'blue'],
                  data: [40, 20, 80, 10, 5],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: 'blue',
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default ReportChart1
