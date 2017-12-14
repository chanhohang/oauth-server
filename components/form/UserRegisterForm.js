'use strict'

import React from 'react'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import fetch from 'isomorphic-fetch'

class UserRegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { userName: '', password: '', email: '', firstName: '', lastName: '', gender: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
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
        return (
            <Form horizontal>
                <FormGroup
                    controlId="userName"
                    validationState={this.validateUserName()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        User Name
                     </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.userName}
                            placeholder="Enter username"
                            onChange={this.handleValueChange.bind(this, 'username')}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>User Name must be at least 5 characters.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="password"
                    validationState={this.validatePassword()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                     </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.password}
                            placeholder="Enter Password"
                            onChange={this.handleValueChange.bind(this, 'password')}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Password must be at least 5 characters.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="email"
                    validationState={this.validatePassword()}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                     </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            value={this.state.password}
                            placeholder="Enter Password"
                            onChange={this.handleValueChange.bind(this, 'password')}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Password must be at least 5 characters.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handleSubmit} >
                            Sign in
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default UserRegisterForm