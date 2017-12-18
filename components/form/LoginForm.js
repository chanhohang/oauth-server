'use strict'

import React from 'react'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import fetch from 'isomorphic-fetch'
import { translate } from 'react-i18next'
import i18n from '../../src/app/i18n'
import Link from 'next/link'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { userName: '', password: '' }
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        console.log('A name was submitted: ' + JSON.stringify(this.state));
        event.preventDefault();

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            this.setToken(res.id_token)
            return this.fetch('api/user', {
                method: 'GET'
            })
        }).then(res => {
            this.setProfile(res)
            return Promise.resolve(res)
        })
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    validateUserName() {
        const length = this.state.userName.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }
    validatePassword() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }
    render(props) {
        return (
            <Form horizontal>
                <FormGroup
                    controlId="userName"
                    validationState={this.validateUserName()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        {i18n.t('username')}
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.userName}
                            placeholder={i18n.t('enter') + ' ' + i18n.t('username')}
                            onChange={this.handleUserNameChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{i18n.t('username')} {i18n.t('loginForm.helpBlock', { min: 5 })}</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="password"
                    validationState={this.validatePassword()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        {i18n.t('password')}
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.password}
                            placeholder={i18n.t('enter') + ' ' + i18n.t('password')}
                            onChange={this.handlePasswordChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{i18n.t('password')} {i18n.t('loginForm.helpBlock', { min: 5 })}</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handleSubmit} >
                            {i18n.t('signIn')}
                        </Button>
                        <Link href="/register">
                            <a>{i18n.t('register')}</a>
                        </Link>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default LoginForm