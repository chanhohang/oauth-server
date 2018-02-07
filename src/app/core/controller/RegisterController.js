'use strict'

import { getLogger } from '../../log/logger'
let logger = getLogger('RegisterController')

import Mongo from '../../database/mongodb/mongo'
import ResponseBodyJson from '../api/response/responseBodyJson'

const RegisterController = new class {

    process(req, res) {
        logger.info(req.body)
        var userName = req.body.userName
        var password = req.body.password
        var email = req.body.email

        var response = new ResponseBodyJson()
        response.resultCode=100
        response.payload="hello world"
        res.json(response)        
        //res.end()
    }
}

export default RegisterController