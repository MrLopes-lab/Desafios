const express = require('express')
const server = express()

server.use(express.json())

const projects = []

// CRIAR PROJETO
server.post('/projects', (req, res) => {
    const { id } = req.body
    const { title } = req.body
    
    projects.push({"id": id, "title": title, "tasks": []})

    return res.json(projects)
})

// LISTAR PROJETOS
server.get('/projects', (req, res) => {
  return res.json(projects)
})

// ALTERAR TITLE
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETAR UM PROJETO
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params

  const project = projects.find(p => p.id == id)

  projects.splice(projects.indexOf(project.id), 1)

  return res.json(projects)
})

server.listen(3030)