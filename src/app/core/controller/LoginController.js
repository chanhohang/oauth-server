'use strict'

import { getLogger } from '../../log/logger'
let logger = getLogger('LoginController')

import Mongo from '../../database/mongodb/mongo'

const LoginController = new class {

    process(req, res) {
        logger.info(req.body)
        req.body.userName

        res.end()
    }
}

export default LoginController