'use strict'

import React from 'react'

import Layout from '../components/MyLayout.js'

import LoginForm from '../components/form/LoginForm'

const layoutStyle = {
    'marginTop': '2em',
}

export default () => (
    <Layout>
        <div style={layoutStyle}>

            <LoginForm />
        </div>
    </Layout>
)