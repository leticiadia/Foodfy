const Chef = require('../models/chef')
const { date } = require('../../lib/utils')
module.exports = {

    index(req, res){
        Chef.all(function(chefs){
            return res.render('adminChefs/chefs', { chefs })
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

        Chef.create(req.body, function(chef){
            return res.redirect(`/chefs/chefs/${chef.id}`)
        })
    },

    show(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send('Receita não encontrada!')

            chef.create_at = date(chef.create_at).format


            return res.render('adminChefs/show', { chef })
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