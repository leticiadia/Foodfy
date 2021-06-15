const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){

        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
            
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO recipes (
                image,
                title,
                name,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
            
        const values = [
            data.image,
            data.title,
            data.name,
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
    find(id, callback){
        db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE recipes SET 
                image=($1),
                title=($2),
                name=($3),
                ingredients=($4),
                preparation=($5),
                information=($6),
                chef_id=($7)
            WHERE id = $8
        `

        const values = [
            data.image,
            data.title,
            data.name,
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
    chefSelectOptions(callback){
        db.query(`SELECT name, id FROM recipes`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }

}