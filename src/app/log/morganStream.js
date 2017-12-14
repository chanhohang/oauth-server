'use strict'

import stream from 'stream'
import { getLogger } from '../log/logger'
let logger = getLogger('MorganStream')

class MorganStream extends stream.Writable {
    _write(chunk, enc, next) {
        logger.info(chunk.toString().trim())
        next()
    }
}

export default MorganStream