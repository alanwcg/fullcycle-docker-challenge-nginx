const express = require('express')
const mysql = require('mysql2')
const { faker } = require('@faker-js/faker')

const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const app = express()

const connection = mysql.createConnection(config)

connection.query(
  `INSERT INTO people(name) VALUES('Alan Cintra')`
)

app.get('/', async (req, res) => {
  connection.query(
    `INSERT INTO people(name) VALUES('${faker.name.firstName()}')`
  )
  connection.query(
    `SELECT * FROM people`,
    (err, results, field) => {
      console.log(results)
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>FullCycle</title>
          </head>
          <body>
            <h1>Full Cycle Rocks!</h1>
            <ul>
              ${results.map(row => `<li>${row.name}</li>`).join('')}
            </ul>
          </body>
        </html>
      `)
    }
  )
})

app.listen(port, () => console.log(`Rodando na porta ${port}`))