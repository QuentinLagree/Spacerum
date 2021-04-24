const UserServices =  require("../src/User/UserServices");

const routers = (app) => {
    app.use(UserServices);
};

module.exports =  routers