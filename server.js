const { json } = require('express');
const express = require('express');
const fs = require('fs')
const path = require('path');
const app = express();
const db = require('./db/db.json')
const PORT = 3001;
let data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
  // fs.readFile("./db/db.json", (data) => {
  console.log(data)
  // });
  res.json(data)
});

app.post('/api/notes', (req, res) => {
  console.log("req.body is", req.body)
  req.body.id = (data.length+1).toString();
  const writedata = req.body
  console.log(writedata, "Saved Writing Data")
  data.push(writedata)
  console.log(data)
  fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The note has been saved!');
  });
  res.json(data)
});

app.delete('/api/notes/:id', (req, res) => {
  // remove note from data with matching id from req.params.id
  data = data.filter(data => data.id != (req.params.id).toString());
  fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The note has been deleted!');
  });
  res.json(data);
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

  