'use strict'

import { getLogger } from '../../log/logger'
let logger = getLogger('RegisterController')

import Mongo from '../../database/mongodb/mongo'
import ResponseBodyJson from '../api/response/responseBodyJson'
import DuplicateUserError from '../error/DuplicateUserError'

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

    async addUser(userId, firstName, lastName, password, email) {
        let UserModel = Mongo.getUserModel()
        var user = await UserModel.findOne({userId: userId}).exec();
        if (user != null)
        {
            logger.error('User already existed.' + user)
            var error = new DuplicateUserError(userId);
            throw error
        }
        user =  {
            userId: userId,
            lastName: lastName,
            firstName: firstName,
            password: password,
            password_salt: "salt",
            email: email
          };
        await UserModel.create(user);
        return user;
    }

}

export default RegisterController