const Inforeceita = require('../models/inforeceita')
const { date } = require('../../lib/utils')
module.exports = {

    index(req, res){
        Inforeceita.all(function(inforeceitas){
            return res.render('admin/inforeceita', { inforeceitas })
        })
    },

    create(req, res){

    },

    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Por favor, preencha todos os campos!')
            }
        }

        Inforeceita.create(req.body, function(inforeceita){
            return res.redirect(`/admin/inforeceitas/${inforeceita.id}`)
        })
    },

    show(req, res){
        Inforeceita.find(req.params.id, function(inforeceita){
            if(!inforeceita) return res.send('Receita não encontrada!')

            inforeceita.create_at = date(inforeceita.create_at).format


            return res.render('admin/show', { inforeceita })
        })
    },

    edit(req, res){
        Inforeceita.find(req.params.id, function(inforeceita){
            if(!inforeceita) return res.send('Receita não encontrada!')

            return res.render('admin/edit', { inforeceita })
        })
    },

    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Por favor, preencha todos os campos!')
            }
        }


        Inforeceita.update(req.body, function(){
            return res.redirect(`/admin/inforeceitas/${req.body.id}`)
        })
    },

    delete(req, res){
        Inforeceita.delete(req.body.id, function(){
            return res.redirect(`/admin/inforeceitas`)
        })
    }
}


