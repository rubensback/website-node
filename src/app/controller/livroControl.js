const LivroDao = require("../infra/livro-dao");
const db = require("../../config/database");

const templates = require("../views/templates");

//check = função pra dizer quais as validações que desejo validar, usado apenas na classe rotas.js
//validationResult vai pegar a requisição que ta chegando no servidor e verificar se houve algum erro
const { check, validationResult } = require('express-validator/check'); 

class LivroControl{

    static rotas(){
        return {
            lista: "/livros",
            cadastro: "/livros/form",
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista(){
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                    .then(livros => resp.marko(
                        templates.livros.lista,
                        {
                            livros: livros
                        }
                    ))
                    .catch(erro => console.log(erro));
        };
    }

    inserirLivro(){
        return function(req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
    
            //retornar um objeto com os erros que tiveram
            const erros = validationResult(req);
    
            if (!erros.isEmpty()) {
                return resp.marko(
                    templates.livros.form,
                    {
                        //livro: {}, //passa ao template um livro vazio
                        livro: req.body, //o livro passado ao template recebe os dados passados pelo formulario previamente preenchidos 
                        errosValidacao: erros.array() //metodo do express-validator que devolve o array de erros
                    }
                );
            }
    
            livroDao.adiciona(req.body)
                    .then(resp.redirect(LivroControl.rotas().lista))
                    .catch(erro => console.log(erro));
        };
    }

    editarLivro(){
        return function(req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(req.body)
                    .then(resp.redirect(LivroControl.rotas().lista))
                    .catch(erro => console.log(erro));
        };
    }

    excluirLivro(){
        return function(req, resp) {
            const id = req.params.id; //pega a id da URL
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        };
    }

    inicializaFormulario(){
        return function(req, resp) {
            resp.marko(
                templates.livros.form, 
            { livro: {} });
        }
    }

    formularioEdicao(){
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                    .then(livro => 
                        resp.marko(
                            templates.livros.form, 
                            { livro: livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        };
    }
}
module.exports = LivroControl;