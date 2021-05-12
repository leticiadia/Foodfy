const fs = require('fs')
const data = require('./data.json')


exports.index = function(req, res){
    return res.render('admin/inforeceita', { inforeceitas: data.inforeceitas })
}

exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, recipes_name, recipes_author, ingredients, preparations, add_information } = req.body

    const id = Number(data.inforeceitas.length + 1)

    data.inforeceitas.push({
        id,
        avatar_url,
        recipes_name,
        recipes_author,
        ingredients, 
        preparations, 
        add_information
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send('O arquivo escrito está com erro!')   
        }

        return res.redirect('/admin/inforeceitas')
    })

    
}

exports.show = function(req, res){
    const { id } = req.params

    const foundInforeceita = data.inforeceitas.find(function(inforeceita){
        return id == inforeceita.id 
    })

    if(!foundInforeceita){
        return res.send('Receita não encontrada!')
    }

    const inforeceita = {
        ...foundInforeceita
    }

    return res.render('admin/show', { inforeceita })
}

exports.edit = function(req, res){
    const { id } = req.params

    const foundInforeceita = data.inforeceitas.find(function(inforeceita){
        return inforeceita.id == id
    })

    if(!foundInforeceita){
        return res.send('Receita não encontrada!')
    }

    const inforeceita = {
        ...foundInforeceita
    }

    return res.render('admin/edit', { inforeceita })
}

exports.put = function(req, res){
    const { id } = req.body

    let index = 0

    const foundInforeceita = data.inforeceitas.find(function(inforeceita, foundIndex){
        if(id == inforeceita.id) {
            index = foundIndex

            return true
        }
    })

    if(!foundInforeceita){
        return res.send('Receita não encontrada!')
    }

    const inforeceita = {
        ...foundInforeceita,
        ...req.body,
        id: Number(req.body.id)
    }

    data.inforeceitas[index] = inforeceita

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send('Erro na escrita!')
        }

        return res.redirect(`/admin/inforeceitas/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredInforeceitas = data.inforeceitas.filter(function(inforeceita){
        return inforeceita.id != id
    })

    data.inforeceitas = filteredInforeceitas

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send('Erro na escrita!')
        }
    })

    return res.redirect('/admin/inforeceitas')
}