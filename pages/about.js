'use strict'

import React from 'react'

import Layout from '../components/MyLayout.js'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'

const About = () => (
    <Layout>
        <p>{i18n.t('aboutPage.title')}</p>
    </Layout>
)
const Extended = translate(['common'], { i18n, wait: process.browser })(About);
export default Extended