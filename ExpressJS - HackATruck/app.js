// app.js

// 1. Importação de módulos
var express = require("express"); // Importa o pacote express
var bodyParser = require("body-parser")
var ListaDAO = require("./module") // O módulo que criei!

// 2. Iniciar aplicação express
var app = express(); // Inicializando uma aplicação express

// 3. Configurar método para ler a propriedade body das requisições
app.use(bodyParser.json());


// 4. CRIAR ROTAS AQUI

// 5. Associar nosas API com a porta 8080
app.listen(8080);

// MÉTODOS DISPONÍVEIS HTTP 
// GET – Apenas retorna informação, nada mais, nada menos.
// POST – Envia uma nova entidade para o servidor aceitar, como parte do recurso definido na rota.
// PUT – Solicita a criação de um novo recurso. Se ele já existir, apenas o atualiza, se não, o cria.
// DELETE – Solicita a remoção de um determinado recurso.

// FUNCIONALIDADES	 								MÉTODOS		ROTA 		 		
// Criar nova listas								POST 		/lista
// Renomear listas 									PUT			/lista/:id_lista
// Apagar listas 									DELETE		/lista/:id_lista
// Listar todas as listas 							GET 		/lista
// Criar nova tarefa em uma lista 					POST 		/lista/:id_lista
// Alternar tarefa para completa ou não completa 	PUT			/lista/:id_lista/tarefa/:id_tarefa
// Apagar tarefa em uma lista 						DELETE		/lista/:id_lista/tarefa/:id_tarefa
// Listar tarefas de uma lista 						GET 		/lista/:id_lista/tarefas

// CRIAR NOVA LISTA
// GET http://localhost:8080/lista { "nome": "Compras" }
// GET http://localhost:8080/lista { "nome": "Materiais escolares" }
app.post("/lista", function(request, response) {
	// Pega o nome da propriedade body do request
	var nome = request.body.nome;
	// Cria a nova lista
	var result = ListaDAO.criarlista(nome);

	response.status(200);
	response.json(result);
	response.end();

});

// RENOMEAR LISTA
// PUT http://localhost:8080/lista/lista-0 { "nome": "Supermercado" }
app.put("/lista/:id_lista", function(request, response) {
	// Pegar o novo nome da propriedade body do request
	var novoNome = request.body.nome;
	// Pega o ID da lista dos parametros da rota
	var idDaLista = request.params.id_lista;
	// Renomeia a lista
	var result = ListaDAO.renomearLista(idDaLista, novoNome);
	response.status(200);
	response.json(result);
	response.end();
});

// APAGAR LISTA
// DELETE http://localhost:8080/lista/lista-0 
app.delete("/lista/:id_lista", function(request, response) {
	// Pega o ID da lista a ser apagada
	var idDaLista = request.params.id_lista;
	// Apaga a lista com o identificador correspondente
	var result = ListaDAO.apagarlista(idDaLista);
	response.status(200);
	response.json(result);
	response.end();
});

// LISTAR TODAS AS LISTAS
// GET http://localhost:8080/lista
app.get("/lista", function(request, response) {
	response.status(200);
	response.json(ListaDAO.getListas());
	response.end();
});

// CRIAR NOVA TAREFA EM UMA LISTA
// POST http://localhost:8080/lista/lista-0 { "descricao": "Leite" }
// POST http://localhost:8080/lista/lista-0 { "descricao": "Arroz" }
// POST http://localhost:8080/lista/lista-0 { "descricao": "Banana" }
app.post("/lista/:id_lista", function(request, response) {
	// Pega todas as informações provenientes da requisição
	var idDaLista = request.params.id_lista;
	var descricaoDaTarefa = request.body.descricao;
	// Adiciona a nova tarefa na lista de tarefas
	var result = ListaDAO.novaTarefa(descricaoDaTarefa, idDaLista);
	response.status(200);
	response.json(result);
	response.end();
});

// ALTERAR TAREFA PARA COMPLETA OU NÃO COMPLETA
// PUT http://localhost:8080/lista/lista-0/tarefa/tarefa-0
app.put("/lista/:id_lista/tarefa/:id_tarefa", function(request, response) {
	// Pega as informações provenientes da requisição
	var idDaLista = request.params.id_lista;
	var idDaTarefa = request.params.id_tarefa;
	// Alterna o estado da tarefa
	var result = ListaDAO.toggleTarefa(idDaLista, idDaTarefa);
	response.status(200);
	response.json(result);
	response.end();
});

// APAGAR TAREFA EM UMA LISTA
// DELETE http://localhost:8080/lista/lista-0/tarefa/tarefa-1
app.delete("/lista/:id_lista/tarefa/", function(request, response) {
	// Pega as informações provenientes da requisição
	var idDaLista = request.params.id_lista;
	var idDaTarefa = request.params.id_tarefa;
	// Apaga a tarefa da lista de tarefas
	var result = ListaDAO.apagarTarefa(idDaLista, idDaTarefa);
	response.status(200);
	response.json(result);
	response.end();
});

// LISTAR TAREFAS DE UMA LISTA
// GET http://localhost:8080/lista/lista-0/tarefa
app.get("/lista/:id_lista/tarefa", function(request, response) {
	// Pegar o identificador da list na rota
	var idDaLista = request.params.id_lista;
	response.status(200);
	response.json(ListaDAO.getTarefas(idDaLista));
	response.end();
});





