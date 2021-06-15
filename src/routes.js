const express = require('express')
const inforeceitas = require('./app/controllers/inforeceitas')
const chefs = require('./app/controllers/chefs')

const routes = express.Router()

routes.get('/', function(req, res){
    return res.render('index')
})

routes.get('/sobre', function(req, res){
    return res.render('sobre')
})


routes.get('/admin/inforeceitas', inforeceitas.index)

routes.get('/admin/inforeceitas/create', function(req, res){
    return res.render('admin/create')
})

routes.get('/admin/inforeceitas/:id', inforeceitas.show)

routes.get('/admin/inforeceitas/:id/edit', inforeceitas.edit)

routes.post('/admin/inforeceitas', inforeceitas.post)

routes.put('/admin/inforeceitas', inforeceitas.put)

routes.delete('/admin/inforeceitas', inforeceitas.delete)



routes.get('/chefs/chefs', chefs.index)

routes.get('/chefs/chefs/create', chefs.create)

routes.get('/chefs/chefs/:id', chefs.show)

routes.get('/chefs/chefs/:id/edit', chefs.edit)

routes.post('/chefs/chefs', chefs.post)

routes.put('/chefs/chefs', chefs.put)

routes.delete('/chefs/chefs', chefs.delete)

module.exports = routes