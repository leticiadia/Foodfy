const express = require('express')
const inforeceitas = require('./app/controllers/inforeceitas')
const chefs = require('./app/controllers/chefs')
const Inforeceita = require('./app/models/inforeceita')
const routes = express.Router()

routes.get('/', function(req, res){
    Inforeceita.all(function(inforeceitas){
        return res.render('index', { inforeceitas })
    })
})

routes.get('/sobre', function(req, res){
    return res.render('sobre')
})


routes.get('/admin/inforeceitas', inforeceitas.index)

routes.get('/admin/inforeceitas/create', inforeceitas.create)

routes.get('/admin/inforeceitas/:id', inforeceitas.show)

routes.get('/admin/inforeceitas/:id/edit', inforeceitas.edit)

routes.post('/admin/inforeceitas', inforeceitas.post)

routes.put('/admin/inforeceitas', inforeceitas.put)

routes.delete('/admin/inforeceitas', inforeceitas.delete)

routes.get('/search', inforeceitas.search)



routes.get('/admin/chefs', chefs.index)

routes.get('/admin/chefs/create', chefs.create)

routes.get('/admin/chefs/:id', chefs.show)

routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)

routes.put('/admin/chefs', chefs.put)

routes.delete('/admin/chefs', chefs.delete)

module.exports = routes