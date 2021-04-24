const express = require("express")
const session = require("express-session");
const bodyParser = require('body-parser');
const { sequelize, User } = require("./src/models");



const app = express()

app.use(express.json())

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set("views", "./public/views");
app.set("view engine", "ejs")
app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require("./utils/flash"))
app.set('event', require("./src/eventsPackages/eventsManager"));

let userNotConnectedRoute = require("./src/api/userController")
app.use("/", userNotConnectedRoute.notOnline)




app.listen({ port: 8080 }, async () => {
    console.log("Server is ok on http://localhost:8080")
    await sequelize.authenticate().then(() => { console.log("The database is ready")})
})
