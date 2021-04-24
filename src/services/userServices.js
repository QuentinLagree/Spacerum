const EventEmitter = require("events")
const events = new EventEmitter.EventEmitter()
const { sequelize, User } = require("../models");
let bcrypt = require("bcrypt")
const saltRounds = 10;
const Op = require('Sequelize').Op;


class userServices {
    
    static async createUser(fields) {fields.password = bcrypt.hashSync(fields.password, saltRounds); return User.create(fields) }

    static checkFieldsEmpty (fields) {
        let message = null;
        for (let key in fields) {
            let field = fields[key]
            if (field === '' || field === undefined) {
                message = "Tous les champs sont obligatoires !"
            }
        }
        if (fields.password_confirm && (fields.password_confirm !== fields.password)) {
            message = "Le mot de passe et le mot de passe de comfirmation ne corrrespondent pas"
        }
        return message
    }

    static async checkUserExist(fields) {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: fields.username },
                        { email: fields.email }
                    ]
                }
            })
        if (user !== null) {
            return { message: (fields.username === user.username && fields.email === user.email) ? "Le nom d'utilisateur et l'email sont déjà utilisés " : (fields.username === user.username) ? "Le nom d'utilisateur est déjà utilisé" : (fields.email === user.email) ? "L'email est déjà utilisé" : false }
        } else {
            return null
        }
    }
        
}

module.exports = userServices