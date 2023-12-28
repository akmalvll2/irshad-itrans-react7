import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CSpinner,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EditCompetency = ({ visible, setVisible, editcompetency, seteditcompetency }) => {
  const [loadSubmit, setLoadSubmit] = useState(false)

  const handleChange = async (e) => {
    const { name, value } = e.target
    var newCompetency = { ...editcompetency }
    newCompetency = { ...editcompetency, [name]: value }
    seteditcompetency(newCompetency)
  }
  const handleSubmit = async () => {
    try {
      setLoadSubmit(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/editcompetency`, {
          compname: editcompetency?.competency_name,
          compdesc: editcompetency?.competency_description,
          compgroup: editcompetency?.competency_cluster,
          compid: editcompetency?.competency_id,
          level1: editcompetency?.competency_level1,
          level2: editcompetency?.competency_level2,
          level3: editcompetency?.competency_level3,
          level4: editcompetency?.competency_level4,
          level5: editcompetency?.competency_level5,
          idn1: editcompetency?.competency_indicator1,
          idn2: editcompetency?.competency_indicator2,
          idn3: editcompetency?.competency_indicator3,
          idn4: editcompetency?.competency_indicator4,
        })
        .then((response) => {
          if (response) {
            alert(response.data)
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadSubmit(false)
      seteditcompetency([])
      setVisible(!visible)
    }
  }
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
        <CModalHeader>Edit Competency</CModalHeader>
        <CModalBody>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Name"
            defaultValue={editcompetency?.competency_name}
            name="competency_name"
            onChange={handleChange}
            required
          />
          <CFormTextarea
            size="sm"
            id="exampleFormControlTextarea1"
            floatingClassName="mb-3"
            floatingLabel="Competency Description"
            rows={4}
            cols={5}
            defaultValue={editcompetency?.competency_description}
            name="competency_description"
            onChange={handleChange}
            required
          />
          <CFormSelect
            size="sm"
            id="floatingInput"
            className="mb-3"
            name="competency_cluster"
            onChange={handleChange}
          >
            <option>..choose group..</option>
            <option
              value="Core"
              selected={editcompetency?.competency_cluster === 'Core' ? true : false}
            >
              Core
            </option>
            <option
              value="Generic"
              selected={editcompetency?.competency_cluster === 'Generic' ? true : false}
            >
              Generic
            </option>
            <option
              value="Functional"
              selected={editcompetency?.competency_cluster === 'Functional' ? true : false}
            >
              Functional
            </option>
          </CFormSelect>
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Level 1"
            defaultValue={editcompetency?.competency_level1}
            name="competency_level1"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Level 2"
            defaultValue={editcompetency?.competency_level2}
            name="competency_level2"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Level 3"
            defaultValue={editcompetency?.competency_level3}
            name="competency_level3"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Level 4"
            defaultValue={editcompetency?.competency_level4}
            name="competency_level4"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Level 5"
            defaultValue={editcompetency?.competency_level5}
            name="competency_level5"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Indicator 1"
            defaultValue={editcompetency?.competency_indicator1}
            name="competency_indicator1"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Indicator 2"
            defaultValue={editcompetency?.competency_indicator2}
            name="competency_indicator2"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Indicator 3"
            defaultValue={editcompetency?.competency_indicator3}
            name="competency_indicator3"
            onChange={handleChange}
            required
          />
          <CFormInput
            size="sm"
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Competency Indicator 4"
            defaultValue={editcompetency?.competency_indicator4}
            name="competency_indicator4"
            onChange={handleChange}
            required
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={handleSubmit} disabled={loadSubmit ? true : false}>
            {loadSubmit ? <CSpinner color="secondary" size="sm" /> : 'Submit'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

EditCompetency.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
  editcompetency: PropTypes.array,
  seteditcompetency: PropTypes.array,
}

export default EditCompetency
