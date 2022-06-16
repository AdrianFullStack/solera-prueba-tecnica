const mysql = require('mysql2');
const CONFIG = require('../../config');
let pool

module.exports = {
    getPool: () => {
        console.log('*** POOL ***', pool)
        if (pool) return pool
        pool = mysql.createPool({
            host: CONFIG.DB_HOST,
            port: CONFIG.DB_PORT,
            user: CONFIG.DB_USERNAME,
            password: CONFIG.DB_PASSWORD,
            database: CONFIG.DB_DATABASE,
        })
        return pool
    }
};
