var express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(cors())
var http = require("http").Server(app)
var fs = require("fs")
const { stringify } = require('querystring')


app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.urlencoded({ extended: true }))
app.use(express.json());

var data = fs.readFileSync('./static/data.json')
data = JSON.parse(data)
//console.log(data)

//get all configs
app.get("/items", (req, res) => {
    res.status(200).json(data)
})

//get details on item by id
app.get("/item/:id", (req, res) => {
    const id = req.params.id 

    const item = data.filter(x => x.id === id)[0]

    res.status(200).json(item)
})

//update configuration data
app.post("/update-config", (req, res) => {
    console.log(req.body)
    const {geometry, color, id} = req.body
    let item = data.filter( dat => dat.id == id)[0]
    item.attributes.color = color 
    item.attributes.geometry = geometry

    res.status(200).json(item)

})

//delete item
app.post("/delete-item", (req, res) => {
    const {id} = req.body
    data = data.filter( dat => dat.id != id)[0]

    res.status(200).json(data)

})



var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
}) 