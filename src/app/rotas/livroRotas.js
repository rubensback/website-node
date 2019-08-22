const LivroControl = require("../controller/livroControl");
const livroControl = new LivroControl();

const Livro = require("../modelos/livro");


module.exports = (app) => {

    const rotasLivro = LivroControl.rotas();

    app.get(rotasLivro.lista,livroControl.lista());

    app.route(rotasLivro.cadastro)
        .get(livroControl.inicializaFormulario())
        .post(Livro.validacoes(), livroControl.inserirLivro())
        .put(livroControl.editarLivro());

    app.get(rotasLivro.edicao, livroControl.formularioEdicao());

    app.delete(rotasLivro.delecao, livroControl.excluirLivro());
}

