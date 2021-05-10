const express = require('express')
const receitas = require('./data')
const inforeceitas = require('./inforeceitas')

const routes = express.Router()

routes.get('/', function(req, res){
    return res.render('index', {items: receitas})
})

routes.get('/receitas', function(req, res){

    return res.render('receitas', {items: receitas})
})

routes.get('/sobre', function(req, res){
    return res.render('sobre')
})

routes.get('/inforeceitas', function(req, res){
    const id = req.query.id

    const inforeceita = receitas.find(function(inforeceita){
        return inforeceita.id == id
    })

    if(!inforeceita){
        return res.send("Receita não encontrada!")
    }

    return res.render("inforeceita", { item: inforeceita })
})


routes.get('/admin/inforeceitas', function(req, res){
    return res.render('admin/inforeceita')
})

routes.get('/admin/inforeceitas/create', function(req, res){
    return res.render('admin/create')
})

routes.get('/admin/inforeceitas/:id', inforeceitas.show)

routes.get('/admin/inforeceitas/:id/edit', inforeceitas.edit)

routes.post('/admin/inforeceitas', inforeceitas.post)

routes.put('/admin/inforeceitas', inforeceitas.put)

routes.delete('/admin/inforeceitas', inforeceitas.delete)

module.exports = routes