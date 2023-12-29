import React, { Suspense } from 'react'
import { CSpinner } from '@coreui/react'

//import department component
const DepartmentTable = React.lazy(() => import('./DepartmentTable'))

const Department = () => {
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <DepartmentTable />
      </Suspense>
    </>
  )
}

export default Department
