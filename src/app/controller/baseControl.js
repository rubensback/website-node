const templates = require("../views/templates");

class BaseControl{

    static rotas(){
        return {
            home: "/"
        }
    }

    home(){
        return function(req, resp) {
            resp.marko(
                templates.base.home
            );
        };
    }
}
module.exports = BaseControl;