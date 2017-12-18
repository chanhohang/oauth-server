'use strict'

import React from 'react'

import Layout from '../components/MyLayout.js'

import UserRegisterForm from '../components/form/UserRegisterForm'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'

const layoutStyle = {
    'marginTop': '2em',
}

const Register = () => (
    <Layout>
        <div style={layoutStyle}>
            <UserRegisterForm />
        </div>
    </Layout>
)


const Extended = translate(['common'], { i18n, wait: process.browser })(Register);
export default Extended