const Sequelize = require('sequelize')
const config = require('../config')
const Rushing = require('../features/rushing/rushing.model')

const db = {}

const sequelize = new Sequelize(config.db.uri, { logging: false })

const models = {
  Rushing: Rushing(sequelize, Sequelize.DataTypes),
}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.connect = async () => {
  try {
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })

    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { db, models }
