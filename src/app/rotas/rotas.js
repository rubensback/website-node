const BaseRotas = require("./baseRotas");
const LivroRotas = require("./livroRotas");

module.exports = (app) => {

    BaseRotas(app);
    LivroRotas(app);
    
}

