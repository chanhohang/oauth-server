'use strict'

import { getLogger } from '../../log/logger'
let logger = getLogger('RegisterController')

import Mongo from '../../database/mongodb/mongo'

const UserController = new class {

    findAllUsers()
    {
        let UserModel = Mongo.getUserModel()
        return UserModel.find({});
    }

}

export default UserController