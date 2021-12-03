const {Pool}=require('pg')
const pool = new Pool({
    user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.database,
    password: process.env.pg_password,
    port: process.env.pg_port,
  })
 

module.exports=pool