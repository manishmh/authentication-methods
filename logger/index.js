import * as dotenv from 'dotenv'
import testLogger from './testLogger.js';
import productionLogger from './productionLogger.js';

dotenv.config()

let logger = null

if (process.env.NODE_ENV !== 'production') {
    logger = testLogger();
}

if (process.env.NODE_ENV === 'production') {
    logger = productionLogger();
}

export default logger
