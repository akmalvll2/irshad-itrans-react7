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
  CRow,
  CCol,
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
  indicatorlist,
  updateindicator,
}) => {
  const [updateddata, setupdateddata] = useState({
    competencyid: '',
    competencyname: '',
    clusterid: '',
    competencydescription: '',
  })
  const [updateddata2, setupdateddata2] = useState([])

  const onChangeHandle = (e) => {
    const { name, value } = e.target
    const newObject = { ...updateddata, [name]: value }
    setupdateddata(newObject)
  }

  const onChangeHandle2 = (e, index) => {
    const { name, value } = e.target
    const newObject = [...updateddata2]
    newObject[index] = { ...updateddata2[index], [name]: value }
    setupdateddata2(newObject)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    try {
      updatedcompetency(updateddata)
      updateddata2.forEach((i) => updateindicator(i))
    } catch (err) {
      console.log(err)
    } finally {
      setVisible(!visible)
      alert('Competency Information Updated')
    }
  }

  useEffect(() => {
    const selectedCompetency = competencydata.find((fil) => fil.competency_id === competencyid)
    const selectedIndicator = indicatorlist.filter((fil) => fil.competency_id === competencyid)
    if (selectedCompetency) {
      setupdateddata({
        competencyid: selectedCompetency?.competency_id,
        competencyname: selectedCompetency?.competency_name,
        clusterid: selectedCompetency?.cluster_id,
        competencydescription: selectedCompetency?.competency_description,
      })
    }
    if (selectedIndicator) {
      setupdateddata2(
        selectedIndicator?.map((i) => ({
          indicatorid: i.indicator_id,
          competencyid: i.competency_id,
          indicatordescription: i.indicator_description,
        })),
      )
    }
  }, [competencyid])
  return (
    <>
      <CModal backdrop="static" size="lg" visible={visible} onClose={() => setVisible(false)}>
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
                    <CRow>
                      <CCol>
                        <CFormInput
                          type="text"
                          name="competencyname"
                          className="mb-3"
                          label="Competency Name"
                          defaultValue={val.competency_name}
                          onChange={onChangeHandle}
                          required
                        />
                      </CCol>
                      <CCol>
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
                      </CCol>
                    </CRow>

                    <CFormInput
                      type="text"
                      name="competencydescription"
                      className="mb-3"
                      label="Competency Description"
                      defaultValue={val.competency_description}
                      onChange={onChangeHandle}
                      required
                    />

                    {indicatorlist
                      .filter((i) => i.competency_id === val.competency_id)
                      .map((val2, key2) => {
                        return (
                          <CFormInput
                            key={key2}
                            type="text"
                            name="indicatordescription"
                            className="mb-3"
                            label={'Competency Indicator ' + (key2 + 1)}
                            defaultValue={val2.indicator_description}
                            onChange={(e) => onChangeHandle2(e, key2)}
                            required
                          />
                        )
                      })}
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
  indicatorlist: PropTypes.array.isRequired,
  updateindicator: PropTypes.func.isRequired,
}

export default CompetencyEdit
