//check = função pra dizer quais as validações que desejo validar
const { check } = require('express-validator/check'); 

class Livro{
    static validacoes(){
        [
            check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no mínimo 5 caracteres"),
            check('preco').isCurrency().withMessage("O preço precisa ter um valor monetário") //se é monetário
        ]
    }
}

module.exports = Livro;