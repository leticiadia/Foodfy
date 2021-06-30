const Chef = require('../models/chef')
const { date } = require('../../lib/utils')
module.exports = {

    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1  
        limit = limit || 4
        let offset = limit * (page - 1)

        const params = {
            filter, 
            page, 
            limit,
            offset,
            callback(chefs){
                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }

                return res.render('adminChefs/chefs', { chefs, pagination , filter})
            }
        }

        Chef.paginate(params)
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

            Chef.findChefRecipe(req.params.id, function(inforeceitas){
                return res.render('adminChefs/show', { chef, inforeceitas})
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