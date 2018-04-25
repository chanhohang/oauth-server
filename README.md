# User Guide

This project is still under development

## Development Requirement

* node - v.8.11.1
* npm - v.5.0.3
* Visual Studio Code - v.1.22.2

## GraphQL Tips

mutation
{
  addUser(userId:"hello", firstName:"first", lastName: "last", password:"pass", email: "email@email.com"){
    userId
    firstName
    lastName
    password
    email
  }
}

query {
    users{
    userId
    firstName
    lastName
    password
    email
    }
}