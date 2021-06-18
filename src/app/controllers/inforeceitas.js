const Inforeceita = require('../models/inforeceita')
const { date } = require('../../lib/utils')
module.exports = {

    index(req, res){
        Inforeceita.all(function(inforeceitas){
            return res.render('admin/inforeceita', { inforeceitas })
        })
    },

    create(req, res){
        Inforeceita.chefSelectOptions(function(options){
            return res.render('admin/create', { chefOptions: options })
        })
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

            inforeceita.created_at = date(inforeceita.created_at).format

            Inforeceita.findChefName(req.params.id, function(chef){
                return res.render('admin/show', { chef, inforeceita })
            })   
        })
    },

    edit(req, res){
        Inforeceita.find(req.params.id, function(inforeceita){
            if(!inforeceita) return res.send('Receita não encontrada!')

            Inforeceita.chefSelectOptions(function(options){
                return res.render('admin/edit', { inforeceita, chefOptions: options })
            })
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


