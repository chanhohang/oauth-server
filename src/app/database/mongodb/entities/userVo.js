'use strict'

import mongoose from 'mongoose';

import { isEmail } from 'validator';

//Define a schema
const Schema = mongoose.Schema;

// var schema = new Schema(
//     {
//       name: String,
//       binary: Buffer,
//       living: Boolean,
//       updated: { type: Date, default: Date.now },
//       age: { type: Number, min: 18, max: 65, required: true },
//       mixed: Schema.Types.Mixed,
//       _someId: Schema.Types.ObjectId,
//       array: [],
//       ofString: [String], // You can also have an array of each of the other types too.
//       nested: { stuff: { type: String, lowercase: true, trim: true } }
//     })

const UserSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'userId is mandatory.']
    },
    firstName: String,
    lastName: String,
    password: String,
    password_salt: String,
    email: {
        type: String,
        validate: [isEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

},
    {
        timestamps: true
    });

class UserVo {
    constructor() {
        this.userId = null
        this.firstName = null
        this.lastName = null
        this.password = nulli
        this.password_salt = null
        this.email = null
    }
}

UserVo.schema = UserSchema
UserVo.modelName = 'User'

export default UserVo