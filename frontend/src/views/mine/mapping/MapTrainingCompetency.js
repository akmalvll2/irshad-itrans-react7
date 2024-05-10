import React, { useEffect, useState } from 'react'
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
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const MapTrainingCompetency = ({
  visible,
  setVisible,
  positiondata,
  competencydata,
  positionid,
  positioncompetencydata,
  createnewjobcompetency,
  deleteJobCompetency,
}) => {
  const [tableRows, setTableRows] = useState([
    { positionid: positionid, competencyid: null, expectedlevel: null },
  ])
  const selectedPosition = positiondata?.filter((fil) => fil.position_id === positionid)

  const handleAddMore = () => {
    if (tableRows.length < competencydata.length) {
      setTableRows([
        ...tableRows,
        { positionid: positionid, competencyid: null, expectedlevel: null },
      ])
    }
  }

  const handleRemove = (index) => {
    if (tableRows.length === 1) {
      return
    }

    const updatedRows = [...tableRows]
    updatedRows.splice(index, 1)
    setTableRows(updatedRows)
  }

  const handleCompetencyChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].competencyid = value
    setTableRows(updatedRows)
  }

  const handleExpectedLevelChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].expectedlevel = value
    setTableRows(updatedRows)
  }

  const handleSubmit = () => {
    try {
      tableRows?.forEach((val) => {
        createnewjobcompetency(val)
      })
      alert(' Successfully mapped ')
      setVisible(!visible)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setTableRows([{ positionid: positionid, competencyid: null, expectedlevel: null }])
  }, [positionid])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>
            Training Competency Mapping <br /> ({' '}
            <span className="text-black-50">{selectedPosition[0]?.position_name}</span> )
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit}>
          <CModalBody>Training Mapping Content</CModalBody>
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

MapTrainingCompetency.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  positiondata: PropTypes.array.isRequired,
  competencydata: PropTypes.array.isRequired,
  positionid: PropTypes.number,
  positioncompetencydata: PropTypes.array.isRequired,
  createnewjobcompetency: PropTypes.func.isRequired,
  deleteJobCompetency: PropTypes.func.isRequired,
}

export default MapTrainingCompetency
