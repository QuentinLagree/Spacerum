const {sequelize, User} = require("../src/models")
const {Op} = require("sequelize")
const events = require("../src/eventsPackages/eventsManager")
const userServices = require("../src/services/userServices")

describe("UserControllerTest", () => {
    it("findOne", async () => {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: "test" },
                    { email: "test@sgmail.com" }
                ]
            }
        })
        expect(user).toBeNull()
    })

    it.only("user created", async () => {
        const body  = {
            username: "admin",
            email: "lagreequentindev21@gmail.com",
            password: "Developpement19911996",
            password_confirm: "Developpement19911996"
        }
        const a = await userServices.createUser(body);
        console.log(a)
    })

    it.skip("return if find user with event", async () => {
        let data = {
            fields: {
                username: "test",
                email: "test@gmail.com",
                password: "1234",
                password_confirm: "1234"
            },
            error: false,
            userFind: null,
            message: "Tous les champs sont obligatoires !"
        }
        console.log(events.emit("check_if_user_exist", data))
    })
})