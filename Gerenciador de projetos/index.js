const express = require('express')
const server = express()

const projects = [{
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }]

// CRIAR PROJETO
server.post('/projects', (req, res) => {
    const { id } = req.body


    return res.json(projects[id])
})

//ola teste
server.listen(3000)