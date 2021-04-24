let flash = (request, response, next) => {
    if (request.session.flash) {
        response.locals.flash = request.session.flash
        request.session.flash = undefined
    }

    request.flash = (type, content, name, values) => {
        if (request.session.flash === undefined) { request.session.flash = {} }
        request.session.flash[type] = content
        if (name) { request.session.flash["field"] = name }
        if (values) { request.session.flash["values"] = values }
    }
    next()
}

module.exports = flash