'use strict'

import Link from 'next/link'
import React from 'react'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'
import Language from './dropdown/Language'
import { SplitButton, Grid, Row, Col } from 'react-bootstrap'
import NProgress from 'nprogress'
import Router from 'next/router'

const linkStyle = {
  marginRight: 15
}

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Header = ({ t }) => (
  <Grid style={{ marginLeft: 0, width: 'auto', minWidth: 760 }}>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
    <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
    <Row>
      <Col xs={6} sm={6} md={6} lg={8} style={{ marginTop: 8 }}>
        <Link href="/">
          <a style={linkStyle}>{t('home')}</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>{t('about')}</a>
        </Link>
      </Col>
      <Col xs={6} sm={6} md={6} lg={4} style={{ minWidth: 200 }}>
        <span className="pull-right">
          <Link href="/login">
            <a style={linkStyle}>{t('login')}</a>
          </Link>
          <Language />
        </span>
      </Col>
    </Row>
  </Grid>
)

const Extended = translate('common')(Header);
export default Extended