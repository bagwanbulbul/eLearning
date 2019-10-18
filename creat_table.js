var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'navgurukul',
      database: 'saralApiData'
    },
    pool: { min: 0, max: 7 }
  })
knex.schema.createTable('Exercises', (table) => {
    table.increments('exerciseId')
    table.string('exerciseName')
    table.integer("courseID")

})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });
