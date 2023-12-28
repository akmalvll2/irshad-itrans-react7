import React, { useState, useEffect } from 'react'
import { CFooter } from '@coreui/react'
import axios from 'axios'

import packageJson from '../../package.json'
const { config } = packageJson

const AppFooter = () => {
  const [setting, setSetting] = useState([])

  const fetchSetting = async () => {
    try {
      axios.get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`).then((response) => {
        if (response) {
          setSetting(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSetting()
  }, [setting])
  return (
    <CFooter>
      <div>
        <a href={setting[0]?.setting_app_link} target="_blank" rel="noopener noreferrer">
          {setting[0]?.setting_app_short_name}
        </a>
        <span className="ms-1">&copy; 2023 {setting[0]?.setting_app_name}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.irshad.com.my" target="_blank" rel="noopener noreferrer">
          ITRANS
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
