const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Sirviendo en http://localhost:${PORT}`)
);

app.get('/students', (req, res) => {
    res.status(200).send({
        code: 2183074,
        name: 'Gianfranco',
        program: 'Sistemas',
        level: 9
    })
});

app.post('/addstudent/:id', (req, res) => {
    const { id } = req.params;
    const { code } = req.body;
    const { name } = req.body;
    const { program } = req.body;
    const { level } = req.body;


    if (!code) {
        res.status(418).send({ message: 'Complete la información!'})
    }

    res.send({
        newStudent: `Agregado el estudiante ${name} con código ${code} de nivel ${level} del programa de ${program}`
    })

});