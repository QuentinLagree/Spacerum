exports.send = (res, code, message) => {
    res.render("template/errorPage", {
        code: code,
        message: message
    })
    
}