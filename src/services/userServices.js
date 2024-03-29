const EventEmitter = require("events")
const events = new EventEmitter.EventEmitter()
const { sequelize, User } = require("../models");
let bcrypt = require("bcrypt")
const saltRounds = 10;
const Op = require('Sequelize').Op;
const transporter = require("../config/mailer")
const ejs = require("ejs")
const fs = require("fs")


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

    static async checkInDbIfUserHaveToken(email, token) {
        const user = await User.findOne({
            where: {
                [Op.and]: [
                    {email: email},
                    {token: token}
                ]
            }
        })
        return (user == null) ? null : user
    }

    static async checkInDb(data, path) {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: (typeof data.username === "undefined") ? (!data.username) ? data.userOrEmail : null : null },
                        { email: (typeof data.email === "undefined") ? (!data.email) ? data.userOrEmail : null : null },
                        { uuid: (typeof data.uuid !== "undefined") ? data.uuid : null}
                    ]
                }
            })
        switch (path) {
            case "register":
                console.log("reg")
                if (user !== null) {
                    return { message: (data.username === user.username && data.email === user.email) ? "Le nom d'utilisateur et l'email sont déjà utilisés " : (data.username === user.username) ? "Le nom d'utilisateur est déjà utilisé" : (data.email === user.email) ? "L'email est déjà utilisé" : false }
                } else {
                    return null
                }
            case "login":
                if (user === null) {
                    return {user: user, message: "Le nom ou l'email est incorrect"}
                } else {
                    return {user: user}
                }
            default:
                break;
        }
    }

    static checkSendMail (email) {
        return user = User.findOne({
            where: {
                email: email
            }
        })
    }

    static checkPassword (password_plain, password_hash) {return bcrypt.compareSync(password_plain, password_hash)}

    static sendMail (email) {
        let options;
        let token = this.saveToken(email);
        fs.readFile(appRoot + "/public/views/mails/forgetPasswordMail.ejs", 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            options = {
                from: process.env.USER_MAIL,
                to: email,
                subject: "SPACERUM / Modification de mot de passe",
                html: ejs.render(data, {
                    host: "http://" + process.env.HOST_SERVER + ":" + process.env.PORT_SERVER,
                    email: email,
                    token: token
                })
            }
            transporter.sendMail(options, (error, info) => {
                if (error) { throw error } else { return true }
            })
        });
    }

    static validateEmail (email) {
        const validator  = require("email-validator")
        return validator.validate(email)
    }
    
    static saveToken (email) {
        let token = require("randomstring").generate()
        User.update({ token: token }, {
            where: { email: email }
        })

        return token
    }
}

module.exports = userServices