const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){

        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
            
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO recipes (
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
            
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.chef
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    chefSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback){
        db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findChefName(id, callback){
        db.query(`
        SELECT name  
        FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id) 
        WHERE recipes.id = $1 
        GROUP BY chefs.id`,[id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE recipes SET 
                title=($1),
                ingredients=($2),
                preparation=($3),
                information=($4),
                chef_id=($5)
            WHERE id = $6
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id,    
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id= $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    paginate(params){
        const { filter, limit, offset, callback} = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`
        
    
        if( filter ){
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })

        
    }
}