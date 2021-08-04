'use strict'

module.exports = function(app){
    var loginController = require('./controller/loginController');

    app.route('/login')
        .post(loginController.sign_in);
    app.route('/userData')
        .post(loginController.loginRequired);
}