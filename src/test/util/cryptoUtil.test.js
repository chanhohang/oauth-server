'use strict'

import { generateSalt, hashPassword } from '../../app/util/cryptoUtil'


it('generateSalt should not be null', () => {

    const salt = generateSalt()
    expect(salt).toBeDefined()
})