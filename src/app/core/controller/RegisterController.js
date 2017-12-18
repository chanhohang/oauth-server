'use strict'

import { getLogger } from '../../log/logger'
let logger = getLogger('RegisterController')

import Mongo from '../../database/mongodb/mongo'

const RegisterController = new class {

    process(req, res) {
        logger.info(req.body)
        var userName = req.body.userName
        var password = req.body.password
        var email = req.body.email

        res.end()
    }
}

export default RegisterController