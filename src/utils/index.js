const bcrypt = require('bcrypt')

exports.isValidPass = (password, hash = '') => bcrypt.compareSync(password, hash);

exports.validate = (value) => (value !== undefined) && (value !== null)