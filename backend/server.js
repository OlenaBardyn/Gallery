const express = require('express'); // фреймворк для створення сервера
const fs = require('fs');
const app = express();
const PORT = 3000;

// ліміт для base64 фото
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); //Дозволяє вкладені об'єкти. Якщо false — тільки прості рядки та масиви

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // дозволити всім доменам
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

function readData() {
    const data = fs.readFileSync('./inventory.json', 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync('./inventory.json', JSON.stringify(data, null, 2));
}

app.get('/inventory', (req, res) => {
    res.json(readData());
});

app.get('/inventory/:id', (req, res) => {
    const data = readData();
    const item = data.find(i => i.id == parseInt(req.params.id));
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

app.post('/inventory', (req, res) => {
    const data = readData();
    const newItem = {
        id: Date.now(),
        inventory_name: req.body.inventory_name,
        description: req.body.description,
        photo_url: req.body.photo_url || 'https://via.placeholder.com/100'
    };
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

app.put('/inventory/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(i => i.id == parseInt(req.params.id));
    if (index !== -1) {
        data[index].inventory_name = req.body.inventory_name;
        data[index].description = req.body.description;
        data[index].photo_url = req.body.photo_url || data[index].photo_url;
        writeData(data);
        res.json(data[index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.delete('/inventory/:id', (req, res) => {
    let data = readData();
    data = data.filter(i => i.id != parseInt(req.params.id));
    writeData(data);
    res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});