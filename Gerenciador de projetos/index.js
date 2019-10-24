const express = require('express')
const server = express()

server.use(express.json())

const projects = [{
    id: "1",
    title: "Site1",
    tasks: ["Nova tarefa"]
  }]

// CRIAR PROJETO
server.post('/projects', (req, res) => {
    const { id } = req.body
    const { title } = req.body
    
    projects.push({"id": id, "title": title})

    return res.json(projects)
})


// LISTAR PROJETOS
server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.listen(3000)