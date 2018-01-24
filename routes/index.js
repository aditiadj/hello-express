var express = require('express');
var router = express.Router();

let data = [{
  id: 0,
  title: "Lost In The USA",
  author: "Fathi Bawazier"
}, {
  id: 1,
  title: "Manchester Biru",
  author: "Hanif Thamrin"
}, {
  id: 2,
  title: "Shocking Japan",
  author: "Junanto Herdiawan"
}, {
  id: 3,
  title: "Anak Rantau",
  author: "A. Fuadi"
}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get("/api", (req, res) => {

  res.send("Hello Express!!")
});

// Get all items
router.get("/api/items", (req, res) => {
  res.send({
    message: `Books list`,
    data: data
  });
});

// Get single items
router.get("/api/items/:id", (req, res) => {
  const items = data;
  const itemId = Number(req.params.id);
  const item = items.filter(item => {
    return item.id === itemId;
  });
  res.send({
    message: `Get data through by id`,
    data: item
  });
})

// POST an item
router.post("/api/items", (req, res) => {
  const item = {
    id: data.length,
    title: req.body.title,
    author: req.body.author
  };
  const items = data.push(item);
  res.send({
    message: `New data was added`,
    data: data
  });
});

// DELETE an item
router.delete("/api/items/:id", (req, res) => {
  let items = data;
  let itemId = Number(req.params.id);
  let currentData = items.filter(item => {
    return item.id !== itemId;
  });
  data = currentData;
  res.send({
    message: 'An item was deleted',
    data: data
  });
});

// DELETE all items
router.delete("/api/items", (req, res) => {
  data.splice(0, data.length);
  res.send({
    message: 'All items was deleted',
    data: data
  });
});

// UPDATE an item
router.put('/api/items/:id', (req, res) => {
  let id = Number(req.body.id);
  let title = req.body.title;
  let author = req.body.author;

  // Find data index
  let itemIndex = data.findIndex((item, index) => {
    return item.id === id;
  });

  // Matching matched data
  data[itemIndex]['title'] = title;
  data[itemIndex]['author'] = author;

  // Prepare response
  let response = {
    message: 'Data was updated through by id',
    data: data
  };

  // Send response
  res.send(response);

});

module.exports = router;