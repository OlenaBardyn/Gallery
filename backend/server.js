const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');   //Дозволити всім
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Читання (масив, а не об'єкт)
function readData() {
    const data = fs.readFileSync('./inventory.json', 'utf8');
    return JSON.parse(data); 
}

function writeData(data) {
    fs.writeFileSync('./inventory.json', JSON.stringify(data, null, 2));
}


app.get('/inventory', (req, res) => {
    const data = readData();
    res.json(data); 
});


app.get('/inventory/:id', (req, res) => {
    const data = readData();
    const item = data.find(i => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Не знайдено' });
});


app.post('/inventory', (req, res) => {
    const data = readData();
    const newItem = {
        id: Date.now(),
        inventory_name: req.body.inventory_name,
        description: req.body.description,
        photo_url: req.body.photo_url || null
    };
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

app.put('/inventory/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        data[index].inventory_name = req.body.inventory_name;
        data[index].description = req.body.description;
        writeData(data);
        res.json(data[index]);
    } else {
        res.status(404).json({ error: 'Не знайдено' });
    }
});

app.delete('/inventory/:id', (req, res) => {
    let data = readData();
    data = data.filter(i => i.id != req.params.id);
    writeData(data);
    res.json({ message: 'Видалено' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});