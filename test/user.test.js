const app = require('../src/app').app
const supertest = require('supertest')
const port = 8888

describe('User API', () => {
    let req, server

    before(() => {
        server = app.listen(port, () => console.log(`Server listening on port ${port}.`))
    })
    after(() => server.close())

    beforeEach(async () => {
        req = supertest(server)
    })

    const throwIfError = (err, res) => { if (err) throw err }

    describe('GET Users /users', () => {
        it('return all users', async () => {
            req.get('/users')
               .expect(/admin/)
               .expect(200)
               .end(throwIfError)
        })
    })

    describe('POST /users', () => {
        it('retorna error si no esta el campo usuario', () => {
            req.post('/users')
               .send({password: 'admin'})
               .expect(/Username is required/)
               .expect(422)
               .end(throwIfError)
        })

        it('retorna error si no esta el campo password', () => {
            req.post('/users')
               .send({usuario: 'admin'})
               .expect(/Password is required/)
               .expect(422)
               .end(throwIfError)
        })

        it('retorna error si usuario y contraseña no son correctos', () => {
            req.post('/users')
               .send({usuario: 'admin', password: 'admin2'})
               .expect(/Usuario o contraseña incorrectos/)
               .expect(401)
               .end(throwIfError)
        })

        it('retorna fullname si el usuario y contraseña son correctos', () => {
            req.post('/users')
               .send({usuario: 'admin', password: 'admin'})
               .expect('Juan Perez')
               .expect(200)
               .end(throwIfError)
        })
    })
})