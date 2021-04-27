const event = require("events");
const user = require("../models/user");
const userServices = require("../services/userServices")
const events = new event.EventEmitter()

events.on('create_user', (fields) => { userServices.createUser(fields) });
events.on("check_fields_empty", (fields) => { userServices.checkFieldsEmpty(fields)});

module.exports = events
