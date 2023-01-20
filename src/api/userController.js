const events = require("../eventsPackages/eventsManager");
const user = require("../models/user");
const userServices = require("../services/userServices");
const errors = require("../../utils/enums").code

const hasConnected = async({req, res}, redirectPath, data) => {
    if (req.session.connect) {
        res.redirect(redirectPath)
    } else {
        res.render(data.render_path, data.content)
    }
}

exports.notOnline = (function() {
    'use strict';
    var router = require('express').Router();
            router.get('/login', (req, res) => {
                hasConnected({req,  res}, "/home", {
                    render_path: "user/login",
                    content: {
                        title: "Connection"
                    }
                })
            });

            router.get("/register", (req, res) => {
                hasConnected({ req, res }, "/home", {
                    render_path: "user/register",
                    content: {
                        title: "Inscription"
                    }
                })
            })

    router.get("/password", (req, res) => {
        hasConnected({ req, res }, "/home", {
            render_path: "user/forgetPassword",
            content: {
                title: "Récupération du mot de passe"
            }
        })
    })

    /*
        GET PASSWORD/RECUP/?EMAIL/?TOKEN
    */
    router.get("/password/recup/:email/:token", (req, res) => {
        userServices.checkInDbIfUserHaveToken(req.params.email, req.params.token).then((response) => {
            console.log(response)
        })
        hasConnected({ req, res }, "/home", {
            render_path: "user/newPassword",
            content: {
                title: "Changement de mot de passe",
                email: req.params.email,
                token: req.params.token
            }
        })
    })

    router.post("/register", async (req, res) => {
        if (userServices.checkFieldsEmpty(req.body) !== null) {
            req.flash("error", userServices.checkFieldsEmpty(req.body))
            res.redirect("/register")
        } else {
            userServices.checkInDb(req.body, "register").then((response) =>{
                if (response !== null) {
                    req.flash("error", response.message)
                    res.redirect("/register")
                } else {
                    events.emit("create_user", req.body)
                    req.flash("success", "La création du compte est un succées")
                    res.status(errors.ok).redirect("/login")
                }
            })
        }
    })

    router.post("/login", async (req, res) => {
        if (userServices.checkFieldsEmpty(req.body) !== null) {
            req.flash("error", userServices.checkFieldsEmpty(req.body))
            res.redirect("/login")
        } else {
            userServices.checkInDb(req.body, "login").then((response) => {
                if (response.user === null) {
                    req.flash("error", response.message)
                    res.redirect("/login")
                } else {
                    if (!userServices.checkPassword(req.body.password, response.user.password)) {
                        req.flash("error", "Le mot de passe est incorrect")
                        res.redirect("/login")
                    } else {
                        req.flash("success", "La connection est un succées")
                        res.redirect("/login")
                    }
                }
            }) 
        }
    })

    router.post("/password", async (req, res) => {
        if (userServices.checkFieldsEmpty(req.body) !== null) {
            req.flash("error", userServices.checkFieldsEmpty(req.body))
            res.redirect("/password")
        } else {
            if (!userServices.validateEmail(req.body.email)) {
                req.flash("error", "Veuillez saisir un email valide")
                res.redirect("/password")
            } else {
                events.emit("send_mail", req.body.email)
                req.flash("success", "Email envoyé")
                res.redirect("/password")
            }
        }
    })


    return router;
})();