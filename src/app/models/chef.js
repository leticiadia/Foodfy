const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){

        db.query(`
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
            
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
            
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT chefs.*, count(recipes) AS inforeceita_name
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE chefs SET 
                name=($1),
                avatar_url=($2)
            WHERE id = $3
        `

        const values = [

            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id= $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    findChefRecipe(id, callback){
        db.query(`
        SELECT recipes.*
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY recipes.id
        `, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback} = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM chefs
            ) AS total`
        
    
        if( filter ){
            filterQuery = `
            WHERE chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM chefs 
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT chefs.*, ${totalQuery}, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        ORDER BY total_recipes DESC
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })

        
    }
}