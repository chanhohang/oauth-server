import express from 'express'
import orm from '../database/rdbms/orm'
import LoginController from './controller/loginController'
import RegisterController from './controller/registerController'

export default function serverRouting(server) {

    server.get('/r/:subreddit', (req, res) => {
        return app.render(req, res, '/b', {
            req: req.query,
            subreddit: req.params.subreddit
        })
    })

    server.get('/hello', (req, res) => {
        res.write('Hello World!')
        res.write('<br>')
        orm.getUserDao().findAll().then(function (users) {
            users.forEach(function (user) {
                res.write(user.userId + "," + user.email);
            }, this)
            res.end()
        })
    })

    server.get('/api/tvshows', (req, res) => {
        let shows = { shows: [{ show: { id: 'batman1', } }, { show: { id: "batman2" } }] }
        let result = JSON.stringify(shows)
        res.write(result)
        console.log(result)
        res.end()
    })

    server.post('/api/login', (req, res) => {
        LoginController.process(req, res)
    })

    server.post('/api/user/register', (req, res) => {
        RegisterController.process(req, res)
    })
}