

describe("UserControllerTest", () => {
    const { sequelize, User } = require("../src/models")
    const { Op } = require("sequelize")
    const events = require("../src/eventsPackages/eventsManager")
    const userServices = require("../src/services/userServices")
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

    it("user created", async () => {
        const body  = {
            username: "admin",
            email: "lagreequentindev21@gmail.com",
            password: "Developpement19911996",
            password_confirm: "Developpement19911996"
        }
        await userServices.createUser(body);
    })

    it("return if find user with event", async () => {
        let data = {
            fields: {
                username: "test",
                email: "test@gmail.com"
            },
            error: false,
            userFind: null,
            message: "Tous les champs sont obligatoires !"
        }
        userServices.checkInDb(data).then((response) => {
            console.log(response)
        })
    })

    it.only("delete", async () => {
        users = await User.destroy({
            where: {},
            truncate: true
        })
    })
})