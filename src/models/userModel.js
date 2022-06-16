const sql = require('../database').getPool().promise()

const User = (user) => {
    this.id = user.id
    this.username = user.username
    this.password = user.password
    this.fullname = user.fullname
}

User.all = async () => {
    return await sql.query('select * from Users')
}

User.findByUserName = async (username) => {
    const query = `select * from Users where username = '${username}'`;
    return await sql.query(query)
}

module.exports = User