'use strict'

import React from 'react'

import Layout from '../components/MyLayout.js'

import LoginForm from '../components/form/LoginForm'
import { translate } from 'react-i18next'
import i18n from '../src/app/i18n'

const layoutStyle = {
    'marginTop': '2em',
}

const Login = () => (
    <Layout>
        <div style={layoutStyle}>
            <LoginForm />
        </div>
    </Layout>
)

const Extended = translate(['common'], { i18n, wait: process.browser })(Login);
export default Extended