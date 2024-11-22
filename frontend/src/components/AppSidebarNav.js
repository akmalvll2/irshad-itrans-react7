import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

import { userType } from 'src/userType'

import MyContext from 'src/views/mine/data/MyContext'

/*const userType = [
  {
    data: { type: 'admin' },
  },
]*/

const navItemCSS = `
  .nav-item {
    background-color: var(--primary-color);
    transition: 0.2s all ease;
  }

  .nav-item:hover {
    background-color: var(--primary-color-light);
  }
  .nav-item-active:hover {
    background `

export const AppSidebarNav = ({ items }) => {
  const { loading, company } = useContext(MyContext)
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return userType?.role === 'admin' || (userType?.role === 'user' && item.role === 'both') ? (
      <Component
        className="nav-item"
        //style={name === 'Assessment' ? { backgroundColor: `steelblue` } : null}
        style={{ backgroundColor: company[0].company_system_primary_color }}
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    ) : (
      ''
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return userType?.role === 'admin' || (userType?.role === 'user' && item.role === 'both') ? (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    ) : (
      ''
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
