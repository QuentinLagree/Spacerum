const event = require("events");
const user = require("../models/user");
const userServices = require("../services/userServices")
const events = new event.EventEmitter()

events.on('create_user', (fields) => { userServices.createUser(fields) })
events.on("check_fields_empty", (fields) => { userServices.checkFieldsEmpty(fields)})
events.on("createToken", () => { userServices.createToken()})
events.on("save_token")
events.on("send_mail", (email) => userServices.sendMail(email))

module.exports = events
