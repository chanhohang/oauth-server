'use strict'

import React from 'react'
import Header from './Header'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'

const layoutStyle = {
  margin: 20,
  padding: 20,
  // border: '1px solid #DDD',
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <link rel="stylesheet" href="static/css/common.css" />
    <Header/>
    {props.children}
  </div>
)

export default Layout