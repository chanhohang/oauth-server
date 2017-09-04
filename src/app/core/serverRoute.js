import express from 'express';
import orm from '../database/orm';

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
            }, this);
            res.end();
        });
    })

}