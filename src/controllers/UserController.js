const UserModel = require('../models/userModel')
const utils = require('../utils')

exports.getUser = async (ctx) => {
    await UserModel.all().then(([rows, fields]) => {
        ctx.body = rows
        ctx.status = 200
    }).catch(err => {
        console.log('** ERROR **', err)
        ctx.body = 'ERROR PS'
        ctx.status = 500
    })
}

exports.login = async (ctx) => {
    const { usuario, password } = ctx.request.body

    if (!utils.validate(usuario)) {
        ctx.body = {
            message: 'Username is required'
        }
        ctx.status = 422
        return
    }

    if (!utils.validate(password)) {
        ctx.body = {
            message: 'Password is required'
        }
        ctx.status = 422
        return
    }

    await UserModel.findByUserName(usuario).then(([rows, fields]) => {        
        const { password: hash, fullname } = rows[0] || {}

        if (!utils.isValidPass(password, hash)) {
            ctx.body = {
                message: 'Usuario o contraseña incorrectos'
            }
            ctx.status = 401
            return
        }

        ctx.body = fullname
        ctx.status = 200
    }).catch(err => {
        console.log('** ERROR **', err)
        ctx.body = 'ERROR PS'
        ctx.status = 500
    })
}