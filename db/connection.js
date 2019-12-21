const {Client} = require('pg')

// Connection HEROKU
const client = new Client({
    user : "dclypbkkfycuzn",
    host : "ec2-79-125-2-142.eu-west-1.compute.amazonaws.com",
    password : "7b3ff18d4ecb6b51b3ca8b9ff00f09a55e583f8a481c4478ae0c54c9dc77be3c",
    database: "de6cbdlbh354s1",
    port : 5432
})


/*
//LOCAL
const client = new Client({
    user : "postgres",    
    password : "admin",
    database: "weedelivery",
    port : 5433
})
*/
module.exports = client
