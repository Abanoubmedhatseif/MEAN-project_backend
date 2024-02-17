const {env} = require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@YOUR-CLUSTER-NAME.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

module.exports = uri