const mysql = require("mysql")

const knex = require("knex")({
    client: "mysql",
    connection: {
      host:"localhost",
      user: "root",
      password: "Pink@123",
      database: "turing_e_commerce"
    }
  
  });
module.exports = knex    