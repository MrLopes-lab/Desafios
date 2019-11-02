const express = require('express')
const server = express()

server.use(express.json())

const projects = []



 // MIDDLEWARE - CHECA SE PROJETO EXISTE
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

// MIDDLEWARE - LOG NUMERO DE REQUISIÇÕES

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

// CRIAR PROJETO
server.post('/projects', checkProjectExists, logRequests, (req, res) => {
    const { id } = req.body
    const { title } = req.body
    
    projects.push({"id": id, "title": title, "tasks": []})

    return res.json(projects)
})

// LISTAR PROJETOS
server.get('/projects', logRequests, (req, res) => {
  return res.json(projects)
})

// ALTERAR TITLE
server.put('/projects/:id', checkProjectExists, logRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETAR UM PROJETO
server.delete('/projects/:id', checkProjectExists, logRequests, (req, res) => {
  const { id } = req.params

  const project = projects.find(p => p.id == id)

  projects.splice(projects.indexOf(project.id), 1)

  return res.json(projects)
})

// ADICIONAR TASK
server.post('/projects/:id/tasks', checkProjectExists, logRequests, (req, res) => {
  const { id } = req.params
  const { task } = req.body

  const project = projects.find(p => p.id == id)

  project.tasks.push(task)

  

  return res.json(projects)
})

server.listen(3030)