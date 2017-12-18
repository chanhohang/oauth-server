'use strict'

import React from 'react'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import fetch from 'isomorphic-fetch'
import { translate } from 'react-i18next'
import i18n from '../../src/app/i18n'

class UserRegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { userName: '', password: '', email: '', firstName: '', lastName: '', gender: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('api/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handleValueChange(key, event) {
        this.setState({ key: event.target.value })
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
        var textAlign = { textAlign: 'center' }
        return (
            <Form horizontal>
                <h1 style={textAlign}>{i18n.t('registerForm.title')}</h1>
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

                <FormGroup
                    controlId="email"
                    validationState={this.validatePassword()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        {i18n.t('email')}
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.email}
                            placeholder={i18n.t('enter') + ' ' + i18n.t('email')}
                            onChange={this.handleEmailChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{i18n.t('email')} {i18n.t('registerForm.helpBlock.email')}</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handleSubmit} >
                            {i18n.t('submit')}
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default UserRegisterForm