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

    router.get("/password/recup/:email/:token", (req, res) => {
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
        const error = userServices.checkFieldsEmpty(req.body)
        if (error !== null) {
            req.flash("error", error)
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
    })*

    router.post("/login", async (req, res) => {
        const error = userServices.checkFieldsEmpty(req.body)
        if (error !== null) {
            req.flash("error", error)
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


    return router;
})();