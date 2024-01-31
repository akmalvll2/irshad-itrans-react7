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
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const CompetencyEdit = ({
  visible,
  setVisible,
  competencydata,
  competencyid,
  updatedcompetency,
  clusterlist,
}) => {
  const [updateddata, setupdateddata] = useState({
    competencyid: '',
    competencyname: '',
    clusterid: '',
    competencydescription: '',
    competencyindicator1: '',
    competencyindicator2: '',
    competencyindicator3: '',
    competencyindicator4: '',
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    updatedcompetency(updateddata)
    setVisible(!visible)
  }

  useEffect(() => {
    const selectedCompetency = competencydata.find((fil) => fil.competency_id === competencyid)
    if (selectedCompetency) {
      setupdateddata({
        competencyid: selectedCompetency?.competency_id,
        competencyname: selectedCompetency?.competency_name,
        clusterid: selectedCompetency?.cluster_id,
        competencydescription: selectedCompetency?.competency_description,
        competencyindicator1: selectedCompetency?.competency_indicator1,
        competencyindicator2: selectedCompetency?.competency_indicator2,
        competencyindicator3: selectedCompetency?.competency_indicator3,
        competencyindicator4: selectedCompetency?.competency_indicator4,
      })
    }
  }, [competencyid])
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CForm onSubmit={onSubmitHandle}>
          <CModalHeader>
            <CModalTitle>Competency Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {competencydata
              ?.filter((fil) => fil.competency_id === competencyid)
              .map((val, key) => {
                return (
                  <div key={key}>
                    <CFormInput
                      type="text"
                      name="competencyname"
                      className="mb-3"
                      label="Competency Name"
                      defaultValue={val.competency_name}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormLabel>Group</CFormLabel>
                    <CFormSelect
                      size="sm"
                      name="clusterid"
                      onChange={onChangeHandle}
                      defaultValue={val.cluster_id}
                    >
                      <option>..Choose Group</option>
                      {clusterlist?.map((val2, key2) => {
                        return (
                          <option key={key2} value={val2.cluster_id}>
                            {val2.cluster_name}
                          </option>
                        )
                      })}
                    </CFormSelect>
                    <CFormInput
                      type="text"
                      name="competencydescription"
                      className="mb-3"
                      label="Competency Description"
                      defaultValue={val.competency_description}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="competencyindicator1"
                      className="mb-3"
                      label="Competency Indicator 1"
                      defaultValue={val.competency_indicator1}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="competencyindicator2"
                      className="mb-3"
                      label="Competency Indicator 2"
                      defaultValue={val.competency_indicator2}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="competencyindicator3"
                      className="mb-3"
                      label="Competency Indicator 3"
                      defaultValue={val.competency_indicator3}
                      onChange={onChangeHandle}
                      required
                    />
                    <CFormInput
                      type="text"
                      name="competencyindicator4"
                      className="mb-3"
                      label="Competency Indicator 4"
                      defaultValue={val.competency_indicator4}
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

CompetencyEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  competencydata: PropTypes.array.isRequired,
  competencyid: PropTypes.number,
  updatedcompetency: PropTypes.func.isRequired,
  clusterlist: PropTypes.array.isRequired,
}

export default CompetencyEdit
