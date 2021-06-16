const Chef = require('../models/chef')
const { date } = require('../../lib/utils')
const inforeceitas = require('./inforeceitas')
module.exports = {

    index(req, res){
        Chef.all(function(chefs){
            return res.render('adminChefs/chefs', { chefs })
        })
    },

    create(req, res){
        return res.render('adminChefs/create')
    },

    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Por favor, preencha todos os campos!')
            }
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/chefs/chefs/${chef.id}`)
        })
    },

    show(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send('Receita não encontrada!')

            chef.created_at = date(chef.created_at).format

            Chef.findChefRecipe(function(inforeceita){
                return res.render('adminChefs/show', { chef, findRecipes: inforeceita })
            })
        })    
    },

    edit(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send('Receita não encontrada!')

            return res.render('adminChefs/edit', { chef })
        })
    },

    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Por favor, preencha todos os campos!')
            }
        }


        Chef.update(req.body, function(){
            return res.redirect(`/chefs/chefs/${req.body.id}`)
        })
    },

    delete(req, res){
        Chef.delete(req.body.id, function(){
            return res.redirect(`/chefs/chefs`)
        })
    }
}